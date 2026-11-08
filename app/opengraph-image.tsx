import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { WORDMARK_PATH } from "@/components/brand/Logo";
import { hero, site } from "@/lib/content";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const manropeMedium = await readFile(join(process.cwd(), "assets/fonts/Manrope-Medium.ttf"));
const manropeSemiBold = await readFile(join(process.cwd(), "assets/fonts/Manrope-SemiBold.ttf"));

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#251d44",
          color: "#f9f9fb",
          fontFamily: "Manrope",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -80,
            width: 560,
            height: 560,
            borderRadius: 560,
            background: "#d1f383",
            opacity: 0.16,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: 380,
            width: 480,
            height: 480,
            borderRadius: 480,
            background: "#a698f2",
            opacity: 0.28,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "68px 76px",
          }}
        >
          <svg width="228" height="86" viewBox="0 0 690.81 260.03" fill="#d1f383">
            <path d={WORDMARK_PATH} />
          </svg>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
            <div
              style={{
                display: "flex",
                fontSize: 72,
                fontWeight: 600,
                letterSpacing: -2.4,
                lineHeight: 1.02,
              }}
            >
              Tu próximo viaje
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 72,
                fontWeight: 600,
                letterSpacing: -2.4,
                lineHeight: 1.02,
                color: "#d1f383",
              }}
            >
              empieza con IRYA
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                maxWidth: 740,
                fontSize: 28,
                fontWeight: 500,
                lineHeight: 1.35,
                color: "#e6e4f1",
              }}
            >
              {hero.description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              alignItems: "center",
              borderRadius: 999,
              background: "#d1f383",
              color: "#251d44",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: -0.4,
              padding: "12px 22px",
            }}
          >
            {hero.badge}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: manropeMedium, weight: 500, style: "normal" },
        { name: "Manrope", data: manropeSemiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
