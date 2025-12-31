import { useState } from "react";
import CreateDirectory from "./components/CreateDirectory";
import UploadFile from "./components/UploadFile";
import FileActions from "./components/FileActions";
import MoveFiles from "./components/MoveFiles";
import MediaPreview from "./components/MediaPreview";

export default function App() {
  const [media, setMedia] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 Storage API – Test UI</h2>

      <CreateDirectory />
      <hr />

      <UploadFile />
      <hr />

      <FileActions setMedia={setMedia} />
      <hr />

      <MoveFiles />
      <hr />

      <MediaPreview media={media} />
    </div>
  );
}
