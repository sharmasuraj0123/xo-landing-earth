import type { Metadata } from "next";
import Link from "next/link";
import {
  Callout,
  ContactCard,
  KeyTerm,
  LegalPage,
  List,
  Section,
  Subheading,
  Term,
} from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service | XO",
  description:
    "XO Terms of Service — the full terms governing your access to and use of the XO platform and services.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      effective="April 1, 2025"
      updated="April 15, 2026"
    >
      <p>
        These Terms and Conditions (&quot;Terms&quot;) govern your access to and
        use of the XO platform and services operated by{" "}
        <span className="text-white font-semibold">XO Labs Inc</span>{" "}
        (&quot;XO&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;),
        available at{" "}
        <a
          href="https://xo.builders"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#83d63a] hover:underline"
        >
          xo.builders
        </a>{" "}
        and associated subdomains. By creating an account or using any part of
        the platform, you agree to be bound by these Terms. If you do not agree,
        do not use the Services.
      </p>

      <Section number={1} title="Definitions">
        <List>
          <li>
            <KeyTerm>&quot;Services&quot;</KeyTerm> means the XO platform and all
            products offered through it, including XO Workspaces, XO Launchpad,
            XO MCP Server, XO Vibe, and any related APIs, tools, and features.
          </li>
          <li>
            <KeyTerm>&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;</KeyTerm>{" "}
            means any individual or entity that accesses or uses the Services.
          </li>
          <li>
            <KeyTerm>&quot;Agent&quot;</KeyTerm> means any AI agent, bot, or
            automated workflow deployed, created, or managed through the
            Services.
          </li>
          <li>
            <KeyTerm>&quot;Content&quot;</KeyTerm> means any data, files, code,
            text, or materials you upload, submit, transmit, or otherwise make
            available through the Services.
          </li>
          <li>
            <KeyTerm>&quot;Deployment&quot;</KeyTerm> means any application,
            container, or service you host or run through XO Launchpad or XO
            Workspaces.
          </li>
          <li>
            <KeyTerm>&quot;Third-Party Services&quot;</KeyTerm> means external
            platforms integrated with the Services, including but not limited to
            Telegram, WhatsApp, Slack, GitHub, Cursor, Claude, ChatGPT, and
            Devin.
          </li>
          <li>
            <KeyTerm>&quot;LLM Provider&quot;</KeyTerm> means any third-party
            provider of a large language model or AI inference service that you
            connect to or use in conjunction with the Services, including but not
            limited to Anthropic (Claude), OpenAI (ChatGPT / GPT-4), Google
            (Gemini), Meta (Llama), Mistral, and other model providers.
          </li>
          <li>
            <KeyTerm>&quot;Model&quot;</KeyTerm> means any large language model,
            foundation model, or AI inference endpoint you configure, connect, or
            otherwise use through the Services, whether provided by an LLM
            Provider or otherwise.
          </li>
        </List>
      </Section>

      <Section number={2} title="Eligibility">
        <p>
          You must be at least 18 years old (or the age of majority in your
          jurisdiction) to use the Services. By using the Services, you represent
          and warrant that you meet this requirement. If you are using the
          Services on behalf of an organization, you represent that you have
          authority to bind that organization to these Terms.
        </p>
      </Section>

      <Section number={3} title="Account Registration">
        <p>
          To access certain features, you must create an account. You agree to:
        </p>
        <List>
          <li>
            Provide accurate, current, and complete registration information.
          </li>
          <li>
            Keep your account credentials confidential and not share them with
            third parties.
          </li>
          <li>
            Notify us immediately at{" "}
            <a
              href="mailto:support@xo.builders"
              className="text-[#83d63a] hover:underline"
            >
              support@xo.builders
            </a>{" "}
            of any unauthorized use of your account.
          </li>
          <li>
            Take full responsibility for all activity that occurs under your
            account.
          </li>
        </List>
        <p>
          XO reserves the right to suspend or terminate accounts that violate
          these Terms or that we reasonably believe are being used fraudulently
          or in bad faith.
        </p>
      </Section>

      <Section number={4} title="Description of Services">
        <p>XO provides agentic infrastructure tools including:</p>
        <List>
          <li>
            <KeyTerm>XO Workspaces</KeyTerm> — AI agent workspaces with shared
            memory and multi-channel deployment to platforms such as Telegram,
            WhatsApp, and Slack.
          </li>
          <li>
            <KeyTerm>XO Launchpad</KeyTerm> — A one-click container deployment
            platform enabling users to deploy applications from GitHub
            repositories, local builds, or templates.
          </li>
          <li>
            <KeyTerm>XO MCP Server</KeyTerm> — A Model Context Protocol
            integration layer enabling AI coding tools such as Cursor, Claude,
            ChatGPT, and Devin to interact with the XO platform.
          </li>
          <li>
            <KeyTerm>XO Vibe</KeyTerm> — Additional AI-assisted development and
            collaboration features as made available from time to time.
          </li>
        </List>
        <p>
          We may add, modify, or discontinue features at any time. We will
          endeavor to give reasonable notice of material changes where
          practicable.
        </p>
      </Section>

      <Section number={5} title="Acceptable Use">
        <p>You agree not to use the Services to:</p>
        <List>
          <li>
            Violate any applicable local, state, national, or international law
            or regulation.
          </li>
          <li>
            Deploy or distribute malware, viruses, ransomware, or any malicious
            code.
          </li>
          <li>
            Spam, phish, harass, or send unsolicited bulk communications through
            Agents or Deployments.
          </li>
          <li>
            Infringe or misappropriate the intellectual property rights of
            others.
          </li>
          <li>
            Scrape, crawl, or data-mine the Services or any Third-Party Services
            in violation of their terms.
          </li>
          <li>
            Reverse engineer, decompile, or disassemble any part of the Services.
          </li>
          <li>
            Circumvent or attempt to circumvent access controls, rate limits, or
            security features.
          </li>
          <li>
            Use the Services to build a product or service that competes directly
            with XO without our prior written consent.
          </li>
          <li>
            Facilitate, encourage, or enable any of the above by third parties.
          </li>
        </List>
        <p>
          XO reserves the right to remove Content, suspend Agents or Deployments,
          or terminate accounts that violate this section, without prior notice.
        </p>
      </Section>

      <Section number={6} title="AI Agents, Models, and Automated Services">
        <Subheading>User Responsibility for Agents</Subheading>
        <p>
          You are solely responsible for the behavior, outputs, and actions of
          any Agent you create, configure, or deploy through the Services. XO
          provides the infrastructure; you determine how Agents behave and what
          they do.
        </p>

        <Subheading>No Guarantee of AI Output</Subheading>
        <p>
          AI-generated content, code, and agent behavior are probabilistic in
          nature. XO makes no representation that Agent outputs are accurate,
          complete, safe, or fit for any particular purpose. You must review and
          validate all AI-generated outputs before relying on them.
        </p>

        <Subheading>LLM Limitations and Hallucinations</Subheading>
        <p>
          Large language models and AI systems have inherent limitations that are
          outside XO&apos;s control. These include, without limitation:
        </p>
        <List>
          <li>
            <Term>Hallucinations</Term> — Models may generate information that is
            factually incorrect, fabricated, or entirely fictional while
            appearing confident and authoritative. XO makes no warranty that any
            Model output is truthful or accurate.
          </li>
          <li>
            <Term>Unpredictability</Term> — Model behavior can vary between runs
            even given identical inputs. Outputs are not deterministic and may
            change as LLM Providers update or replace their models.
          </li>
          <li>
            <Term>Context limitations</Term> — Models have finite context windows
            and may lose, misinterpret, or incorrectly summarize information
            provided to them.
          </li>
          <li>
            <Term>Bias and safety failures</Term> — Models may produce outputs
            that are biased, offensive, unsafe, or otherwise inappropriate
            despite filtering measures implemented by LLM Providers.
          </li>
          <li>
            <Term>Outdated knowledge</Term> — Models have training data cutoff
            dates and may not reflect recent events, updated laws, or current
            best practices.
          </li>
        </List>
        <p>
          You acknowledge these limitations and agree that XO is not liable for
          any harm, loss, or damage arising from reliance on AI-generated
          outputs. It is your responsibility to review, validate, and
          independently verify any output before acting on it.
        </p>

        <Subheading>
          Bring Your Own LLM / Third-Party Model Providers
        </Subheading>
        <p>
          The Services allow you to connect and use Models from LLM Providers of
          your choice, including Anthropic (Claude), OpenAI (ChatGPT / GPT-4o),
          Google (Gemini), Meta (Llama), Mistral, and others. When you do so:
        </p>
        <List>
          <li>
            <Term>Your Agreement with LLM Providers.</Term> Your use of any LLM
            Provider&apos;s model through the Services is separately governed by
            that LLM Provider&apos;s own terms of service, acceptable use policy,
            and privacy policy. By configuring a Model, you represent that you
            have read, understood, and agreed to that LLM Provider&apos;s terms.
            XO is not a party to, and has no control over, any agreement between
            you and an LLM Provider.
          </li>
          <li>
            <Term>API Key Responsibility.</Term> You are solely responsible for
            obtaining, securing, and managing any API keys or credentials
            required to access an LLM Provider. XO does not assume custody or
            ownership of your API keys. You must not share API keys with
            unauthorized parties and must rotate them promptly if compromised.
          </li>
          <li>
            <Term>Costs and Usage Limits.</Term> LLM Providers charge for model
            usage independently of XO&apos;s fees. You are solely responsible for
            all costs incurred with your chosen LLM Provider. XO is not liable
            for unexpected charges, rate limiting, or service suspension by an
            LLM Provider.
          </li>
          <li>
            <Term>LLM Provider Availability.</Term> XO does not guarantee the
            availability, performance, or continuity of any third-party Model. If
            an LLM Provider changes its API, deprecates a model, or experiences
            an outage, your Agents may be affected. XO is not responsible for
            service degradation caused by LLM Provider changes.
          </li>
          <li>
            <Term>Assumption of Risk.</Term> By bringing your own LLM, you assume
            all risks associated with that Model&apos;s outputs, limitations, and
            compliance with applicable laws, including any hallucinations,
            errors, or harmful content generated by the Model.
          </li>
        </List>

        <Subheading>Third-Party Platform Compliance</Subheading>
        <p>
          When you deploy Agents to Third-Party Services (e.g., Telegram,
          WhatsApp, Slack), you are solely responsible for ensuring compliance
          with those platforms&apos; terms of service, policies, and applicable
          laws. XO is not liable for suspensions, bans, or other consequences
          arising from your use of those platforms.
        </p>

        <p>
          <Term>No Professional Advice.</Term> Nothing generated by an Agent or
          Model through the Services constitutes legal, financial, medical, or
          professional advice of any kind.
        </p>
      </Section>

      <Section number={7} title="Deployments and Infrastructure">
        <List>
          <li>
            <Term>Uptime and Availability.</Term> XO will use commercially
            reasonable efforts to maintain Service availability. We do not
            guarantee uninterrupted, error-free, or secure access. Scheduled and
            unscheduled maintenance may affect availability.
          </li>
          <li>
            <Term>Resource Limits.</Term> Deployments are subject to resource
            limits (CPU, memory, bandwidth, storage) defined by your plan.
            Excessive or abusive consumption may result in throttling,
            suspension, or additional charges.
          </li>
          <li>
            <Term>Container and Application Responsibility.</Term> You are
            responsible for the security, correctness, and compliance of any code
            or application you deploy via XO Launchpad and/or XO Workspaces. XO
            does not audit the content of Deployments and is not liable for
            vulnerabilities, breaches, or failures in your applications.
          </li>
          <li>
            <Term>Data Persistence.</Term> XO does not guarantee the persistence
            of data stored in Deployments. You are responsible for maintaining
            backups of any data critical to your operations.
          </li>
        </List>
      </Section>

      <Section number={8} title="User Content and Data">
        <List>
          <li>
            <Term>Ownership.</Term> You retain ownership of all Content you
            submit to the Services. By submitting Content, you grant XO a
            non-exclusive, worldwide, royalty-free license to host, store,
            process, and transmit your Content solely to the extent necessary to
            provide the Services to you.
          </li>
          <li>
            <Term>Responsibility.</Term> You represent and warrant that your
            Content does not violate any third-party rights or applicable laws,
            and that you have all rights necessary to grant the licenses above.
          </li>
          <li>
            <Term>Model Training.</Term> XO will not use your Content to train or
            improve AI models without your explicit consent.
          </li>
          <li>
            <Term>Data Processing.</Term> Our collection and use of personal data
            is governed by our{" "}
            <Link href="/privacy" className="text-[#83d63a] hover:underline">
              Privacy Policy
            </Link>
            , which is incorporated into these Terms by reference.
          </li>
        </List>
      </Section>

      <Section number={9} title="Intellectual Property">
        <List>
          <li>
            <KeyTerm>XO IP.</KeyTerm> The Services, including all software,
            interfaces, designs, logos, trademarks, and documentation, are the
            exclusive property of XO or its licensors. Nothing in these Terms
            grants you any rights in XO&apos;s intellectual property except the
            limited license to use the Services as described herein.
          </li>
          <li>
            <KeyTerm>Your IP.</KeyTerm> Except as set out in Section 8, XO claims
            no ownership over your Content or any applications you build using
            the Services.
          </li>
          <li>
            <KeyTerm>Feedback.</KeyTerm> If you provide suggestions, ideas, or
            feedback about the Services, you grant XO a perpetual, irrevocable,
            royalty-free license to use that feedback for any purpose without
            compensation to you.
          </li>
        </List>
      </Section>

      <Section number={10} title="Third-Party Integrations and Services">
        <p>
          The Services may integrate with or link to Third-Party Services. XO
          does not control those services and is not responsible for their
          content, availability, or practices. Your use of Third-Party Services
          is subject to their own terms of service and privacy policies. XO is
          not liable for any damages or losses arising from your use of
          Third-Party Services.
        </p>
        <p>
          <Term>LLM Providers as Third-Party Services.</Term> LLM Providers
          (including Anthropic, OpenAI, Google, Meta, Mistral, and others) are
          Third-Party Services for purposes of these Terms. XO acts solely as
          infrastructure that routes your requests to the Model you configure. XO
          does not endorse, certify, or assume responsibility for any LLM
          Provider or the outputs of any Model. Any data you send to an LLM
          Provider through the Services is subject to that provider&apos;s data
          handling and privacy practices, which may include logging, human
          review, or use for model improvement depending on your agreement with
          that provider. You are responsible for ensuring your use of any LLM
          Provider complies with applicable data protection laws and your own
          privacy obligations to end users.
        </p>
      </Section>

      <Section number={11} title="Affiliate Program">
        <p>
          XO operates an affiliate program whereby participants may earn a
          commission on referred user payments. Participation in the affiliate
          program is subject to the separate Affiliate Program Terms, which are
          incorporated by reference. XO reserves the right to modify commission
          rates, eligibility criteria, and payout terms upon reasonable notice.
          Commissions will not be paid on fraudulent referrals, self-referrals,
          or referrals obtained through prohibited means.
        </p>
      </Section>

      <Section number={12} title="Payment and Subscriptions">
        <List>
          <li>
            <Term>Fees.</Term> Access to certain features requires a paid
            subscription. Fees are as listed on the pricing page at{" "}
            <span className="text-white font-semibold">
              xo.builders/pricing
            </span>{" "}
            and are subject to change.
          </li>
          <li>
            <Term>Billing.</Term> Subscriptions are billed in advance on a
            recurring basis (monthly or annual, depending on the plan selected).
            By providing payment information, you authorize XO to charge your
            payment method for all applicable fees.
          </li>
          <li>
            <Term>Taxes.</Term> Fees are exclusive of taxes. You are responsible
            for all applicable taxes, levies, or duties imposed by taxing
            authorities.
          </li>
          <li>
            <Term>Refunds.</Term> Fees are non-refundable except as required by
            applicable law or as expressly stated in a separate agreement.
          </li>
          <li>
            <Term>Non-Payment.</Term> Failure to pay may result in suspension or
            termination of your account and loss of access to your Deployments
            and data.
          </li>
        </List>
      </Section>

      <Section number={13} title="Disclaimers">
        <p className="uppercase font-semibold text-white text-sm leading-relaxed tracking-wide">
          The Services are provided &quot;as is&quot; and &quot;as
          available&quot; without warranties of any kind, either express or
          implied, including but not limited to warranties of merchantability,
          fitness for a particular purpose, non-infringement, or uninterrupted
          access. XO does not warrant that the Services will be error-free,
          secure, or free from harmful components. Your use of the Services is at
          your sole risk.
        </p>
        <p>
          Agent outputs are inherently unpredictable and may be factually
          incorrect, incomplete, biased, or harmful. XO does not review,
          validate, or endorse any Agent output. You bear sole responsibility for
          independently verifying any output before using it to inform a
          decision, communication, or action. No Agent output should be treated
          as authoritative or as a substitute for professional judgment.
        </p>
      </Section>

      <Section number={14} title="Limitation of Liability">
        <p className="uppercase font-semibold text-white text-sm leading-relaxed tracking-wide">
          To the maximum extent permitted by applicable law, XO and its officers,
          directors, employees, agents, and licensors shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages,
          including loss of profits, data, goodwill, or business interruption,
          arising out of or related to your use of or inability to use the
          Services, even if advised of the possibility of such damages.
        </p>
        <p>
          In no event shall XO&apos;s total aggregate liability to you for all
          claims arising out of or related to these Terms exceed the greater of
          (a) <Term>the amount you paid to XO in the three (3) months preceding
          the claim</Term>, or (b){" "}
          <Term>one hundred US dollars (USD $100)</Term>.
        </p>
        <p className="text-sm text-white/40">
          Some jurisdictions do not allow the exclusion or limitation of certain
          warranties or liability, so the above limitations may not apply to you
          in full.
        </p>
      </Section>

      <Section number={15} title="Indemnification">
        <p>
          You agree to <Term>indemnify, defend, and hold harmless</Term> XO and
          its affiliates, officers, directors, employees, and agents from and
          against any claims, liabilities, damages, losses, and expenses
          (including reasonable attorneys&apos; fees) arising out of or related
          to: (a) your use of the Services; (b) your Content; (c) your Agents and
          Deployments; (d) your violation of these Terms; or (e) your violation
          of any third party&apos;s rights.
        </p>
      </Section>

      <Section number={16} title="Termination">
        <List>
          <li>
            <Term>By You.</Term> You may close your account at any time by
            following the account closure process in your dashboard. Termination
            does not entitle you to a refund of any prepaid fees.
          </li>
          <li>
            <Term>By XO.</Term> XO may suspend or terminate your access to the
            Services at any time, with or without cause, upon reasonable notice
            where practicable. XO may terminate immediately and without notice if
            you breach these Terms, engage in fraudulent activity, or if
            continued access poses a risk to the platform or other users.
          </li>
          <li>
            <Term>Effect of Termination.</Term> Upon termination, your right to
            access the Services ceases immediately. Sections 7 (Deployments), 8
            (User Content), 9 (Intellectual Property), 13 (Disclaimers), 14
            (Limitation of Liability), 15 (Indemnification), and 18 (Governing
            Law) survive termination.
          </li>
        </List>
      </Section>

      <Section number={17} title="Changes to These Terms">
        <p>
          We may update these Terms from time to time. If we make material
          changes, we will notify you by email or by posting a notice on the
          platform prior to the change taking effect. Your continued use of the
          Services after the effective date of revised Terms constitutes your
          acceptance of the changes. If you do not agree to the revised Terms,
          you must stop using the Services.
        </p>
      </Section>

      <Section number={18} title="Governing Law and Dispute Resolution">
        <p>
          These Terms are governed by and construed in accordance with the laws
          of <Term>Delaware</Term>, without regard to its conflict of law
          provisions.
        </p>
        <p>
          Any dispute arising out of or relating to these Terms or the Services
          that cannot be resolved informally shall be submitted to binding
          arbitration in accordance with the rules of the American Arbitration
          Association (AAA). Arbitration will be conducted in English on an
          individual basis.{" "}
          <Term>
            You waive any right to participate in class action lawsuits or
            class-wide arbitration.
          </Term>{" "}
          The arbitrator&apos;s award shall be final and binding, and judgment
          may be entered in any court of competent jurisdiction.
        </p>
        <p>
          Notwithstanding the above, either party may seek injunctive or
          equitable relief in any court of competent jurisdiction for matters
          involving intellectual property rights or confidentiality obligations.
        </p>
      </Section>

      <Section number={19} title="Miscellaneous">
        <List>
          <li>
            <KeyTerm>Entire Agreement.</KeyTerm> These Terms, together with the
            Privacy Policy and any supplemental terms (e.g., Affiliate Program
            Terms), constitute the entire agreement between you and XO with
            respect to the Services.
          </li>
          <li>
            <KeyTerm>Severability.</KeyTerm> If any provision of these Terms is
            found to be unenforceable, the remaining provisions will remain in
            full force and effect.
          </li>
          <li>
            <KeyTerm>No Waiver.</KeyTerm> Failure by XO to enforce any provision
            of these Terms shall not constitute a waiver of XO&apos;s right to
            enforce it in the future.
          </li>
          <li>
            <KeyTerm>Assignment.</KeyTerm> You may not assign or transfer your
            rights under these Terms without XO&apos;s prior written consent. XO
            may assign its rights without restriction.
          </li>
          <li>
            <KeyTerm>Force Majeure.</KeyTerm> XO is not liable for delays or
            failures in performance resulting from circumstances beyond its
            reasonable control, including acts of God, infrastructure outages,
            cyberattacks, or government actions.
          </li>
          <li>
            <KeyTerm>No Agency.</KeyTerm> Nothing in these Terms creates a
            partnership, joint venture, employment, or agency relationship
            between you and XO.
          </li>
        </List>
      </Section>

      <Section number={20} title="Contact">
        <p>For questions about these Terms, contact us at:</p>
        <ContactCard />
        <Callout>
          Looking for how we handle your data? Read the{" "}
          <Link href="/privacy" className="text-[#83d63a] hover:underline">
            Privacy Policy
          </Link>
          .
        </Callout>
      </Section>
    </LegalPage>
  );
}
