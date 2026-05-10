import { redirect } from "next/navigation";

// Root page redirects to the main shop experience
export default function RootPage() {
  redirect("/home");
}
