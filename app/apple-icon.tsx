import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* Home-screen icon: the JC monogram on black (iOS rounds the corners itself). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1d1d1f",
          color: "#ffffff",
          fontSize: 78,
          fontWeight: 600,
          letterSpacing: -3,
        }}
      >
        JC
      </div>
    ),
    { ...size },
  );
}
