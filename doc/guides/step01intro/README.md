## Step.1 準備

* SDK ダウンロード
* Sencha Cmd ダウンロード／インストール

### プロジェクトの生成

    sencha -sdk ~/mylib/ExtJS/ext-5.0.0 generate app MyList .

### Ext Direct 準備

#### app.json 編集

js セクションに追加

    {
        "path": "http://ext5handson.xenophy.info/php/api.php",
        "remote": true
    }

### Application.js に追加

    requires: [
        'Ext.direct.*',
        'Ext.direct.RemotingProvider',
        'Ext.data.proxy.Direct',
        'Ext.tip.QuickTipManager'
    ],

と

    Ext.onReady(function() {
        Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
    });

### refresh

    sencha app refresh

リロード、確認 (コンソールに入力)

    MyList.rpc.MyList.getList({id:1}, function() {console.log(arguments)})

Ext Direct 準備完了

### Main ビューのレイアウト作成

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

* `border` レイアウト
* `region`
* `sprit`
* `card` レイアウト

### MainModel に data 設定

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


