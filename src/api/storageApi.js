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

export const getThumbnailApi = (id) =>
  fetch(`${API_BASE}/thumbnail/${id}`).then((r) => r.json());

export const renameFileApi = (id, newName) =>
  fetch(`${API_BASE}/update/filename/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ new_filename: newName }),
  });

export const deleteFileApi = (id) =>
  fetch(`${API_BASE}/delete/${id}`, { method: "DELETE" });

export const downloadFileApi = async (id) => {
  const response = await fetch(`${API_BASE}/download/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/zip",
    },
  });

  const contentType = response.headers.get("Content-Type");

  if (contentType?.includes("application/json")) {
    const data = await response.json();
    return {
      type: "file",
      signed_url: data.data.signed_url,
      filename: data.data.filename,
    };
  } else if (contentType?.includes("application/zip")) {
    const blob = await response.blob();
    const filename = getFilenameFromHeaders(response.headers);
    return {
      type: "directory",
      blob,
      filename,
    };
  } else {
    throw new Error("Unexpected response type");
  }
};

function getFilenameFromHeaders(headers) {
  const disposition = headers.get("Content-Disposition");

  if (!disposition) {
    return "folder.zip";
  }

  const encodedMatch = disposition.match(/filename\*=UTF-8''([^;,\n]+)/i);
  if (encodedMatch && encodedMatch[1]) {
    try {
      return decodeURIComponent(encodedMatch[1]);
    } catch (e) {
      console.error("Failed to decode filename:", e);
    }
  }

  const regularMatch = disposition.match(/filename="?([^";\n]+)"?/i);
  if (regularMatch && regularMatch[1]) {
    return regularMatch[1].trim();
  }

  return "folder.zip";
}

export const moveFilesApi = (payload) =>
  fetch(`${API_BASE}/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
