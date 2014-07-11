# Step.3 Grid に一覧表示

Ext JS の花形コンポーネントである Grid を使って、名簿の一覧を表示します。
ビューの名前は List とします。
データは、Step.1 でセットアップした Ext Direct で取ってきます。

> Ext Direct は Ajax の仕組みを元に動いていますので、
> 通常ですと、他のサーバーからデータを取得することはできません。
> 今回のサーバーは XHR2 の機能を使ってクロスドメインでのアクセスを許可しています。

## Model を作成

**app/model/List.js**

    Ext.define('MyList.model.List', {
        extend: 'Ext.data.Model',

        fields: [
            {name: 'group', type: 'number'}
        ]

    });

* `fields` には全てのフィールドを設定する必要はありません
* サーバーから来るデータを全てセットされます
* 項目が増えたら、サーバー側を直せばすみます
* クライアント側で何か特別なことをする場合のみ `fields` に定義します
    * この場合は `group` フィールドの型を `number` にしています

## List ビューの ViewModel の作成

    Ext.define('MyList.view.list.ListModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.list',
        data: {
            name: '名簿一覧'
        },
        stores: {
            'liststore': {
                model: 'MyList.model.List',
                proxy: {
                    type: 'direct',
                    directFn: 'MyList.rpc.MyList.getGrid',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                },
                remoteSort: true,
                remoteFilter: true,
                autoLoad: true
            }
        }
    });

* `stores`
* `proxy`
* `remoteSort`
* `remoteFilter`

## List ビューを作成

**app/view/list/List.js**

    Ext.define('MyList.view.list.List',{

        extend:     'Ext.grid.Panel',

        xtype:      'mylist',

        viewModel:  'list',

        bind: '{liststore}',

        columns: [{
            dataIndex: 'id',
            bind: {
                text: '{label.id}'
            }
        }, {
            dataIndex: 'name',
            width: 200,
            bind: {
                text: '{label.name}'
            }
        }, {
            dataIndex: 'kana',
            width: 200,
            bind: {
                text: '{label.kana}'
            }
        }],

        bbar: [{
            xtype: 'pagingtoolbar',
            bind: {
                store: '{liststore}'
            }
        }]
    });

* `Ext.grid.Panel`
* `columns`
* `bbar`
* `pagingtoolbar`
* ViewModel の `stores` に定義した `liststore` とバインド

## Main ビューに配置

**app/view/main/Main.js**

    requires: [
        'MyList.view.edit.Edit',
        'MyList.view.list.List'
    ],

と

        items:[{
            xtype: 'mylist'
        },{
            xtype: 'myedit'
        }]

* List ビューを1枚目にセット、さきほどの Edit ビューは 2枚目に
* ソートやページングの動作を確認
* `remoteSort` について再確認
