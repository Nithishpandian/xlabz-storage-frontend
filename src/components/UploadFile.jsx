import { useState } from "react";
import { PART_SIZE } from "../constants/storage";
import { initUploadApi, completeUploadApi } from "../api/storageApi";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [parentId, setParentId] = useState("");
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return alert("Select file");

    setLoading(true);
    const parts = Math.ceil(file.size / PART_SIZE);

    const init = await initUploadApi({
      file_name: file.name,
      file_ext: file.type,
      size: file.size,
      parts,
      file_type: file.type.startsWith("video")
        ? "video"
        : file.type.startsWith("audio")
        ? "audio"
        : "image",
      creator_id: 1,
      parent_id: parentId ? Number(parentId) : null,
    });

    const uploadData = init.data.initAssetUpload;
    const completedParts = [];

    for (let i = 0; i < uploadData.signed_urls.length; i++) {
      const chunk = file.slice(i * PART_SIZE, (i + 1) * PART_SIZE);
      const res = await fetch(uploadData.signed_urls[i], {
        method: "PUT",
        body: chunk,
      });

      let etag = res.headers.get("ETag");
      if (etag && !etag.startsWith('"')) etag = `"${etag}"`;

      completedParts.push({ PartNumber: i + 1, ETag: etag });
    }

    const result = await completeUploadApi({
      asset_id: uploadData.asset_id,
      upload_id: uploadData.upload_id,
      file_key: uploadData.file_key,
      completed_parts: completedParts,
    });
    console.log(result);

    alert("Upload completed");
    setLoading(false);
  };

  return (
    <>
      <h3>Upload File</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        placeholder="Parent ID"
        onChange={(e) => setParentId(e.target.value)}
      />
      <button onClick={upload} disabled={loading}>
        Upload
      </button>
    </>
  );
}
