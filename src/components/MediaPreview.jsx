export default function MediaPreview({ media }) {
  if (!media) return null;

  if (media.file_type === "video")
    return <video controls width="500" src={media.signed_url} />;

  if (media.file_type === "audio")
    return <audio controls src={media.signed_url} />;

  if (media.file_type === "image")
    return <img src={media.signed_url} width="400" />;

  return null;
}
