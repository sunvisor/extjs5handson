## Step.6 グループ

### store の定義

`data` プロパティでの設定

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

* `bind`
* `store`
* `valueField`
* `displayField`

### GroupList ビューを追加

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

### Main ビューに配置

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

* 表示を確認

### フィルタリングする

**app/view/main/Main.js**

        listeners: {
            selectionchange: 'onGroupSelect'
        }

* west リージョンのパネルに追加

**app/view/main/MainController.js**

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

* `store.filter`
* `store.clearFilter`
* `remoteFilter`
