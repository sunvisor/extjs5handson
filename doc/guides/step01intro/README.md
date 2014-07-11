# Step.1 準備

ハンズオンを始める前に、Sencha Ext JS 5 を使い始めるために必要なものを入手します。

## ツールの入手

### SDK ダウンロード

Sencha Ext JS 5 の本体です。
トライアル版を使う場合は、generate の時にネット上から取得するオプションもあるので、その方法を使う場合は DL の必要はありません。

### Sencha Cmd

Sencha Ext JS / Sencha Touch のプロジェクトのアプリケーションの生成 (スキャッフォルディング) から、アプリケーションのビルド (コンパイル) まで、アプリケーション開発のライフサイクル全体を管理する、統合開発ツールです。

* [Sencha Ext JS トライアルダウンロード](http://www.sencha.com/products/extjs#try)
* [Sencha Cmd ダウンロードページ](http://www.sencha.com/products/sencha-cmd/download)
* [Sencha Cmd の動作条件](http://docs.sencha.com/extjs/5.0.0/cmd/intro_to_cmd.html#System_Setup)

インストールは、インストーラーで。

* インストーラーでインストール実行
* インストールが完了したら、コマンドプロンプト／ターミナルを起動
  (すでに起動済みであれば、再起動)
* sencha と入力
* バージョンや usage が表示されれば OK

### ドキュメント

Sencha のフレームワークやツールはドキュメントが充実しています。

* ドキュメントのルート
    * <http://docs.sencha.com/>
* Ext JS 5 のドキュメント
    * <http://docs.sencha.com/extjs/5.0.0/>
* API ドキュメント
    * <http://docs.sencha.com/extjs/5.0.0/apidocs/>
* ガイドの日本語訳
    * <http://www.xenophy.com/product/sencha/sencha-Learning-place>

## プロジェクトの生成

プロジェクトの雛形をスキャッフォルディングするには、generate app コマンドを使います。

    sencha -sdk <SDKのパス> generate app <アプリ名> <生成場所>

こんな使い方です。
他の指定の仕方もありますので、ドキュメントをご覧ください。

    sencha -sdk ~/mylib/ExtJS/ext-5.0.0 generate app MyList .

出来上がったアプリケーションのディレクトリ構造を確認してください。

アプリケーションのルートディレクトリでコマンドを実行します。

    sencha app watch

いくつかのメッセージの後次の様に表示されます。

    [INF] ------------------------------------------------------------------
    [INF] Starting web server at : http://localhost:1841
    [INF] ------------------------------------------------------------------
    [INF] Updating CompileWatcher file system registrations...
    [INF] Waiting for changes...

表示されているアドレスにブラウザでアクセスします。


## Ext Direct 準備

このハンズオンでは、サーバー側環境を用意してあります。
Ext JS で使える、Ext Direct という仕組みを使ってサービスを提供していますので、まずそれが使えるように、アプリケーションをセットアップするところから始めます。

いくつかのファイルを編集します。

**app.json**

js セクションに次のものを追加します。

    {
        "path": "http://ext5handson.xenophy.info/php/api.php",
        "remote": true
    }

これはサービスのAPIを公開しているURLを示しています。

**app/Application.js**

先頭の方に `requires` を指定します。

    requires: [
        'Ext.direct.*',
        'Ext.direct.RemotingProvider',
        'Ext.data.proxy.Direct',
        'Ext.tip.QuickTipManager'
    ],

依存関係を指定する記述です。

クラス定義の後に、Ext Direct の初期化をする命令を書きます。

    Ext.onReady(function() {
        Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
    });

先ほどのターミナル上では、Sencha Cmd がファイルの変更を監視しています。
変更を検知すると、ビルド作業をしてくれます。

sencha app watch が動作していない環境での場合は、

    sencha app refresh

を実行します。
このコマンドで、必要なファイルを集めて、その情報を bootstrap.json に書き込んでくれます。

ブラウザをリロードします。

次のコマンドをデベロッパーツールのコンソールに入力してみます。

    MyList.rpc.MyList.getList({id:1}, function() {console.log(arguments)})

これで、エラー以外のなんらかの表示が得られれば、成功です。
Ext Direct 準備が完了しました。

## Main ビューのレイアウト作成

スキャッフォルディングで生成された Main ビューを変更します。

画面デザインはこのようなものを考えています。
(ひどい絵ですいません)

{@img memo.png}

**app/view/main/Main.js**

    Ext.define('MyList.view.main.Main', {
        extend: 'Ext.container.Container',

        xtype: 'app-main',

        controller: 'main',

        viewModel: 'main',

        layout: {
            type: 'border'
        },

        items: [{
            region: 'north',
            xtype: 'component',
            padding: 8,
            bind: {
                html: '{title}'
            }
        },{
            region: 'west',
            xtype: 'panel',
            html: 'west',
            width: 250,
            split: true
        },{
            region: 'center',
            xtype: 'container',
            layout: 'card',
            items:[{
                xtype: 'panel',
                html: 'list panel'
            },{
                xtype: 'panel',
                html: 'edit panel'
            }]
        }]
    });

* `Ext.define`
* `xtype` とコンポーネント
* `items` とコンテナー
* `border` レイアウト
    * `region` コンフィグ
    * `split` コンフィグ
* `card` レイアウト

参考資料
* [Sencha Learning Place レイアウトとコンテナー](http://www.xenophy.com/product/sencha/sencha-Learning-place/ext5guides/concepts_layouts_and_containers)

## MainModel に data 設定

**app/view/main/MainModel.js**

    data: {
        title: '名簿リスト',
        label: {
            id: 'ID',
            name: '氏名',
            kana: 'フリガナ',
            group: 'グループ'
        }
    }

* ViewModel
* `data` コンフィグ

参考資料
* [Ext JS 5 の MVC と MVVM について。さらに…](http://www.xenophy.com/sencha-blog/11110)
