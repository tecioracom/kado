import type { Metadata } from 'next';
import { SITE_SHELL } from '@/components/site/styles';
import { KadoShell, SectionLabel } from '../_ui';
import { CONTACT_LEAD, INQUIRY_NOTE } from '../_data';
import { ContactForm } from './ContactForm';

/* ============================================================================
 * 設計のご相談 `/contact`。
 *
 * 書き出しでは「問い合わせ」1画面だが、実装では**1ルートの2つの状態**
 * （入力 → 入力内容の確認）にしてある。送信は起きないので、完了の画面を
 * 別ルートで持つと、直リンクで「送信しました」だけが開けてしまう。
 *
 * この事務所に管理画面は無い。相談をメールで受ける事務所に、ログインして
 * 開く画面はいらない。**無い理由があるものを、形だけ作らない。**
 * ==========================================================================*/

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '設計のご相談 — KADO 角建築設計室',
    description:
      'KADO（角建築設計室）への設計のご相談。入力は4つだけで、建設予定地・物件所在地は任意です。入力内容の確認までで、送信も保存もされません。',
    alternates: { canonical: '/contact' },
    robots: { index: false, follow: false },
  };
}

export default async function KadoContactPage() {

  return (
    <KadoShell variant="page">
      <main id="main">
        <section className="pt-12 md:pt-16">
          <div className={SITE_SHELL}>
            <SectionLabel>Contact</SectionLabel>
            <h1 className="mt-5 text-[38px] leading-[1.25] text-[var(--ink)] md:text-[54px]">
              設計のご相談
            </h1>
            <p className="mt-6 max-w-[34em] text-[14px] leading-[1.9] text-[var(--ink)]">
              {CONTACT_LEAD.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className="pb-20 pt-12 md:pb-28 md:pt-16">
          <div
            className={`${SITE_SHELL} grid gap-10 md:grid-cols-[300px_minmax(0,1fr)] md:gap-16`}
          >
            <div className="border-t border-[var(--ink)] pt-5">
              <SectionLabel>01 / Inquiry</SectionLabel>
              <h2 className="mt-4 text-[17px] font-semibold text-[var(--ink)]">
                ご相談にあたって
              </h2>
              <p className="mt-4 max-w-[22em] text-[13px] leading-[1.9] text-[var(--sub)]">
                {INQUIRY_NOTE.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <div className="min-w-0">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </KadoShell>
  );
}
