import { api } from "./api";
import type { User } from "@/types/user";
import type { Note, CreateNoteParams } from "@/types/note";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface AuthCredentials {
  email: string;
  password: string;
}
export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const cleanedParams: FetchNotesParams = { ...params };

  if (!params.search?.trim()) delete cleanedParams.search;
  if (!params.tag) delete cleanedParams.tag;

  const response = await api.get<FetchNotesResponse>("/notes", {
    params: cleanedParams,
  });

  return response.data;
}
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}
export async function createNote(data: CreateNoteParams): Promise<Note> {
  const response = await api.post<Note>("/notes", data);
  return response.data;
}
export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}
export async function register(data: AuthCredentials): Promise<User> {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
}
export async function login(data: AuthCredentials): Promise<User> {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
}
export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}
export async function checkSession(): Promise<User | null> {
  const response = await api.get<User | null>("/auth/session");
  return response.data;
}
export async function getMe(): Promise<User> {
  const response = await api.get<User>("/users/me");
  return response.data;
}
export async function updateMe(data: Partial<User>): Promise<User> {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
}