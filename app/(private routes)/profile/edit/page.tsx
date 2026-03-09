"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getMe, updateMe } from "@/lib/api/clientApi";
import type { User } from "@/types/user";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [user, setUserState] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getMe();
        setUserState(data);
        setUsername(data.username);
      } catch (error) {
        console.error(error);
      }
    }

    loadUser();
  }, []);
  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
    const updatedUser = await updateMe({ username });
    setUser(updatedUser);
    router.push("/profile");
  } catch (error) {
    console.error(error);
  }
};
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
  src={user?.avatar || "https://ac.goit.global/fullstack/react/default-avatar.jpg"}
  alt="User Avatar"
  width={120}
  height={120}
  className={css.avatar}
/>
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
  id="username"
  type="text"
  className={css.input}
  value={username}
  onChange={(event) => setUsername(event.target.value)}
/>
          </div>

          <p>Email: {user?.email || "Loading..."}</p>

          <div className={css.actions}>
  <button type="submit" className={css.saveButton}>
    Save
  </button>
  <button
    type="button"
    className={css.cancelButton}
    onClick={() => router.push("/profile")}
  >
    Cancel
  </button>
</div>
        </form>
      </div>
    </main>
  );
}