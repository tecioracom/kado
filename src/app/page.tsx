import type { Metadata } from 'next';
import { SITE_SHELL } from '@/components/site/styles';
import { KadoShell, SectionLabel } from './_ui';
import {
  ABOUT_BODY,
  ABOUT_HEADING,
  CONTACT_LEAD,
  OFFICE,
  PROCESS,
  PROJECTS,
  projectCaption,
  projectIndexCaption,
  projectYearRange,
} from './_data';
import { SitePhoto } from '@/components/site/SitePhoto';

/* ============================================================================
 * KADO トップ `/`。
 * 書き出した 1440×4040 の1ページを、そのまま1ルートに実装したもの。
 *
 * ■ 引き算のほうが仕様
 *   角丸ゼロ・装飾的な影ゼロ・罫は髪の毛ほど。色は紙色と黒に朱色ひとつ。
 *   節の区切りは面の塗り分けではなく **1px の罫と余白** で作る。
 *
 * ■ 実績の年は台帳から導く
 *   「設計実績 / 2024—2025」は PROJECTS の年の幅。1件足したときに
 *   見出しの年だけが古いまま残らないようにしてある。
 * ==========================================================================*/

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'KADO 角建築設計室 — 東京の建築設計事務所',
    description:
      '東京を拠点に新築と改修を手がける設計事務所 KADO（角建築設計室）。これまでの設計と、ご相談から完成までの進め方。Teciora が制作したサンプルサイトで、KADO は架空の事務所です。',
    alternates: { canonical: '/' },
    robots: { index: false, follow: false },
  };
}

