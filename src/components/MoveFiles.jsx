import { useState } from "react";
import { moveFilesApi } from "../api/storageApi";

export default function MoveFiles() {
  const [fileIds, setFileIds] = useState("");
  const [parentId, setParentId] = useState("");

  const move = async () => {
    await moveFilesApi({
      creator_id: 1,
      parent_id: Number(parentId),
      file_ids: fileIds.split(",").map(Number),
    });
    alert("Moved");
  };

  return (
    <>
      <h3>Move Files</h3>
      <input placeholder="File IDs" onChange={(e) => setFileIds(e.target.value)} />
      <input placeholder="Target Parent ID" onChange={(e) => setParentId(e.target.value)} />
      <button onClick={move}>Move</button>
    </>
  );
}
