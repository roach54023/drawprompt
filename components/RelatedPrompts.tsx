"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  type AIPrompt,
  type CategoryInfo,
  categories,
  CATEGORY_META,
  hasDetailPage,
} from "@/lib/aiPromptData";
import PromptDetailModal from "@/components/PromptDetailModal";

export default function RelatedPrompts({
  prompts,
  categoryLabel,
}: {
  prompts: AIPrompt[];
  categoryLabel?: string;
}) {
  const [modalPrompt, setModalPrompt] = useState<AIPrompt | null>(null);

  if (prompts.length === 0) return null;

  return (
    <>
      <div>
        <h2
          className="font-serif"
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 16,
          }}
        >
          More {categoryLabel ?? "Prompts"}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 12,
          }}
        >
          {prompts.map((r) => {
            const rCat = CATEGORY_META[r.category];
            const detail = hasDetailPage(r);

            if (detail) {
              return (
                <Link
                  key={r.id}
                  href={`/prompts/${r.slug}`}
                  className="card"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    overflow: "hidden",
                    color: "inherit",
                  }}
                >
                  <Image
                    src={r.imageUrl}
                    alt={r.imageAlt}
                    width={400}
                    height={300}
                    sizes="200px"
                    style={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                  <div style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: rCat?.color ?? "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {rCat?.label}
                    </span>
                    <p
                      className="font-serif"
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        lineHeight: 1.3,
                        margin: "4px 0 0",
                      }}
                    >
                      {r.title}
                    </p>
                  </div>
                </Link>
              );
            }

            // No detail page — open modal on click
            return (
              <div
                key={r.id}
                className="card"
                style={{
                  display: "block",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => setModalPrompt(r)}
              >
                <Image
                  src={r.imageUrl}
                  alt={r.imageAlt}
                  width={400}
                  height={300}
                  sizes="200px"
                  style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                />
                <div style={{ padding: "12px 14px" }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: rCat?.color ?? "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {rCat?.label}
                  </span>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                      margin: "4px 0 0",
                    }}
                  >
                    {r.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modalPrompt && (
        <PromptDetailModal
          prompt={modalPrompt}
          catInfo={categories.find((c) => c.id === modalPrompt.category)}
          onClose={() => setModalPrompt(null)}
        />
      )}
    </>
  );
}