export default async function KadoTopPage() {

  const [hero, ...rest] = PROJECTS;

  return (
    <KadoShell variant="home">
      <main id="main">
        {/* §hero — 上端に KADO、その下に1件目を全幅で敷く */}
        <section className="pt-10 md:pt-16">
          <div className={SITE_SHELL}>
            {/*
              ワードマークの寸法は**器の幅**で決める（.kado-fit / .kado-fit-hero）。
              vw で測ると、文字スケールだけを上げた環境で器から溢れる。
              grid にしているのは、cqw の器が**中身に依らない幅**を持つ必要が
              あるため（flex の max-content 幅だと循環してしまう）。
            */}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end lg:gap-10">
              <div className="kado-fit min-w-0">
                <h1 className="kado-display kado-fit-hero leading-[0.82] text-[var(--ink)]">
                  {OFFICE.wordmark}
                </h1>
              </div>
              <div className="lg:pb-4">
                <p className="kado-label text-[18px] uppercase text-[var(--ink)]">
                  Architects
                </p>
                <p className="mt-3 max-w-[14em] text-[15px] leading-[1.9] text-[var(--ink)]">
                  {OFFICE.tagline}
                </p>
                <p className="kado-label mt-3 text-[10px] uppercase text-[var(--sub)]">
                  {OFFICE.place}
                </p>
              </div>
            </div>

            {/* このページで先読みする唯一の1枚（折りたたみの上の全幅）。 */}
            <SitePhoto
              src={hero.photo}
              width={1200}
              height={750}
              eager
              className={`${hero.tone} mt-8 aspect-[16/10] w-full md:mt-10`}
            />

            <div className="mt-5 flex flex-col gap-5 border-b border-[var(--line)] pb-12 md:flex-row md:items-start md:justify-between md:gap-10 md:pb-16">
              <p className="kado-label w-[180px] shrink-0 text-[10px] uppercase text-[var(--sub)]">
                {hero.no} / Selected project
              </p>
              <div className="min-w-0 flex-1">
                <h2 className="text-[19px] font-semibold text-[var(--ink)]">
                  {hero.name}
                </h2>
                <p className="kado-label mt-2 text-[10px] uppercase text-[var(--sub)]">
                  {projectCaption(hero)}
                </p>
              </div>
              <a
                href="/#projects"
                className="inline-flex min-h-[44px] shrink-0 items-center gap-6 text-[13px] text-[var(--ink)]"
              >
                プロジェクトを見る
                <span aria-hidden="true" className="text-[20px] leading-none">
                  &#8599;
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* §projects */}
        <section id="projects" className="py-16 md:py-24">
          <div className={SITE_SHELL}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="kado-display text-[40px] leading-[1.05] text-[var(--ink)] md:text-[64px]">
                Selected projects
              </h2>
              <p className="text-[12px] text-[var(--sub)]">
                これまでの設計 <span aria-hidden="true">/</span>{' '}
                <span className="tabular-nums">{projectYearRange()}</span>
              </p>
            </div>

            <ul role="list" className="mt-10 grid gap-12 md:grid-cols-2 md:gap-10">
              {rest.map((p, i) => (
                <li key={p.no} className={i === 1 ? 'md:mt-28' : undefined}>
                  <SitePhoto
                    src={p.photo}
                    width={1000}
                    height={750}
                    className={`${p.tone} aspect-[4/3] w-full`}
                  />
                  <h3 className="mt-5 text-[19px] font-semibold text-[var(--ink)]">
                    {p.name}
                  </h3>
                  <p className="kado-label mt-2 text-[10px] uppercase text-[var(--sub)]">
                    {projectIndexCaption(p)}
                  </p>
                  <p className="mt-3 max-w-[30em] text-[13px] leading-[1.9] text-[var(--ink)]">
                    {p.lead}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* §about */}
        <section id="about" className="border-t border-[var(--line)] py-16 md:py-24">
          <div className={`${SITE_SHELL} grid gap-10 md:grid-cols-[260px_minmax(0,1fr)] md:gap-16`}>
            <div>
              <SectionLabel>01 / About</SectionLabel>
              <p className="mt-4 text-[17px] font-semibold text-[var(--ink)]">
                {OFFICE.ja}
              </p>
              <p className="kado-label mt-2 text-[10px] uppercase text-[var(--sub)]">
                {OFFICE.en}
              </p>
            </div>
            <div>
              <h2 className="text-[28px] leading-[1.45] text-[var(--ink)] md:text-[38px]">
                {ABOUT_HEADING.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <div className="mt-8 space-y-6">
                {ABOUT_BODY.map((block) => (
                  <p
                    key={block[0]}
                    className="max-w-[34em] text-[14px] leading-[2] text-[var(--ink)]"
                  >
                    {block.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* §process */}
        <section className="pb-16 md:pb-24">
          <div className={`${SITE_SHELL} grid gap-10 md:grid-cols-[260px_minmax(0,1fr)] md:gap-16`}>
            <div>
              <SectionLabel>02 / Process</SectionLabel>
              <p className="mt-4 text-[17px] font-semibold text-[var(--ink)]">
                ご相談から完成まで
              </p>
            </div>
            <ol className="min-w-0">
              {PROCESS.map((s) => (
                <li
                  key={s.no}
                  className="grid gap-2 border-t border-[var(--line)] py-7 sm:grid-cols-[48px_minmax(0,200px)_minmax(0,1fr)] sm:gap-6"
                >
                  <span className="kado-label text-[11px] text-[var(--sub)]">
                    {s.no}
                  </span>
                  <h3 className="text-[17px] font-semibold text-[var(--ink)]">
                    {s.title}
                  </h3>
                  <p className="max-w-[34em] text-[13px] leading-[1.9] text-[var(--ink)]">
                    {s.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* §contact — 朱色の面。文字は黒（白より対比が高い） */}
        <section className="bg-[var(--accent)] py-16 md:py-20">
          <div className={SITE_SHELL}>
            <p className="kado-label text-[10px] uppercase text-[var(--on-accent-strong)]">
              03 / Contact
            </p>
            <div className="mt-6 flex items-start justify-between gap-6">
              <div className="kado-fit min-w-0 flex-1 basis-0">
                <p className="kado-display kado-fit-cta leading-[0.9] text-[var(--ink)]">
                  Talk to us.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="shrink-0 text-[40px] leading-[1] text-[var(--ink)] md:text-[64px]"
              >
                &#8599;
              </span>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-16">
              <h2 className="text-[24px] text-[var(--ink)] md:text-[30px]">
                設計のご相談
              </h2>
              <div>
                <p className="max-w-[34em] text-[13px] leading-[1.9] text-[var(--on-accent-strong)]">
                  {CONTACT_LEAD.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <a
                  href="/contact"
                  className="mt-6 inline-flex min-h-[56px] w-full items-center justify-between gap-10 bg-[var(--ink)] px-6 text-[14px] font-semibold text-[var(--cream)] transition duration-150 hover:bg-[var(--green-deep)] sm:w-auto sm:min-w-[320px]"
                >
                  お問い合わせ
                  <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </KadoShell>
  );
}
