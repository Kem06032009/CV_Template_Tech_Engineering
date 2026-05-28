"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CVRenderer } from "@/components/cv/cv-renderer";
import { ExportActions } from "@/components/cv/export-actions";
import { LayoutSwitcher } from "@/components/cv/layout-switcher";
import { LocaleToggle } from "@/components/cv/locale-toggle";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { TechBackground } from "@/components/ui/tech-background";
import { appConfig } from "@/config";
import type { CVLocale } from "@/i18n/section-labels";
import type { LayoutType, Resume } from "@/lib/schema/resume";

const translateErrorVi = "Không thể dịch. Vui lòng thử lại.";

/** Trang xem CV — zoom x2 màn hình; bản in riêng scale 1:1 */
export function CvPageView({ resume }: { resume: Resume }) {
  const scale = appConfig.browserDisplayScale;
  const { features } = appConfig;
  const [layout, setLayout] = useState<LayoutType>(resume.meta.layout);
  const [locale, setLocale] = useState<CVLocale>("vi");
  const [enResume, setEnResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayResume = useMemo(() => {
    const base = locale === "vi" ? resume : (enResume ?? resume);
    return {
      ...base,
      meta: { ...base.meta, layout, locale },
    };
  }, [resume, locale, enResume, layout]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const fetchTranslation = useCallback(async () => {
    if (!features.translationApi || enResume) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Translate failed");
      setEnResume(json.data as Resume);
    } catch {
      setError(translateErrorVi);
      setLocale("vi");
    } finally {
      setLoading(false);
    }
  }, [enResume, resume, features.translationApi]);

  const handleToggleLocale = () => {
    if (locale === "vi") {
      setLocale("en");
      if (!enResume && !loading) void fetchTranslation();
    } else {
      setLocale("vi");
    }
  };

  const showLoading = loading && locale === "en" && !enResume;

  return (
    <div
      className="relative min-h-screen cv-app-root"
      style={{ "--cv-display-scale": String(scale) } as React.CSSProperties}
    >
      {features.techBackground && <TechBackground />}

      <header className="no-print sticky top-0 z-50 border-b border-cv/60 backdrop-blur-xl bg-[var(--header-bg)]">
        <div className="tech-header-bar w-full absolute bottom-0 left-0" />
        <div className="max-w-[100vw] mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-3">
          <motion.div
            className="flex items-center gap-3 min-w-0"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-electric-500/30 bg-electric-500/10 font-mono text-xs text-cv-accent">
              &lt;/&gt;
            </div>
            <span className="font-semibold text-sm tracking-tight gradient-text-tech truncate">
              {displayResume.personal.fullName}
            </span>
          </motion.div>
          <div className="flex items-center gap-2 shrink-0">
            {features.localeToggle && features.translationApi && (
              <LocaleToggle
                locale={locale}
                loading={loading}
                error={error}
                onToggle={handleToggleLocale}
              />
            )}
            {features.layoutSwitcher && (
              <LayoutSwitcher value={layout} onChange={setLayout} />
            )}
            <ExportActions resume={displayResume} />
            {features.themeToggle && <ThemeToggle />}
          </div>
        </div>
      </header>

      <main className="cv-screen-only cv-screen-main w-full overflow-x-auto px-4 md:px-6 py-8 md:py-10">
        {showLoading ? (
          <div
            className="cv-scale-outer mx-auto flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-cv bg-[var(--cv-paper-bg)]"
            aria-busy="true"
            aria-live="polite"
          >
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-electric-500 border-t-transparent" />
            <p className="mt-4 text-sm text-cv-muted">Đang dịch sang tiếng Anh…</p>
          </div>
        ) : (
          <motion.div
            className="cv-scale-outer mx-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            key={locale}
          >
            <div className="cv-scale-viewport">
              <CVRenderer resume={displayResume} animate id="cv-preview" />
            </div>
          </motion.div>
        )}
      </main>

      {!showLoading && (
        <div className="cv-print-only" aria-hidden>
          <CVRenderer resume={displayResume} animate={false} id="cv-print" />
        </div>
      )}
    </div>
  );
}
