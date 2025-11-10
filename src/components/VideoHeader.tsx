export const VideoHeader = () => {
  return (
    <section className="w-full">
      <div style={{ padding: '75% 0 0 0', position: 'relative' }}>
        <iframe
          src="https://player.vimeo.com/video/1135508272?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          title="Header Video"
        ></iframe>
      </div>
    </section>
  );
};