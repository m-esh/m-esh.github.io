import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

export const dynamic = "force-static";
export const alt = `${profile.name} · ${profile.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#19181f",
          color: "#f5f4f0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 64,
            height: 4,
            backgroundColor: "#e8c450",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9c9aa8",
          }}
        >
          {profile.location}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 40,
            color: "#e8c450",
          }}
        >
          {profile.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
