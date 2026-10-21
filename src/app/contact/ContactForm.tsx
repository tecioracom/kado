'use client';

import { useId, useRef, useState, type ReactNode } from 'react';
import {
  ErrorSummary,
  TextAreaField,
  TextField,
} from '@/components/site/fields';
import { StepBar } from '@/components/site/StepBar';
import { BTN_PRIMARY, BTN_SECONDARY } from '@/components/site/styles';
import {
  email as vEmail,
  listErrors,
  maxLength,
  required,
  trim,
  type FieldError,
} from '@/components/site/validate';
import { CONTACT_FIELDS, PRIVACY_NOTE } from '../_data';

/* ============================================================================
 * 設計のご相談（問い合わせ）。**この画面の終点は「確認」**。
 *
 * ■ 送らない・保存しない
 *   書き出しのボタンは「送信する」だが、実装では「入力内容を確認する」に
 *   している。押すと入力チェックが走り、通れば同じルートのまま確認表示に
 *   切り替わる。送っていないのに「送信しました」と出すと、その場で嘘になる。
 *   押せないボタンを置いて「押せません」と書く形も採らない。
 *   **押せて、押した結果がちゃんと出る**ほうが、何ができるかが伝わる。
 *
 * ■ `<form>` を使わない
 *   `<form>` はハイドレート前に Enter を押されると、現在の URL へ GET する。
 *   氏名・メールが**そのままクエリ文字列に載る**。URL は履歴にもリファラにも
 *   ログにも残るので、起こせない形にしておく。
 *   `div role="group"` + `type="button"` だけで組む。
 *
 * ■ 入力欄は4つだけ。**建設予定地・物件所在地は任意**
 *   場所が決まる前の相談を、入力必須で止めないため。必須の印（*）も
 *   その3つにしか付けない。
 * ==========================================================================*/

const FIELD_ORDER = ['name', 'email', 'body'] as const;

const FIELD_LABELS: Record<string, string> = {
  name: CONTACT_FIELDS.name.label,
  email: CONTACT_FIELDS.email.label,
  body: CONTACT_FIELDS.body.label,
};

export function ContactForm() {
  const uid = useId().replace(/:/g, '');
  const id = (k: string) => `${uid}-${k}`;
  const summaryRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [site, setSite] = useState('');
  const [body, setBody] = useState('');

  /** 入力チェックの結果を出すのは、いちど確認を押してから。 */
  const [checked, setChecked] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const errors: Record<string, FieldError> = {
    name: required(name, CONTACT_FIELDS.name.label),
    email: vEmail(email, CONTACT_FIELDS.email.label),
    body:
      required(body, CONTACT_FIELDS.body.label) ??
      maxLength(body, CONTACT_FIELDS.body.label, 1000),
  };

  const items = checked ? listErrors(FIELD_ORDER, errors, FIELD_LABELS) : [];
  const err = (k: string) => (checked ? (errors[k] ?? null) : null);

  function onConfirm() {
    setChecked(true);
    if (FIELD_ORDER.some((k) => errors[k])) {
      setConfirmed(false);
      // まとめへ焦点を移す。どの欄が引っかかったかを最初に読ませる。
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setConfirmed(true);
    window.requestAnimationFrame(() => {
      document.getElementById(id('confirm-head'))?.focus();
    });
  }

  /* ---------------------------------------------------------------- 確認 */
  if (confirmed) {
    return (
      <div>
        <StepBar
          steps={['ご相談内容の入力', '入力内容の確認']}
          current={2}
          className="mb-8"
        />
        <h2
          id={id('confirm-head')}
          tabIndex={-1}
          className="text-[24px] text-[var(--ink)] md:text-[28px]"
        >
          入力内容の確認
        </h2>

        <div className="mt-5 border border-[var(--ink)] bg-[var(--paper)] px-5 py-4">
          <p className="text-[14px] font-bold leading-[1.8] text-[var(--ink)]">
            ここまでが確認です。お問い合わせはまだ送られていません。
          </p>
          <p className="mt-2 text-[13px] leading-[1.9] text-[var(--sub)]">
            入力した内容は送信も保存もされません。ブラウザを閉じれば残りません。
          </p>
        </div>

        <dl className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          <Row label={CONTACT_FIELDS.name.label}>{trim(name)}</Row>
          <Row label={CONTACT_FIELDS.email.label}>{trim(email)}</Row>
          <Row label="建設予定地・物件所在地">
            {trim(site) === '' ? '未記入（任意）' : trim(site)}
          </Row>
          <Row label={CONTACT_FIELDS.body.label}>
            <span className="whitespace-pre-wrap">{trim(body)}</span>
          </Row>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setConfirmed(false)}
            className={BTN_SECONDARY}
          >
            入力内容を修正する
            <span aria-hidden="true">&#8598;</span>
          </button>
          <a href="/" className={BTN_SECONDARY}>
            KADO トップへ戻る
            <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- 入力 */
  return (
    <div role="group" aria-label="設計のご相談の入力">
      <StepBar
        steps={['ご相談内容の入力', '入力内容の確認']}
        current={1}
        className="mb-8"
      />

      {items.length > 0 && (
        <div ref={summaryRef} className="mb-8">
          <ErrorSummary
            id={id('summary')}
            title={`入力を確認してください（${items.length}件）`}
            items={items}
            fieldId={(k) => id(k)}
          />
        </div>
      )}

      <p className="text-[12px] text-[var(--sub)]">
        <span aria-hidden="true">*</span> は必須項目です
      </p>

      <div className="mt-5 space-y-6">
        <TextField
          id={id('name')}
          label={CONTACT_FIELDS.name.label}
          value={name}
          onChange={setName}
          placeholder={CONTACT_FIELDS.name.placeholder}
          autoComplete="name"
          requiredMark
          error={err('name')}
        />
        <TextField
          id={id('email')}
          label={CONTACT_FIELDS.email.label}
          type="email"
          inputMode="email"
          value={email}
          onChange={setEmail}
          placeholder={CONTACT_FIELDS.email.placeholder}
          autoComplete="email"
          requiredMark
          error={err('email')}
        />
        <TextField
          id={id('site')}
          label={CONTACT_FIELDS.site.label}
          value={site}
          onChange={setSite}
          placeholder={CONTACT_FIELDS.site.placeholder}
          hint="場所が決まっていない場合は空のままで構いません。"
        />
        <TextAreaField
          id={id('body')}
          label={CONTACT_FIELDS.body.label}
          value={body}
          onChange={setBody}
          placeholder={CONTACT_FIELDS.body.placeholder}
          rows={6}
          requiredMark
          error={err('body')}
        />
      </div>

      <p className="mt-6 text-[12px] leading-[1.9] text-[var(--sub)]">
        {PRIVACY_NOTE}
      </p>

      <button
        type="button"
        onClick={onConfirm}
        className={`${BTN_PRIMARY} mt-5 sm:w-full`}
      >
        入力内容を確認する
        <span aria-hidden="true">&#8599;</span>
      </button>
      <p className="mt-3 text-[12px] leading-[1.8] text-[var(--sub)]">
        押すと入力内容の確認に進みます。この画面から送信は行いません。
      </p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
      <dt className="text-[13px] font-semibold text-[var(--sub)]">{label}</dt>
      <dd className="text-[14px] leading-[1.9] text-[var(--ink)]">{children}</dd>
    </div>
  );
}
