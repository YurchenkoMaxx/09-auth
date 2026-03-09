import axios, { type AxiosResponse } from "axios";
import { cookies } from "next/headers";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";
import type { FetchNotesParams, FetchNotesResponse } from "./clientApi";

const serverApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});
async function getCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore.toString();
}
export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const cleanedParams: FetchNotesParams = { ...params };

  if (!params.search?.trim()) delete cleanedParams.search;
  if (!params.tag) delete cleanedParams.tag;

  const cookie = await getCookieHeader();

  const response = await serverApi.get<FetchNotesResponse>("/notes", {
    params: cleanedParams,
    headers: {
      Cookie: cookie,
    },
  });

  return response.data;
}
export async function fetchNoteById(id: string): Promise<Note> {
  const cookie = await getCookieHeader();

  const response = await serverApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookie,
    },
  });

  return response.data;
}
export async function getMe(): Promise<User> {
  const cookie = await getCookieHeader();

  const response = await serverApi.get<User>("/users/me", {
    headers: {
      Cookie: cookie,
    },
  });

  return response.data;
}
export async function checkSession(): Promise<AxiosResponse<User | null>> {
  const cookie = await getCookieHeader();

  const response = await serverApi.get<User | null>("/auth/session", {
    headers: {
      Cookie: cookie,
    },
  });

  return response;
}