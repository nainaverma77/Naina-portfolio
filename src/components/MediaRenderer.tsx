import React from "react";

interface MediaRendererProps {
  url: string;
  alt?: string;
  className?: string;
}

export default function MediaRenderer({
  url,
  alt = "Media",
  className = "",
}: MediaRendererProps) {
  if (!url) return null;

  // Check for YouTube
  const youtubeRegex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const ytMatch = url.match(youtubeRegex);

  if (ytMatch && ytMatch[1]) {
    return (
      <iframe
        className={`w-full h-full object-cover ${className}`}
        src={`https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}&controls=0`}
        title={alt}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  // Check for Vimeo
  const vimeoRegex = /vimeo\.com\/(?:.*#|.*\/videos\/)?([0-9]+)/i;
  const vimeoMatch = url.match(vimeoRegex);

  if (vimeoMatch && vimeoMatch[1]) {
    return (
      <iframe
        className={`w-full h-full object-cover ${className}`}
        src={`https://player.vimeo.com/video/${vimeoMatch[1]}?background=1&autoplay=1&loop=1&byline=0&title=0`}
        title={alt}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }

  // Check for Google Drive
  const driveRegex =
    /drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/i;
  const driveMatch = url.match(driveRegex);

  if (driveMatch && driveMatch[1]) {
    // Render Google Drive images using the uc endpoint
    return (
      <img
        src={`https://drive.google.com/uc?export=view&id=${driveMatch[1]}`}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        onError={(e) => {
          (e.target as HTMLImageElement).style.opacity = "0.5";
        }}
      />
    );
  }

  // Check for video files
  const isVideoFile = /\.(mp4|webm|ogg)$/i.test(url);
  if (isVideoFile) {
    return (
      <video
        className={`w-full h-full object-cover ${className}`}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    );
  }

  // Default to image
  return (
    <img
      src={url}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      onError={(e) => {
        // Fallback for broken images if needed
        (e.target as HTMLImageElement).style.opacity = "0.5";
      }}
    />
  );
}
