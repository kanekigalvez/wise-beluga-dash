export const VideoHeader = () => {
  return (
    <section className="w-full py-4">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div
            className="overflow-hidden bg-black"
            style={{ padding: "56.25% 0 0 0", position: "relative" }}
          >
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
              }}
              title="Header Video"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};