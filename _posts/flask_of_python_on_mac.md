---
title: "MacでPythonのFlask環境を構築してHello, world!してみた"
slug: flask_of_python_on_mac
date: 2024-02-06T18:30:43
categories: ["Mac", "プログラミング"]
tags: ["Flask", "Python"]
---
しんやです。

今回はMacでFlask環境を構築してPythonアプリを開発する準備として、Hello, world!をブラウザ表示させる手順を共有します。

Python3がインストールされていることを確認します。

```
shinyaishizaki@ShinyaIakinoMBP ~ % python3 --version
Python 3.9.6
```

Flaskをインストールします。

```
mkdir myproject
cd myproject
python3 -m venv .venv
. .venv/bin/activate
. .venv/bin/activate
pip install Flask
```

hello.pyファイルを作成します。

```
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
  return "<p>Hello, world!</p>"
```

Flask環境でhello.pyを実行します。

```
(.venv) shinyaishizaki@ShinyaIakinoMBP python_app % flask --app hello run
 * Serving Flask app 'hello'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
```

ブラウザで「http://127.0.0.1:5000/」にアクセスし、  
Hello, world!  
と表示されることを確認できれば、成功しています。

ではまた。
