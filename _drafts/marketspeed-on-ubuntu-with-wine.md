---
title: "Ubuntu 26.04.1 LTSとWine 11.0で楽天証券 MarketSpeed IIを起動してみた"
layout: post
slug: marketspeed-on-ubuntu-with-wine
date: 2026-10-19T00:00:00
last_modified_at: 2026-10-24
categories: ["Linux", "Ubuntu"]
tags: ["楽天証券", "MarketSpeed", "Wine"]
---
しんやです。

今回は、Ubuntu 26.04.1 LTS上のWine 11.0で、楽天証券のMarketSpeed IIを起動できるか試しました。インストーラーが停止した際の状況と、起動を試した結果を記録します。

Windows向けのアプリをLinuxで動かす互換レイヤー「Wine」を使い、参考記事を手がかりにMarketSpeed IIのインストールと起動を試しました。

## 目次

- [検証の概要](#overview)
- [Wine導入前の確認](#wine-check)
- [パッケージ情報の更新](#apt-update)
- [WineHQ署名鍵の登録](#wine-key)
- [WineHQリポジトリの追加とWineのインストール](#wine-install)
- [Wineの初期設定と日本語フォント](#wine-fonts)
- [MarketSpeed IIのインストール](#marketspeed-install)
- [MarketSpeed IIの起動確認](#marketspeed-launch)
- [まとめ](#summary)

## 検証の概要 {#overview}

### 参考にした記事

[楽天証券 MarketSpeedをWineで動かす](https://zenn.dev/buttyo_kuny/articles/fb83999b86b689)

参考記事では、Ubuntu 22.04 LTSとWine 9.0を使い、事前にWinetricksから`cjkfonts`をインストールしています。MarketSpeedのインストーラーは終盤で応答しなくなったものの、インストール自体は完了していたようで、実行ファイルを直接起動できたとのことです。

この記事では、参考記事をもとにMarketSpeed IIで試した結果を紹介します。

### 今回の環境

- OS: Ubuntu 26.04.1 LTS（x86_64）
- コードネーム: resolute
- Wine: 11.0
- Winetricks: 未導入（今回の検証では未使用）
- MarketSpeed II: 楽天証券公式サイトのインストーラーで検証

参考記事のUbuntu 22.04とはバージョンが異なるため、今回使用したOSとWineのバージョンを記録しました。

## Wine導入前の確認 {#wine-check}

作業を始める前に、WineとWinetricksのバージョンを確認しました。この時点では、どちらもインストールされていませんでした。

```sh
wine --version
winetricks --version
```

Wineの導入後に確認したバージョンは、後述のとおりWine 11.0です。

## パッケージ情報の更新 {#apt-update}

Wineを入れる前に、Ubuntuのパッケージ情報を更新しました。

```sh
sudo apt update
sudo apt upgrade
```

`apt update`は正常に完了しました。`apt upgrade`では、次の2パッケージが段階的な配信中のため保留され、今回アップグレードされたパッケージはありませんでした。

```text
python3-software-properties
software-properties-common
```

保留されたのは段階的な更新（phased updates）によるもので、Wineのインストールエラーではありません。

続けてWine関連パッケージがすでに入っているか確認しました。

```sh
dpkg -l | grep wine
```

該当する出力はなく、この確認時点ではWine関連パッケージはまだインストールされていませんでした。

## WineHQ署名鍵の登録 {#wine-key}

WineHQのパッケージを利用する準備として、鍵の保存先を作成し、WineHQの署名鍵をダウンロードしてAPT用の鍵形式に変換しました。

```sh
sudo mkdir -pm755 /etc/apt/keyrings
wget -O - https://dl.winehq.org/wine-builds/winehq.key | sudo gpg --dearmor -o /etc/apt/keyrings/winehq-archive.key -
```

鍵ファイルは`/etc/apt/keyrings/winehq-archive.key`に保存されました。ダウンロード時の応答は`200 OK`で、鍵データの取得は完了しました。

## WineHQリポジトリの追加とWineのインストール {#wine-install}

Ubuntu 26.04のコードネーム`resolute`向けのWineHQソースファイルをAPTの設定ディレクトリにダウンロードしました。

```sh
sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/ubuntu/dists/resolute/winehq-resolute.sources
```

ダウンロード結果は`200 OK`で、`/etc/apt/sources.list.d/winehq-resolute.sources`に保存されました。

WineHQリポジトリを追加した後、パッケージ情報を更新しました。

```sh
sudo apt update
```

WineHQの`resolute`リポジトリから`InRelease`と`main amd64 Packages`を取得できました。更新可能なパッケージが38個あると表示されましたが、Wineのインストール時点でそれらのアップグレードは行われていません。

WineHQの安定版を、推奨パッケージも含めてインストールしました。

```sh
sudo apt install --install-recommends winehq-stable
```

インストール確認に`Y`と入力して続行しました。APTの表示では31個のパッケージが新規インストール対象で、ダウンロードサイズは266 MB、必要なディスク容量は約1.6 GBでした。

インストール後にバージョンを確認すると、Wine 11.0でした。

Wineのバージョンを確認すると、Wine 11.0でした。Winetricksは今回導入していません。

```sh
wine --version
```

```text
wine-11.0
```

これでWine本体の導入が完了しました。続いて初回設定と日本語フォントの準備を行いました。

## Wineの初期設定と日本語フォント {#wine-fonts}

Wineの初期設定を行うため、`winecfg`を起動しました。設定画面が表示されたので、画面上で設定を進めました。

```sh
winecfg
```

続いてメモ帳を起動した初回に、端末に次の警告が表示されました。

```text
Could not parse file "/home/shinyaishizaki/.local/share/applications/org.gnome.Terminal.desktop": Key file does not start with a group
```

初回はこの警告が表示されましたが、メモ帳アプリは起動しました。その後、`wine notepad`を再実行したところ警告は表示されず、メモ帳アプリが起動しました。警告は再現せず、WineからGUIアプリを実行できることを確認できました。

```sh
wine notepad
```

参考記事と同じ方法を試す場合は、Winetricksをインストールしてから`cjkfonts`を実行します。今回はこの方法を実行せず、UbuntuのTakao PゴシックをWineの仮想Cドライブへ手動でコピーしました。

```sh
sudo apt install winetricks
winetricks cjkfonts
```

以下は今回実際に行った手順です。Takao Pゴシックのパッケージをインストールし、フォント一覧に表示されることを確認しました。

```sh
sudo apt install fonts-takao-pgothic
fc-list | grep -i takao
```

`fc-list`では、Takao Pゴシックのフォントファイルが確認できました。

```text
/usr/share/fonts/truetype/fonts-japanese-gothic.ttf: Takao Pゴシック,TakaoPGothic:style=Regular
/usr/share/fonts/truetype/takao-gothic/TakaoPGothic.ttf: Takao Pゴシック,TakaoPGothic:style=Regular
```

WineのFontsディレクトリを作成し、Takao Pゴシックのフォントファイルをコピーしました。

```sh
mkdir -p ~/.wine/drive_c/windows/Fonts/
cp /usr/share/fonts/truetype/takao-gothic/*.ttf ~/.wine/drive_c/windows/Fonts/
ls -la ~/.wine/drive_c/windows/Fonts/
```

一覧には`TakaoPGothic.ttf`があり、WineのFontsディレクトリへのコピーを確認できました。

## MarketSpeed IIのインストール {#marketspeed-install}

今回は初代ではなく、楽天証券公式サイトからMarketSpeed IIのインストーラーをダウンロードして実行しました。公式サイトに掲載されていたファイル名は`MarketSpeed2Installkits_0001.exe`です。

```sh
wine "$HOME/Downloads/MarketSpeed2Installkits_0001.exe"
```

インストールの終盤で処理が止まり、参考記事と同様にコンソールへ`err:ntdll:RtlpWaitForCriticalSection`が大量に表示され、インストールが進まなくなりました。参考記事は初代MarketSpeedについての報告であり、MarketSpeed IIでも同様にインストールが完了しているとは限らないため、実行ファイルの有無を確認することにしました。

### 今回の結果

- インストーラーの表示・動作: 終盤で進行しなくなった
- 端末に表示されたメッセージ: `err:ntdll:RtlpWaitForCriticalSection`が大量に出力された
- インストール完了と判断できたか: インストーラー上では確認できず。Wine prefix内には本体の実行ファイルが配置されていた
- 追加で行った操作: 初代MarketSpeedの実行パスを指定して起動を試した

インストールが途中で停止し、続く起動確認でもエラーになったため、MarketSpeed II上で日本語が正しく表示されるかは確認できていません。

## MarketSpeed IIの起動確認 {#marketspeed-launch}

インストール後、参考記事に記載された初代MarketSpeedの実行パスを使って起動を試しました。

```sh
wine "$HOME/.wine/drive_c/Program Files (x86)/MarketSpeed/MarketSpeed/MarketSpeed.exe"
```

しかし、Wineから次のエラーが返り、指定した実行ファイルを開けませんでした。

```text
wine: failed to open "/home/shinyaishizaki/.wine/drive_c/Program Files (x86)/MarketSpeed/MarketSpeed/MarketSpeed.exe"
```

このパスは初代MarketSpeedのものです。MarketSpeed IIの実行ファイル名やインストール先が異なる可能性があるため、このエラーだけではMarketSpeed II自体の起動失敗やインストール失敗とは判断できません。まずWine prefix内で実際の実行ファイルを探します。

```sh
find "$HOME/.wine/drive_c" -type f -iname '*.exe' | grep -i marketspeed
```

検索の結果、Windows Installerのキャッシュ内にあるファイルのほか、ユーザー領域にMarketSpeed II本体の実行ファイルが見つかりました。

```text
/home/shinyaishizaki/.wine/drive_c/windows/Installer/{73E41A6B-923A-4908-A183-1A1115317FD9}/MarketSpeed2.exe1_1D72DD0286BB46138868A0F24DFB1074.exe
/home/shinyaishizaki/.wine/drive_c/windows/Installer/{73E41A6B-923A-4908-A183-1A1115317FD9}/MarketSpeed2.exe_1E63B5ED374644D5B30EDB4788EFB116.exe
/home/shinyaishizaki/.wine/drive_c/users/shinyaishizaki/AppData/Local/MarketSpeed2/Bin/MarketSpeed2.exe
```

Windows Installerのキャッシュではなく、ユーザー領域にある本体を指定して起動を試します。

```sh
wine "$HOME/.wine/drive_c/users/shinyaishizaki/AppData/Local/MarketSpeed2/Bin/MarketSpeed2.exe"
```

実行ファイルは呼び出されましたが、コンソールにC++ランタイム関連の`fixme`ログに続いて`_invalid_parameter`エラーが出ました。ユーザーからは「無効なパラメーター」というエラーが表示されたとのことで、MarketSpeed IIの起動には至りませんでした。

```text
0124:fixme:msvcp:locale__Locimp__Makexloc (0022FB08 63 00B70428 00000000) semi-stub
0124:fixme:msvcp:locale__Locimp__Makewloc (0022FB08 63 00B70428 00000000) semi-stub
0124:fixme:msvcp:locale__Locimp__Makeushloc (0022FB08 63 00B70428 00000000) semi-stub
0124:fixme:msvcp:locale__Locimp__Makexloc (0022F848 63 00B70458 00000000) semi-stub
0124:fixme:msvcp:locale__Locimp__Makewloc (0022F848 63 00B70458 00000000) semi-stub
0124:fixme:msvcp:locale__Locimp__Makeushloc (0022F848 63 00B70458 00000000) semi-stub
0124:err:msvcrt:_invalid_parameter (null):0 (null): (null) 0
```

`fixme`はWineが未実装または未完全な処理を報告する診断ログで、これだけで直接の原因とは断定できません。今回、起動時に確認できたエラーは`err:msvcrt:_invalid_parameter`です。原因や回避方法はまだ特定できていません。

### 今回の起動結果

- 初代MarketSpeed用のパスで起動: 実行ファイルを開けず
- MarketSpeed IIの実行ファイルがWine prefix内に存在するか: `AppData/Local/MarketSpeed2/Bin/MarketSpeed2.exe`を確認
- 正しいパスでの起動結果: `_invalid_parameter`エラーとなり、起動できず
- ログイン画面まで進めたか: 起動エラーとなったため、到達できず
- ログイン後に必要な機能を確認できたか: ログイン画面に進めず、未確認
- 発生したエラー: `err:msvcrt:_invalid_parameter (null):0 (null): (null) 0`

## まとめ {#summary}

Ubuntu 26.04.1 LTSとWine 11.0の環境でMarketSpeed IIを試したところ、インストーラーは終盤で停止しました。Wine prefix内にMarketSpeed IIの実行ファイルは見つかりましたが、起動すると`err:msvcrt:_invalid_parameter`が発生し、アプリを起動できませんでした。

以上から、今回のUbuntu 26.04.1 LTS／Wine 11.0の構成と手順では、MarketSpeed IIを利用できませんでした。ただし、Wineの設定変更などを含む網羅的な検証はしていないため、Wine全般で動作しないとまでは結論づけられません。楽天証券の公式案内ではMarketSpeed IIの対応OSはWindowsのみです。

ログイン画面や各機能の動作確認にも至っていません。Wineでの動作は公式サポート対象外のため、今回の検証環境を実際の取引に利用するのは避けてください。
