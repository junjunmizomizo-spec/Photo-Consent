<p align="center">
  <img src="./assets/brand/logo-readme.png" alt="Photo Consent" width="640">
</p>

# Photo Consent

写真撮影について、一人ひとりの気持ちを大切に確認するためのWebアプリです。

## 特長
- iPhone向けの参加者画面
- 5段階の撮影希望
- イベントごとの回答管理
- 回答の検索・編集・削除
- CSV書き出し
- JSONバックアップ・復元
- PWA・オフライン対応
- GitHub Pages対応


## Sprint 2.0-1.1 — Logo Alignment Fix

- PWAアイコンを正方形専用データとして再作成
- 透明余白や切り抜き位置のずれを解消
- カメラ・ハート・葉のマークを完全中央配置
- `icon-192.png`
- `icon-512.png`
- `apple-touch-icon.png`
- `favicon.svg`
- `favicon.ico`


## Sprint 2.0-2 — CSS Refactoring

- Version 1.xから積み重なっていた重複CSSを整理
- ロゴ表示を `object-fit: contain` に統一
- アプリ内のロゴ参照先をルートの `icon-192.png` に統一
- 参加者画面・管理画面・トースト・ダイアログのスタイルを再整理
- PCとiPhoneで同じレイアウトになるよう調整
- 機能や保存データの仕様は変更なし

## Version 2.0 “Bloom”
Sprint 2.0-1では、正式ロゴ、PWAアイコン、Apple Touch Icon、favicon、ブランドカラー、タイポグラフィ、ボタン、カード、`DESIGN.md`を整備しました。

## 管理画面
画面右上の歯車を約2秒長押しします。初期パスコードは `1234` です。

## GitHub Pagesへの公開
ZIPを解凍し、中のファイルとフォルダをGitHubリポジトリのルートへアップロードします。

## ブランド資料
デザインルールは [`DESIGN.md`](./DESIGN.md) にまとめています。

## ロードマップ
- Version 1.0 — 基本機能
- Version 1.1 — イベント管理
- Version 1.2 — バックアップ・復元
- Version 1.3 — UI改善
- Version 1.4 — iPhone最適化
- Version 1.5 — 安定したモーション
- Version 2.0 “Bloom” — ブランド統一と公開品質

---

<p align="center"><em>Crafted with Harmony.</em></p>
