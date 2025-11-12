import { useState } from "react";

export const VideoHeader = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="w-full py-4">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div
            className="overflow-hidden bg-black"
            style={{ padding: "56.25% 0 0 0", position: "relative" }}
          >
            {!isVideoLoaded && (
              <img
                src="/video-placeholder.png"
                alt="Cargando video..."
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            )}
            <iframe
              src="https://player.vimeo.com/video/1135513085?background=1&autoplay=1&loop=1&muted=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: isVideoLoaded ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
              title="Header Video"
              onLoad={() => setIsVideoLoaded(true)}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};