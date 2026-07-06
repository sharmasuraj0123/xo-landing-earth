import { redirect } from "next/navigation";

// The grant announcement now lives on the XO × Google journey page.
export default function GrantRedirect() {
  redirect("/blog/xo-google");
}
