"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createCommunityPost } from "@/lib/blog-store";

const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(8, "Title needs at least 8 characters")
    .max(120, "Keep the title under 120 characters"),
  tag: z.string().trim().max(24, "Keep the tag short").optional(),
  summary: z
    .string()
    .trim()
    .min(20, "Give readers at least a sentence")
    .max(300, "Keep the summary under 300 characters"),
  body: z
    .string()
    .trim()
    .min(80, "The post needs at least a short paragraph")
    .max(20000, "That is longer than we can store"),
  authorType: z.enum(["user", "company"]),
  companyName: z.string().trim().max(80, "Keep the company name short").optional(),
});

export type NewPostState = {
  errors?: Record<string, string>;
};

export async function submitPost(
  _prev: NewPostState,
  formData: FormData,
): Promise<NewPostState> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    tag: formData.get("tag") || undefined,
    summary: formData.get("summary"),
    body: formData.get("body"),
    authorType: formData.get("authorType"),
    companyName: formData.get("companyName") || undefined,
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!errors[key]) errors[key] = issue.message;
    }
    return { errors };
  }

  const data = parsed.data;
  if (data.authorType === "company" && !data.companyName) {
    return {
      errors: { companyName: "Company name is required when publishing as a company" },
    };
  }

  const user = await currentUser();
  const authorName =
    user?.fullName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    "XO builder";

  const post = await createCommunityPost({
    title: data.title,
    tag: data.tag || (data.authorType === "company" ? "Company" : "Community"),
    summary: data.summary,
    body: data.body
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
    authorType: data.authorType,
    authorName,
    companyName: data.authorType === "company" ? data.companyName : undefined,
    userId,
  });

  revalidatePath("/blog");
  redirect(`/blog/post/${post.slug}`);
}
