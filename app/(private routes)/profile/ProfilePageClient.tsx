"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMe } from "@/lib/api/clientApi";
import type { User } from "@/types/user";
import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadUser();
  }, []);
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <img
            src={user?.avatar || "https://ac.goit.global/fullstack/react/default-avatar.jpg"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user?.username || "Loading..."}</p>
<p>Email: {user?.email || "Loading..."}</p>
        </div>
      </div>
    </main>
  );
}