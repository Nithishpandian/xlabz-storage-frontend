import { useState } from "react";
import {
  getFileApi,
  deleteFileApi,
  renameFileApi,
  downloadFileApi,
} from "../api/storageApi";

export default function FileActions({ setMedia }) {
  const [assetId, setAssetId] = useState("");
  const [newName, setNewName] = useState("");

  return (
    <>
      <h3>File Actions</h3>
      <input
        placeholder="Asset ID"
        onChange={(e) => setAssetId(e.target.value)}
      />

      <button onClick={async () => setMedia((await getFileApi(assetId)).data)}>
        Get
      </button>

      <button onClick={() => deleteFileApi(assetId)}>Delete</button>

      <button
        onClick={async () => {
          try {
            const result = await downloadFileApi(assetId);

            if (result.type === "file") {
              window.location.href = result.signed_url;
            } else if (result.type === "directory") {
              const url = window.URL.createObjectURL(result.blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = result.filename;
              document.body.appendChild(a);
              a.click();

              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            }
          } catch (error) {
            console.error("Download failed:", error);
            alert("Download failed. Please try again.");
          }
        }}
      >
        Download
      </button>

      <br />
      <input
        placeholder="New filename"
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={() => renameFileApi(assetId, newName)}>Rename</button>
    </>
  );
}
