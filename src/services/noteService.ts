import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

export const noteService = {
  async fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
    const { data } = await api.get<FetchNotesResponse>("/notes", { params });
    return data;
  },

  async createNote(noteData: CreateNoteData): Promise<Note> {
    const { data } = await api.post<Note>("/notes", noteData);
    return data;
  },

  async deleteNote(noteId: string): Promise<Note> {
    const { data } = await api.delete<Note>(`/notes/${noteId}`);
    return data;
  },
};
