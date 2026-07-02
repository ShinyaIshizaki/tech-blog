---
title: "プログラミング学習ロード～その５～"
slug: programming-learning005
date: 2021-07-06T17:22:12
categories: ["プログラミング"]
tags: ["CSS", "HTML", "プログラミング学習"]
---
こんにちは。しんやです。

[manablog](https://manablog.org/code-life-start/)ので出されたHTML、CSSコーディングについて、2つの課題のうち1つに取り組んだので、注意点をまとめます。

![](_attachments/computer_programming_man_17791694158555248.png)

https://twitter.com/Shinyaaah0311/status/1411814266877865985?s=20

と泣き言をいいながらも一通り進めました。

https://twitter.com/Shinyaaah0311/status/1411978529743331332?s=20

というのは本音ですね。

僕が今まで仕事やプライベートで開発したCOBOLやExcelVBAは1行間違えたとしてもコンパイルエラーになって、文法上のミスは修正できます。

しかし、HTMLやCSSはマークアップ言語なのでコンパイルしないため、実行されてしまい、ページを確認するとグチャグチャになってしまうということがよくあります。

それでは、見ていきます。

「[Airbnbでお家、アパート、お部屋をシェアしよう](https://ja.airbnb.com/host/homes)」のＬＰ1枚を模写します。

のっけからレイアウト微妙ですが、paddingやmarginの細かい値には一旦目をつむります。  
  

## 1.　背景色

最初から苦労しました。

<div>を重ねていくものだと思い、白い背景、黒い背景を交互に書いていきましたが、背景1枚をグラデーションしてあることに気づき、修正しました。

body全体のbackgroundにlinear-gradientで設定します。

*   black 20%, white 20%

とすることで、ページ上方から20%のところで黒白がはっきり分かれます。

```
body {
  background: linear-gradient( 
    black 0%, black 20%,
     white 20%, white 30%, 
     black 30%, black 60%,  
     white 60%, white 80%,  
     black 80%, black 90%, 
     white 90%, white 100%,
     white 100%);
}
```

##   
  

## 2.　ロゴとスタートボタン

```
    <header>
      <div class="hdr">
        <div class="logo">
          <img class="logoimg" src="img/airbnb_logo.png" alt="airbnbのロゴ">
        </div>
        <div class="sbtn">
          <a href="" class="starthosting">ホスティングをはじめる</a>
        </div>
      </div>
    </header>
```

```
.logoimg {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
}
```

position: absolute;  
left: 0;

で左詰めします。

```
.starthosting {
  width: 300px;
  height: 50px;
  background-color: rgb(240, 60, 90);
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 100vh;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
```

right: 0;

display: flex;　で右端に横並びで表示。

justify-content: canter;（※text-align: center;　としても無効です）

align-items: center;

でボタン内の文言を上下左右中央揃えにします。  
  
  

## 3.　display: flex;　で横並びを実現

```
    <div class="container">
      <div class="hosting">
        <h1>ホスティングこそ<br>まさにAirbnbが<br>Airbnbである理由</h1>
      </div>
      <div class="movie">
        動画
      </div>
    </div>
```

```
.container {
  display: flex;
  margin: 0;
}

.hosting {
  width: 100%;
  height: 300px;
  padding: 300px 50px;
  margin: 0;
}

.movie {
  width: 100%;
  height: 900px;
}
```

containerクラスにdisplay: flex;と指定した上で、hostingとmovieという2つのクラスを入れ子で持たせることでdivを横並びにできます。  
  
  

```
    <div class="container">
      <div class="item">
        <img src="img/hosting1.jpg">
        <div>お部屋をホスティングしたことで私の人生は変わり、思い出に残る経験や出会いに恵まれました。</div>
        <img class="reka" src="img/reka.png">
        <div>ミラノのホスト</div>
      </div>
      <div class="item">
        <img src="img/hosting2.jpg">
        <div>自宅にゲストを迎え、ホスティングすることで、起業家として経済的に自由な道を切り開くことができました。</div>
        <img class="darrel" src="img/darrel.png">
        <div>アトランタのホスト</div>
      </div>
      <div class="item">
        <img src="img/hosting3.jpg">
        <div>パスタ作り体験のホスティングを通じて、文化を生かし続けられています。</div>
        <img class="nerina" src="img/rerina.png">
        <div>パロンバーラ・サビーナのホスト</div>
      </div>
      <div class="item">
        <img src="img/hosting4.jpg">
        <div>Airbnbは、「自分の家でゲストをもてなす」という情熱を仕事に変える機会を与えてくれました。</div>
        <img class="clair" src="img/clair.png">
        <div>チェンマイのホスト</div>
      </div>
      <div class="item">
        <img src="img/hosting5.jpg">
        <div>ベドウィンのテントにゲストを受け入れることで、世界中の人たちに出会うことができました。</div>
        <img class="mohammed" src="img/mohammed.png">
        <div>ワディ・ラムのホスト</div>
      </div>
      <div class="item">
        <img src="img/hosting6.jpg">
        <div>ゲストが自然や大切な人とつながれるエコハウスをホスティングすることが大好きです。</div>
        <img class="marko" src="img/marko.png">
        <div>パラチのホスト</div>
      </div>
    </div>
```

```
.container {
  width: 100%;
  overflow: auto;
  display: flex;
  scroll-snap-type: x mandatory;
  margin: 0;
  color: white;
}

.item {
  margin: 50px;
  float: none;
  scroll-snap-align: start;
  font-size: 20px;
}
```

containerクラスにitemクラスを入れ子で持たせ、display: flexで横並びを実現します。

scroll-snap-type: x mandatory;　で横スクロールバーを表示させます。  
  
  

## 4.　HTMLでリストボックスを作成するのは面倒

```
    <div class="menu">
      <h2>お部屋のタイプは？</h2>
      <div class="room">
        <div class="room-title">まるまる貸切</div>
        <div class="sub-room">
          <ul>
            <li>まるまる貸切</li>
            <li>個室</li>
            <li>シェアルーム</li>
          </ul>
        </div>
      </div>
```

```
.room, .guest, .place {
  width: 500px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: auto;
}

.sub-room, .sub-guest, .sub-place {
  display: none;
}

.room:hover .sub-room {
  display: block;
}

.guest:hover .sub-guest {
  display: block;
}

.place:hover .sub-place {
  display: block;
}
```

display: none;　でデフォルト非表示にし、

:hover　でマウスポインタを乗せたときに　display: block;　で表示させるという2段階でコーディングします。  
  
  

## 5.　メニューはtableで実現

```
<div>
      <table class="link">
        <thead>
          <th>企業情報</th><th>コミュニティ</th><th>ホスト</th><th>サポート</th>
        </thead>
        <tr>
          <td>Airbnbのご利用方法</td><td>ダイバーシティ＆ビロンギング</td><td>宿泊をホストする</td><td>Airbnbの新型コロナウイルスに対する取り組み</td>
        </tr>
        <tr>
          <td>ニュースルーム</td><td>アクセシビリティ対応</td><td>オンライン体験をホストする</td><td>ヘルプセンター</td>
        </tr>
        <tr>
          <td>株主・投資家のみなさまへ</td><td>Airbnbアソシエイト</td><td>体験をホストする</td><td>キャンセルオプション</td>
        </tr>
        <tr>
          <td>Airbnb Plus</td><td>ゲストの紹介</td><td>責任あるホスティング</td><td>近隣コミュニティサポート</td>
        </tr>
        <tr>
          <td>Airbnb Luxe</td><td>Airbnb.org</td><td>リソースセンター</td><td>信頼＆安全</td>
        </tr>
        <tr>
          <td>HotelTonight</td><td></td><td>コミュニティセンター</td><td></td>
        </tr>
        <tr>
          <td>Airbnbビジネスプログラム</td><td></td><td></td><td></td>
        </tr>
        <tr>
          <td>ホストのおもてなしがもたらす、特別な旅</td><td></td><td></td><td></td>
        </tr>
        <tr>
          <td>採用情報</td><td></td><td></td><td></td>
        </tr>
        <tr>
          <td>共同創業者からの手紙</td><td></td><td></td><td></td>
        </tr>
      </table>
    </div>
    
```

ページ下部のメニューはtableを使うときれいです。

<tr>と<td>がごっちゃにならないよう注意。  
  
  

## 6.　右詰めは　margin: 0 0 0 auto;

```
   <footer>
      <div class="footer">
        <div class="info">
          <p>Airbnb Global Services Limited<br>観光庁長官(01)第S00001号(2018年6月15日-2023年6月14日)<br>©2021 Airbnb, Inc.・プライバシー・利用規約・サイトマップ・企業情報</p>
        </div>
        <div class="lang-money">
          <p><a>日本語(JP)　￥JPY</a></p>
        </div>
        <div class="sns">
          <p><a>F</a><a>T</a><a>I</a></p>
        </div>
      </div>
    </footer>
```

```
.footer {
  border-top: solid 1px black;
  display: flex;
}

.lang-money {
  margin: 0 0 0 auto;
}

.sns {
  margin: 0 0 0 auto;
}
```

display: flex;　したうえで、margin: 0 0 0 auto;　で右詰め。  
  

細部まで実現できていませんが、一先ずＬＰ1枚作成する課題に取り組んだのでこれでよしとし、今後勉強を重ねて知識を蓄えてから、いい感じに修正したいです。

JavaScriptやjQueryなども覚えてメニューの制御ができるようにもします。  

コピーできるところはぜひコピーしてください！！

ではまた。
