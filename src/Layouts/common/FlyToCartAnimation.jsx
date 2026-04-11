import React from "react";

export default function FlyToCartAnimation({
  animation,
  fallbackImage = "https://via.placeholder.com/200?text=No+Image",
}) {
  if (!animation) return null;

  return (
    <img
      src={animation.src}
      alt=""
      aria-hidden="true"
      className="pointer-events-none fixed z-[120] rounded-xl border border-white/70 object-cover shadow-2xl will-change-transform"
      style={{
        left: animation.active ? animation.end.x : animation.start.x,
        top: animation.active ? animation.end.y : animation.start.y,
        width: animation.active ? animation.end.width : animation.start.width,
        height: animation.active ? animation.end.height : animation.start.height,
        opacity: animation.active ? animation.end.opacity : animation.start.opacity,
        transform: `scale(${animation.active ? animation.end.scale : animation.start.scale})`,
        transition:
          "left 1200ms cubic-bezier(0.22, 1, 0.36, 1), top 1200ms cubic-bezier(0.22, 1, 0.36, 1), width 1200ms cubic-bezier(0.22, 1, 0.36, 1), height 1200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1200ms ease, transform 1200ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onError={(e) => {
        e.currentTarget.src = fallbackImage;
      }}
    />
  );
}
