import type { Metadata } from "next";
import ProfilePageClient from "./ProfilePageClient";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "View and manage your NoteHub profile.",
  openGraph: {
    title: "Profile | NoteHub",
    description: "View and manage your NoteHub profile.",
    type: "website",
  },
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}