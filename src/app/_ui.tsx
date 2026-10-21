import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SITE_SHELL } from '@/components/site/styles';
import { OFFICE } from './_data';

/* ============================================================================
 * KADO の共通パーツ（ワードマーク・ヘッダー・事務所のフッター・ページの器）。
 *
 * ■ 器の入れ子
 *     <KadoShell>                       ← .sample-body.sample-kado（配色スコープ）
 *       <KadoHeader /> … <main> …       ← 事務所の画面
 *       <KadoFooter />                  ← 事務所のフッター（朱色の面）
 *     </KadoShell>
 *     <SiteFooter />                    ← Teciora の帯（スコープの**外**）
 *
 *   Teciora の帯をスコープの中に入れると、事務所のパレットを継承して
 *   「事務所のフッターが2つある」ように見える。必ず外に出すこと。
 *
 * ■ 引き算の版面
 *   角丸ゼロ（--field-radius: 0px）、装飾的な影ゼロ、罫は 1px の --line。
 *   色は紙色と黒に、目印の朱色だけ。ここに新しい色を足さない。
 *
 * ■ モバイルのメニューは <details>
 *   書き出しのモバイルは「Menu +」の1行。JS を足さずに開閉するので
 *   `<details>` にしてある（サーバーコンポーネントのままで動く）。
 *
 * ■ ここにも overflow / transform / filter を付けない（sticky が死ぬ）。
 * ==========================================================================*/

export function Wordmark({
  size = 'md',
  tone = 'ink',
}: {
  size?: 'sm' | 'md' | 'lg';
  tone?: 'ink' | 'cream';
}) {
  const px =
    size === 'lg' ? 'text-[34px]' : size === 'sm' ? 'text-[18px]' : 'text-[26px]';
  const color = tone === 'cream' ? 'text-[var(--cream)]' : 'text-[var(--ink)]';
  return (
    <span className={`kado-display block leading-[1] ${px} ${color}`} aria-hidden="true">
      {OFFICE.wordmark}
    </span>
  );
}

/**
 * ナビゲーション。トップの中のアンカーと、下層ページの2種類が混ざる。
 * どちらも `/` からの相対で書けるので、行き先の
 * 組み立ては1つで足りる（`#projects` は同じページ内でも別ページからでも効く）。
 */
const NAV: readonly { label: string; href: string }[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '/contact' },
];

/*
 * ナビの行き先を組む。値は3種類が混ざる:
 *   ''        … トップ            → '/'
 *   '#care'   … トップ内のアンカー  → '/#care'（下層から押されても効くように）
 *   '/items'  … 別ルート          → そのまま
 */
function navHref(path: string): string {
  if (path === '') return '/';
  return path.startsWith('#') ? `/${path}` : path;
}

/**
 * 事務所のヘッダー。
 * `variant="home"` … トップ。左は和文の名乗り、右端に朱色の角ボタン。
 * `variant="page"`  … 下層（問い合わせ）。左にワードマーク、右は大文字のナビ。
 */
export function KadoHeader({
  variant = 'home',
}: {
  variant?: 'home' | 'page';
}) {
  const home = variant === 'home';
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--cream)]">
      <div
        className={`${SITE_SHELL} flex min-h-[var(--site-header-h)] items-center justify-between gap-6 py-3`}
      >
        <div className="flex items-baseline gap-6">
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center"
          >
            {home ? (
              <span className="text-[14px] font-medium text-[var(--ink)]">
                {OFFICE.ja}
              </span>
            ) : (
              <Wordmark size="md" />
            )}
            <span className="sr-only">{OFFICE.ja} ホーム</span>
          </a>
          {!home && (
            <span className="hidden text-[13px] text-[var(--sub)] md:inline">
              {OFFICE.ja}
            </span>
          )}
        </div>

        {/* 広い画面：横並びのナビ */}
        <nav
          aria-label={`${OFFICE.ja} のメニュー`}
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV.map((n) => (
            <a
              key={n.label}
              href={navHref(n.href)}
              className={
                home
                  ? 'text-[13px] text-[var(--ink)] hover:text-[var(--accent-ink)]'
                  : 'kado-label text-[11px] uppercase text-[var(--ink)] hover:text-[var(--accent-ink)]'
              }
            >
              {n.label}
            </a>
          ))}
          {home && (
            <a
              href="/contact"
              className="inline-flex h-[44px] w-[44px] items-center justify-center bg-[var(--accent)] text-[18px] leading-none text-[var(--ink)]"
            >
              <span aria-hidden="true">&#8599;</span>
              <span className="sr-only">設計のご相談へ</span>
            </a>
          )}
        </nav>

        {/* 狭い画面：Menu +（JS を足さずに開く） */}
        <details className="relative lg:hidden">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-2 text-[14px] text-[var(--ink)] [&::-webkit-details-marker]:hidden">
            Menu
            <span aria-hidden="true">+</span>
          </summary>
          <div className="absolute right-0 top-full z-30 w-[240px] border border-[var(--line-strong)] bg-[var(--paper)]">
            <ul>
              {NAV.map((n) => (
                <li key={n.label} className="border-b border-[var(--line)] last:border-b-0">
                  <a
                    href={navHref(n.href)}
                    className="flex min-h-[48px] items-center px-4 text-[14px] text-[var(--ink)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </header>
  );
}

/** 事務所のフッター（朱色の面・文字は黒）。 */
export function KadoFooter() {
  return (
    <div className="bg-[var(--accent)] py-10 md:py-12">
      <div className={SITE_SHELL}>
        <div className="flex flex-col gap-6 border-t border-[var(--on-accent-line)] pt-8 md:flex-row md:items-start md:justify-between">
          <Wordmark size="lg" />
          <div className="text-[12px] leading-[1.9] text-[var(--on-accent-strong)]">
            <p>{OFFICE.ja}</p>
            <p>{OFFICE.place}</p>
          </div>
          <div className="text-[12px] leading-[1.9] text-[var(--on-accent-soft)]">
            <p>&copy; {OFFICE.en}</p>
            <p>KADO は架空の設計事務所です。</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 1ページぶんの器。
 * `main` の id は本体サイトと同じ `main`（スキップリンクの行き先）。
 */
export function KadoShell({
  children,
  variant = 'home',
}: {
  children: ReactNode;
  variant?: 'home' | 'page';
}) {
  return (
    <>
      <div className="sample-body sample-kado min-h-screen bg-[var(--cream)] text-[var(--ink)]">
        <KadoHeader variant={variant} />
        {children}
        <KadoFooter />
      </div>
      <SiteFooter />
    </>
  );
}

/** 節の頭に置く細いラベル（`01 / ABOUT`）。朱色は文字用の暗いほうを使う。 */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="kado-label text-[11px] uppercase text-[var(--accent-ink)]">
      {children}
    </p>
  );
}
