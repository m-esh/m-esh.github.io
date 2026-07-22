import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#19181f",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="3.4" r="1.6" fill="#00a46e" />
          <line x1="16" y1="5" x2="16" y2="7.5" stroke="#00a46e" strokeWidth={1.6} />
          <circle cx="5.6" cy="15" r="1.4" fill="#00a46e" />
          <circle cx="26.4" cy="15" r="1.4" fill="#00a46e" />
          <rect x="7" y="7.5" width="18" height="15" rx="2.5" stroke="#00a46e" strokeWidth={1.6} />
          <rect x="10.5" y="12.5" width="3.6" height="3.6" rx="0.8" fill="#00a46e" />
          <rect x="17.9" y="12.5" width="3.6" height="3.6" rx="0.8" fill="#00a46e" />
          <line x1="11" y1="19" x2="21" y2="19" stroke="#00a46e" strokeWidth={1.4} strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
