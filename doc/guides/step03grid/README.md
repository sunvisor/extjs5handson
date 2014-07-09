## Step.3 Grid に一覧表示

### Model を作成

**app/model/List.js**

    Ext.define('MyList.model.List', {
        extend: 'Ext.data.Model',

        fields: [
            {name: 'group', type: 'number'}
        ]

    });

* `fields` には全てのフィールドを設定する必要はない

### List ビューの ViewModel の作成

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

### List ビューを作成

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

* ViewModel の `stores` に定義した `liststore` とバインド

### Main ビューに配置

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

* List ビューを1枚目に
* refresh してリロード
* ソートやページングの動作を確認


