import { redirect } from "next/navigation";

/* The AI view moved to its own address. */
export default function WhitepaperAiRedirect() {
  redirect("/ai");
}
