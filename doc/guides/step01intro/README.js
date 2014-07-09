Ext.data.JsonP.step01intro({"guide":"<h2 id='step01intro-section-step.1-%E6%BA%96%E5%82%99'>Step.1 準備</h2>\n\n<ul>\n<li>SDK ダウンロード</li>\n<li>Sencha Cmd ダウンロード／インストール</li>\n</ul>\n\n\n<h3 id='step01intro-section-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E7%94%9F%E6%88%90'>プロジェクトの生成</h3>\n\n<pre><code>sencha -sdk ~/mylib/ExtJS/ext-5.0.0 generate app MyList .\n</code></pre>\n\n<h3 id='step01intro-section-ext-direct-%E6%BA%96%E5%82%99'>Ext Direct 準備</h3>\n\n<h4 id='step01intro-section-app.json-%E7%B7%A8%E9%9B%86'>app.json 編集</h4>\n\n<p>js セクションに追加</p>\n\n<pre><code>{\n    \"path\": \"http://ext5handson.xenophy.info/php/api.php\",\n    \"remote\": true\n}\n</code></pre>\n\n<h3 id='step01intro-section-application.js-%E3%81%AB%E8%BF%BD%E5%8A%A0'>Application.js に追加</h3>\n\n<pre><code>requires: [\n    'Ext.direct.*',\n    'Ext.direct.RemotingProvider',\n    'Ext.data.proxy.Direct',\n    'Ext.tip.QuickTipManager'\n],\n</code></pre>\n\n<p>と</p>\n\n<pre><code>Ext.onReady(function() {\n    Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);\n});\n</code></pre>\n\n<h3 id='step01intro-section-refresh'>refresh</h3>\n\n<pre><code>sencha app refresh\n</code></pre>\n\n<p>リロード、確認 (コンソールに入力)</p>\n\n<pre><code>MyList.rpc.MyList.getList({id:1}, function() {console.log(arguments)})\n</code></pre>\n\n<p>Ext Direct 準備完了</p>\n\n<h3 id='step01intro-section-main-%E3%83%93%E3%83%A5%E3%83%BC%E3%81%AE%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88%E4%BD%9C%E6%88%90'>Main ビューのレイアウト作成</h3>\n\n<p><strong>app/view/main/Main.js</strong></p>\n\n<pre><code>Ext.define('MyList.view.main.Main', {\n    extend: 'Ext.container.Container',\n\n    xtype: 'app-main',\n\n    controller: 'main',\n\n    viewModel: 'main',\n\n    layout: {\n        type: 'border'\n    },\n\n    items: [{\n        region: 'north',\n        xtype: 'component',\n        padding: 8,\n        bind: {\n            html: '{title}'\n        }\n    },{\n        region: 'west',\n        xtype: 'panel',\n        html: 'west',\n        width: 250,\n        split: true\n    },{\n        region: 'center',\n        xtype: 'container',\n        layout: 'card',\n        items:[{\n            xtype: 'panel',\n            html: 'list panel'\n        },{\n            xtype: 'panel',\n            html: 'edit panel'\n        }]\n    }]\n});\n</code></pre>\n\n<ul>\n<li><code>border</code> レイアウト</li>\n<li><code>region</code></li>\n<li><code>sprit</code></li>\n<li><code>card</code> レイアウト</li>\n</ul>\n\n\n<h3 id='step01intro-section-mainmodel-%E3%81%AB-data-%E8%A8%AD%E5%AE%9A'>MainModel に data 設定</h3>\n\n<p><strong>app/view/main/MainModel.js</strong></p>\n\n<pre><code>data: {\n    title: '名簿リスト',\n    label: {\n        id: 'ID',\n        name: '氏名',\n        kana: 'フリガナ',\n        group: 'グループ'\n    }\n}\n</code></pre>\n","title":"Step.1 準備"});