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
      <input placeholder="Asset ID" onChange={(e) => setAssetId(e.target.value)} />

      <button onClick={async () => setMedia((await getFileApi(assetId)).data)}>
        Get
      </button>

      <button onClick={() => deleteFileApi(assetId)}>Delete</button>

      <button
        onClick={async () => {
          const res = await downloadFileApi(assetId);
          window.location.href = res.data.signed_url;
        }}
      >
        Download
      </button>

      <br />
      <input placeholder="New filename" onChange={(e) => setNewName(e.target.value)} />
      <button onClick={() => renameFileApi(assetId, newName)}>Rename</button>
    </>
  );
}
