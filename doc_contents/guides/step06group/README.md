## Step.6 グループ

実はこの名簿はグループ分けされています。

* 編集画面でグループを設定できるようにします。
* 画面左側にグループ一覧を表示し、グループ毎に表示できるようにします。

{@img memo.png}

### store の定義

* まずグループの Store を定義します。
* 今回は `data` プロパティで設定します。
* このようにクライアントサイドで固定でデータを持つこともできます。
* この Store は、Edit ビューと、後で作る Group ビュー 両方で使いますので、Main ビューで定義します。

**app/view/main/MainModel.js**

    stores: {
        'groups': {
            fields:[
                'id',
                'groupName'
            ],

            data: [
                { 'id': 1, 'groupName': '家族' },
                { 'id': 2, 'groupName': '親類' },
                { 'id': 3, 'groupName': '友人' },
                { 'id': 4, 'groupName': '知人' },
                { 'id': 5, 'groupName': '同僚' },
                { 'id': 6, 'groupName': '取引先' },
                { 'id': 7, 'groupName': '勉強会' },
                { 'id': 8, 'groupName': '同窓会' },
                { 'id': 9, 'groupName': 'ネット' },
                { 'id': 10, 'groupName': 'その他' }
            ]
        }
    }

### コンボボックスの利用

* コンボボックスでグループを入力できるようにします。

**app/view/edit/Edit.js**

    },{
        xtype: 'combobox',
        name: 'group',
        bind: {
            value: '{rec.group}',
            fieldLabel: '{label.group}',
            store: '{groups}'
        },
        valueField: 'id',
        displayField: 'groupName'

* `xtype: 'combobox'`
* `bind`
* `store`
* `valueField`
* `displayField`

### GroupList ビューを追加

* 画面左側のグループ一覧のビューを作ります。

**app/view/grouplist/GroupList.js**

    Ext.define('MyList.view.grouplist.GroupList',{

        extend: 'Ext.grid.Panel',

        xtype: 'grouplist',

        bind: {
            store: '{groups}'
        },

        hideHeaders: true,

        columns: [{
            dataIndex: 'groupName',
            flex: 1
        }]

    });

* ここでも Grid を使っています。
* カラムのヘッダは不要ですので、`hideHeaders` コンフィグで消しています。
* 本当は、DataView コンポーネントを使ってやったほうが軽くなります。
* `flex`

### Main ビューに配置

* いま作ったビューを Main ビューに配置します。

**app/view/main/Main.js**

    requires: [
        'MyList.view.edit.Edit',
        'MyList.view.list.List',
        'MyList.view.grouplist.GroupList'
    ],

と

    },{
        region: 'west',
        xtype: 'grouplist',
        html: 'west',
        width: 250,
        split: true

* 表示を確認します。

### フィルタリングする

* 画面左のグループを選択すると、中央のグリッドをそのグループのみにフィルタリングします。

**app/view/main/Main.js**

`listeners` コンフィグを先ほどの`west` リージョンのコンフィグの中 (`split: true` の次) に追加します。

        listeners: {
            selectionchange: 'onGroupSelect'
        }

**app/view/main/MainController.js**

リスナーを実装します。

    onGroupSelect: function(view, selected) {
        var me = this,
            list = me.lookupReference('mylist'),
            store = list.getStore(),
            groupId;

        groupId = selected.length > 0 ? selected[0].get('id') : null;
        store.clearFilter();
        if( groupId ) {
            store.filter('group', groupId);
        }
    }

* 選択されたグループ ID でフィルタをかけています。
* `store.filter`
* `store.clearFilter`
* `remoteFilter`
