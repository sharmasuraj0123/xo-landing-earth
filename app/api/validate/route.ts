import { NextRequest, NextResponse } from "next/server";

/* ────────────────────────────────────────────────────────────────
   The validation lab's data source.

   Given a GitHub repo, this route derives the raw material for
   quirq accounting: every merged PR and closed issue is treated
   as a settled unit of work; open issues are the unsettled
   backlog. The client runs the paper's calculus on top.

   Set GITHUB_TOKEN in the environment for 5,000 req/hr
   (unauthenticated is 60/hr, shared across visitors).
──────────────────────────────────────────────────────────────── */

const GH = "https://api.github.com";

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "xo-quirq-validation-lab",
  };
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

async function gh(path: string) {
  const res = await fetch(`${GH}${path}`, {
    headers: headers(),
    // Cache identical lookups for 10 minutes to be gentle on rate limits.
    next: { revalidate: 600 },
  });
  if (!res.ok) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    if (res.status === 403 && remaining === "0") {
      throw new ApiError(
        429,
        "GitHub rate limit reached. Try again in a few minutes (or set GITHUB_TOKEN on the server).",
      );
    }
    if (res.status === 404) {
      throw new ApiError(404, "Repository not found (private repos need a GITHUB_TOKEN with access).");
    }
    throw new ApiError(res.status, `GitHub API error (${res.status}).`);
  }
  return res.json();
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Accepts full URLs, owner/repo shorthand, with or without .git */
function parseRepo(input: string): { owner: string; repo: string } | null {
  const trimmed = input.trim();
  const m =
    trimmed.match(/github\.com[/:]([^/\s]+)\/([^/\s#?]+)/i) ??
    trimmed.match(/^([\w.-]+)\/([\w.-]+)$/);
  if (!m) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/, "") };
}

/** GitHub search API: total_count for a query, one request each. */
async function searchCount(q: string): Promise<number> {
  const data = await gh(`/search/issues?q=${encodeURIComponent(q)}&per_page=1`);
  return data.total_count ?? 0;
}

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get("repo");
  if (!input) {
    return NextResponse.json({ error: "Missing ?repo=" }, { status: 400 });
  }
  const parsed = parseRepo(input);
  if (!parsed) {
    return NextResponse.json(
      { error: "Could not parse that as a GitHub repo. Try owner/repo or a full URL." },
      { status: 400 },
    );
  }
  const { owner, repo } = parsed;
  const full = `${owner}/${repo}`;

  try {
    const [meta, mergedPRs, closedIssues, openIssues, recentMerged, participation] =
      await Promise.all([
        gh(`/repos/${full}`),
        searchCount(`repo:${full} is:pr is:merged`),
        searchCount(`repo:${full} is:issue is:closed`),
        searchCount(`repo:${full} is:issue is:open`),
        // A sample of recent merged PRs to estimate unit "size" (files/comments signal).
        gh(`/repos/${full}/pulls?state=closed&sort=updated&direction=desc&per_page=30`),
        // 52 weeks of commit counts for the activity chart.
        gh(`/repos/${full}/stats/participation`).catch(() => null),
      ]);

    type PR = {
      merged_at: string | null;
      created_at: string;
      title: string;
      number: number;
    };
    const sample = (recentMerged as PR[]).filter((p) => p.merged_at);

    // Cycle time (create → merge) per sampled PR, in hours.
    const cycleHours = sample.map((p) => {
      const created = new Date(p.created_at).getTime();
      const merged = new Date(p.merged_at as string).getTime();
      return Math.max(0.1, (merged - created) / 3.6e6);
    });
    cycleHours.sort((a, b) => a - b);
    const median = (xs: number[]) =>
      xs.length ? xs[Math.floor(xs.length / 2)] : 0;

    const weeklyCommits: number[] = participation?.all ?? [];

    return NextResponse.json({
      repo: {
        fullName: meta.full_name,
        description: meta.description,
        stars: meta.stargazers_count,
        language: meta.language,
        createdAt: meta.created_at,
        pushedAt: meta.pushed_at,
        openIssuesAndPRs: meta.open_issues_count,
        url: meta.html_url,
      },
      units: {
        // Settled units of work: outcomes that were defined, executed, verified, merged/closed.
        mergedPRs,
        closedIssues,
        settled: mergedPRs + closedIssues,
        // The unsettled backlog: defined outcomes awaiting execution.
        backlog: openIssues,
      },
      sample: {
        prCount: sample.length,
        medianCycleHours: Number(median(cycleHours).toFixed(1)),
        recent: sample.slice(0, 8).map((p) => ({
          number: p.number,
          title: p.title,
        })),
      },
      activity: {
        weeklyCommits, // last 52 weeks, oldest first
        totalYear: weeklyCommits.reduce((s, x) => s + x, 0),
      },
    });
  } catch (e) {
    if (e instanceof ApiError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json(
      { error: "Failed to reach GitHub. Try again." },
      { status: 502 },
    );
  }
}
