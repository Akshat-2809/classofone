import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Class of One — Every child deserves a class of one.";

function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect width="40" height="40" rx="10" fill="#FFD23F" />
      <path d="M14 13 L22 9 L22 31" fill="none" stroke="#17223A" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 31 H29" stroke="#17223A" strokeWidth="4.2" strokeLinecap="round" />
      <circle cx="31" cy="11" r="3.2" fill="#E35D52" />
    </svg>
  );
}

/** Shared by opengraph-image and twitter-image. */
export function renderOgImage() {
  // Sync read keeps the image prerendered at build time (async fs would make it dynamic).
  const gabarito = readFileSync(join(process.cwd(), "assets/Gabarito-ExtraBold.ttf"));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#FBFCFE", fontFamily: "Gabarito", color: "#17223A", overflow: "hidden" }}>
        {/* the ruled notebook page, with its red margin */}
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 39 + i * 40, height: 2, background: "#DCE6F4" }} />
        ))}
        <div style={{ position: "absolute", left: 56, top: 0, bottom: 0, width: 3, background: "#E35D52" }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 80px 64px 104px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Mark size={72} />
            <span style={{ fontSize: 46, letterSpacing: "-0.03em" }}>class of <span style={{ color: "#E35D52", marginLeft: 12 }}>one</span></span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 0.95, letterSpacing: "-0.04em" }}>
            <span>Every child deserves a</span>
            <span>class of&nbsp;<span style={{ color: "#E35D52", marginLeft: 26 }}>one.</span></span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Gabarito", data: gabarito, style: "normal", weight: 800 }] },
  );
}

export function renderAppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFD23F" }}>
        <svg width="180" height="180" viewBox="0 0 40 40">
          <path d="M14 13 L22 9 L22 31" fill="none" stroke="#17223A" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 31 H29" stroke="#17223A" strokeWidth="4.2" strokeLinecap="round" />
          <circle cx="31" cy="11" r="3.2" fill="#E35D52" />
        </svg>
      </div>
    ),
    { width: 180, height: 180 },
  );
}
