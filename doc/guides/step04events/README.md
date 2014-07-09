## Step.4 イベントの処理

List ビューにツールバーを配置し、イベントの処理をします

### ボタンやリスナー定義の追加

**app/view/main/Main.js**

        items:[{
            xtype:      'mylist',
            reference:  'mylist',
            tbar: [{
                text:       '追加',
                handler:    'onAddList'
            },{
                text:       '削除',
                disabled:   true,
                reference:  'removeButton',
                handler:    'onRemoveList'
            },{
                text:       '編集',
                disabled:   true,
                reference:  'editButton',
                handler:    'onEditList'
            }],
            listeners: {
                itemdblclick:   'onEditList',
                selectionchange:'onListSelect'
            }
        },{

* `handler`
* `reference`
* `listeners`

### Main ビューの ViewController を編集

**app/view/main/MainController.js**

    Ext.define('MyList.view.main.MainController', {
        extend: 'Ext.app.ViewController',

        alias: 'controller.main',

        onAddList: function() {
            console.log('add list');
        }

    });

* 追加ボタンでコンソールに表示されるのを確認

### ボタンの活性化制御

**app/view/main/MainController.js**

    onListSelect: function(view, selected) {
        var me = this,
            flag = selected.length === 0,
            editButton = me.lookupReference('editButton'),
            removeButton = me.lookupReference('removeButton');

        editButton.setDisabled(flag);
        removeButton.setDisabled(flag);
    }

* `selectionchange` イベント
* `lookupReference`

### のこりのリスナーを追加

**app/view/main/MainController.js**

    onEditList: function() {
        console.log('edit list');
    },

    onRemoveList: function() {
        console.log('remove list');
    }

### 編集ボタンで Edit ビューに切り替え

`reference` を追加

**app/view/main/Main.js**

        region:     'center',
        xtype:      'container',
        reference:  'center',
        items:[{
            xtype:      'mylist',
            reference:  'mylist',

と

        },{
            xtype:      'myedit',
            reference:  'myedit'


* `center`
* `mylist`
* `myedit`

**app/view/main/MainController.js**

    setActiveItem: function(panel) {
        var me = this,
            center = me.lookupReference('center');

        center.getLayout().setActiveItem(panel);
    },

    onEditList: function() {
        var me = this,
            list = me.lookupReference('mylist'),
            edit = me.lookupReference('myedit'),
            selected = list.getSelection(),
            vmodel = edit.getViewModel();

        if( selected.length > 0 ) {
            vmodel.setData({
                rec: selected[0]
            });
            me.setActiveItem(edit);
        }
    },

* `setActiveItem`
* `getViewModel`

### List ビューに戻る

**app/view/main/Main.js**

Edit ビューにツールバー追加

            xtype:      'myedit',
            reference:  'myedit',
            fbar: [{
                text: '登録',
                handler: 'onSubmit'
            },{
                text: 'キャンセル',
                handler: 'onCancel'
            }]

**app/view/main/MainController.js**

    onSubmit: function() {
        console.log('submit');
    },

    onCancel: function() {
        console.log('cancel');
    }

イベント確認

### 戻る処理だけ

**app/view/main/MainController.js**

    onSubmit: function() {
        var me = this,
            list = me.lookupReference('mylist');

        me.setActiveItem(list);
    },

* 戻ることを確認
* データが変更されたらグリッドが更新されることを確認
* ダーティマークが消えないのを確認


