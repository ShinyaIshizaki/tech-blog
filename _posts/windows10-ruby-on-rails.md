---
title: "Windows10にRuby on Railsの環境を構築する"
slug: windows10-ruby-on-rails
date: 2022-04-15T10:24:37
categories: ["Windows", "プログラミング"]
---
こんにちは、しんやです。

今回はWindows10でRuby on Railsの環境を構築する手順についてお話します。

つまずいたポイントも解説するのでぜひご覧ください。

![](_attachments/computer_programming_man_17791694158487546.png)

1.  VS Codeをインストール
2.  Rubyの最新版をインストール
3.  【つまずき1】エラーも何も表示されない？！
4.  SQLite3の最新版をインストール
5.  Railsの最新版をインストール
6.  【つまずき2】Railsのウェルカムページが表示されない？！
7.  Rubyの最新版をアンインストール
8.  Rubyのバージョン2.6.5-1(x64)をインストール
9.  Railsの最新版をインストール
10.  Railsサーバー起動
11.  Railsのウェルカムページが表示される

1.  VS Codeをインストール  
    [こちら](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)からインストール
2.  Rubyの最新版をインストール  
    [Progate](https://prog-8.com/docs/ruby-env-win)を見て、Rubyの最新版をインストール
3.  【つまずき1】エラーも何も表示されない？！  
    index.rbを実行しても何も表示されません。  
    なぜなら、保存し忘れていたから。  
    いつもオートセーブを有効化していますが、Windows10を再インストールし、VS Codeも再インストールしたことでその設定がデフォルトの無効化になっていました💦
4.  SQLite3の最新版をインストール  
    [Progate](https://prog-8.com/docs/rails-env-win)を見ながらインストール。
5.  Railsの最新版をインストール  
    上記4のProgateを見て、コマンドプロンプトからインストール。
6.  【つまずき2】Railsのウェルカムページが表示されない？！  
    ググると、Railsのバージョンが高すぎることが理由のよう。  
    Ruby3.Xではいけないのか💦
7.  Rubyの最新版をアンインストール  
    エクスプローラーからフォルダごと削除。ワーニングが出ても削除を実行。
8.  Rubyのバージョン2.6.5-1(x64)をインストール  
    Progateのとおり、Rubyのバージョン2.6.5-1(x64)をインストール。
9.  Railsの最新版をインストール  
    コマンドプロンプトから「gem install rails -v "5.2.6"」を実行。
10.  Railsサーバー起動  
     コマンドプロンプトから「rails s」を実行。
11.  Railsのウェルカムページが表示される  
     ブラウザからlocalhost:3000にアクセスすると、Railsのウェルカムページが表示されました。  
     

いかがでしたでしょうか。

今回の記事を参考にRailsライフを存分にお過ごしください！

私はRuby on Railsでポートフォリオサイト制作に入ります！！

ではまた～
