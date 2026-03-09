"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const privateRoutes = ["/profile", "/notes"];
   useEffect(() => {
    async function verifySession() {
      const isPrivateRoute = privateRoutes.some((route) =>
        pathname.startsWith(route)
      );

      if (!isPrivateRoute) {
        setLoading(false);
        return;
      }

      try {
        const session = await checkSession();

if (session) {
  const currentUser = await getMe();
  setUser(currentUser);
} else {
  clearIsAuthenticated();
  router.push("/sign-in");
  return;
}
      } catch {
        clearIsAuthenticated();
        router.push("/sign-in");
        return;
      } finally {
        setLoading(false);
      }
    }

    verifySession();
  }, [pathname, router, setUser, clearIsAuthenticated]);
    if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}