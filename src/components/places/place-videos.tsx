import type { PlaceVideo } from "@/content/places";
import { publicImageSrc } from "@/lib/public-image";
import styles from "./place-videos.module.css";

type PlaceVideosProps = {
  videos: readonly PlaceVideo[];
  placeName: string;
};

function youtubeEmbedSrc(src: string): string {
  if (src.startsWith("http")) {
    try {
      const url = new URL(src);
      const id =
        url.searchParams.get("v") ||
        url.pathname.split("/").filter(Boolean).pop() ||
        src;
      return `https://www.youtube.com/embed/${id}`;
    } catch {
      return src;
    }
  }
  return `https://www.youtube.com/embed/${src}`;
}

export function PlaceVideos({ videos, placeName }: PlaceVideosProps) {
  if (videos.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="place-videos-heading">
      <h2 id="place-videos-heading" className={styles.heading}>
        Videos
      </h2>
      <div className={styles.grid}>
        {videos.map((video) => (
          <div key={`${video.type}-${video.src}`} className={styles.card}>
            {video.type === "youtube" ? (
              <iframe
                className={styles.frame}
                src={youtubeEmbedSrc(video.src)}
                title={video.title ?? `${placeName} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <video
                className={styles.frame}
                controls
                playsInline
                poster={video.poster ? publicImageSrc(video.poster) : undefined}
                src={video.src}
              >
                <track kind="captions" />
              </video>
            )}
            {video.title ? <p className={styles.caption}>{video.title}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
