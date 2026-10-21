# KADO 角建築設計室

東京の建築設計事務所のウェブサイト。紙色と黒、目印の朱色ひとつで組んだ2ページ。

公開先: https://kado.sample.teciora.com

## 画面

| ルート | |
|---|---|
| `/` | KADO トップ |
| `/contact` | 設計のご相談 |

## 作りで決めたこと

### 引き算のほうが仕様

角丸ゼロ、装飾的な影ゼロ、罫は髪の毛ほど。節の区切りは面の塗り分けではなく
1px の罫と余白で作る。

### 実績の年は台帳から導く

見出しの「設計実績 / 2024—2025」は、載せている案件の年の幅から計算している。
1件足したときに見出しだけ古いまま残らない。

## 入力を扱う画面について

入力欄のある画面はあるが、`<form>` 要素を1つも置いていない。`action` の無い
form は、ハイドレートが終わる前に Enter を押すと現在の URL へ GET する。
氏名・電話・メールがクエリ文字列に乗り、履歴・リファラ・アクセスログに残る。
送信先を持たない画面にその穴を残す理由がないので、form ごと置いていない。

同じ理由で、`fetch` も Server Actions も `localStorage` も持たせていない。
ボタンの文字も実際に起きることに合わせてある（「送信する」ではなく
「入力内容を確認する」）。

`scripts/check.sh` がこれを機械で確かめる。15群あり、27通りの違反を注入して
全部赤くなることを確認してある。

```bash
bash scripts/check.sh
```

## 動かす

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # 本番と同じ静的書き出し
npm run typecheck
```

Next.js 15 の App Router。全2ルートを静的に書き出す。欧文の見出しに DM Sans を1書体だけ読む。和文は端末の書体に任せる。

main に push すると GitHub Actions が Vercel へ出す（`.github/workflows/deploy.yml`）。

## 素材

写真は AI 生成（Higgsfield 経由の `gpt_image_2`）。人体は写していない。
出所と条件は [docs/credits.md](docs/credits.md) に1ファイル1行で書いてある。
`public/samples/kado/` に6ファイル、AVIF と WebP の2系統で置いてある。

## 書いてあることについて

この事業者は架空。社名・人名・住所・電話番号・金額・在庫数はこの画面のために
用意したもので、実在の事業者とは関係ない。全ページ noindex にしてある。

---

制作: [Teciora](https://www.teciora.com/)
