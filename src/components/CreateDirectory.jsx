import { useState } from "react";
import { createDirectoryApi } from "../api/storageApi";

export default function CreateDirectory() {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");

  const create = async () => {
    const res = await createDirectoryApi({
      directory_name: name,
      parent_id: parentId ? Number(parentId) : null,
      creator_id: 1,
    });
    alert(JSON.stringify(res));
  };

  return (
    <>
      <h3>Create Directory</h3>
      <input
        placeholder="Directory Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Parent ID (Optional)"
        onChange={(e) => setParentId(e.target.value)}
      />
      <button onClick={create}>Create</button>
    </>
  );
}
