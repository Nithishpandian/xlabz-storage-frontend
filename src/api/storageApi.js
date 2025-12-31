import { API_BASE } from "../constants/storage";

export const createDirectoryApi = (payload) =>
  fetch(`${API_BASE}/create/directory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((r) => r.json());

export const initUploadApi = (payload) =>
  fetch(`${API_BASE}/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((r) => r.json());

export const completeUploadApi = (payload) =>
  fetch(`${API_BASE}/upload/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const getFileApi = (id) =>
  fetch(`${API_BASE}/get/${id}`).then((r) => r.json());

export const renameFileApi = (id, newName) =>
  fetch(`${API_BASE}/update/filename/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ new_filename: newName }),
  });

export const deleteFileApi = (id) =>
  fetch(`${API_BASE}/delete/${id}`, { method: "DELETE" });

export const downloadFileApi = (id) =>
  fetch(`${API_BASE}/download/${id}`).then((r) => r.json());

export const moveFilesApi = (payload) =>
  fetch(`${API_BASE}/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
