import { ImageResponse } from "next/og";

export const alt = "Juan Caballero, desarrollador fullstack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The preview shown when the link is shared on WhatsApp, LinkedIn, etc. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#1d1d1f",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 66,
            background: "#1d1d1f",
            color: "#ffffff",
            fontSize: 56,
            fontWeight: 600,
            letterSpacing: -2,
          }}
        >
          JC
        </div>
        <div style={{ marginTop: 44, fontSize: 112, fontWeight: 600, letterSpacing: -5 }}>Juan Caballero.</div>
        <div style={{ marginTop: 14, fontSize: 42, color: "#bf4800" }}>Desarrollador fullstack</div>
      </div>
    ),
    { ...size },
  );
}
