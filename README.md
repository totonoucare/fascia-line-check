# つっぱりラインチェック for Clinic / MVP v0.1

治療院HPに埋め込める「予約前からだチェック」ツールの叩き台です。

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Vercel Hobbyでの開発想定

## 画面

- `/` サービス紹介ページ
- `/scan/demo` 院別チェックページ
- `/embed/demo` iframe埋め込み用ページ
- `/admin` 利用数確認サンプル
- `/privacy` 注意事項ページ

## セットアップ

```bash
npm install
cp .env.example .env.local
npm run dev
```

`http://localhost:3000/scan/demo` を開いてください。

Supabase環境変数が未設定でも、デモ表示とチェック体験は動きます。DB保存はmock扱いになります。

## Supabase設定

1. SupabaseのSQL Editorを開く
2. `supabase/schema.sql` をそのまま実行
3. Project Settings > API から以下を `.env.local` に設定

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

`SUPABASE_SERVICE_ROLE_KEY` はサーバー専用です。ブラウザに出さないでください。

## 埋め込みコード例

```html
<iframe
  src="https://your-domain.com/embed/demo"
  width="100%"
  height="820"
  style="border:0;border-radius:24px;"
></iframe>
```

## 課金対象の考え方

MVPでは `check_results` に1行作られたものを「結果生成1件」と扱います。
同一 `clinic_id + session_id + module_key` はuniqueなので、同じセッションでの再読み込みや再送信は重複カウントされにくい設計です。

料金計算は `src/lib/usage.ts` と Supabase SQL内の `calculate_fascia_billing_amount()` に入れています。

```txt
0件          0円
1〜30件      980円
31〜100件    1,980円
101〜300件   3,980円
301〜700件   6,980円
701〜1500件  9,980円
1501件〜      14,980円
```

## 注意

このチェックは医学的診断ではなく、体の使い方や負担の傾向を知るためのセルフチェックです。
公開前には利用規約・プライバシーポリシー・免責文言を必ず整えてください。
