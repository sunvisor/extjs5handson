# Step.4 イベントの処理

List ビューにツールバーを配置し、イベントの処理をします。
次の様なことができるようにしましょう。

* 名簿の追加
* 名簿からの削除
* 名簿の編集

名簿の入力には Step.2 で作った Edit ビューを使います。

* ViewController

## ボタンやリスナー定義の追加

ボタンを List ビューに追加します。
今回は、イベント処理を MainController で行いますので、
ボタンの追加も、Main ビュー側に記述します。

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

## Main ビューの ViewController を編集

**app/view/main/MainController.js**

    Ext.define('MyList.view.main.MainController', {
        extend: 'Ext.app.ViewController',

        alias: 'controller.main',

        onAddList: function() {
            console.log('add list');
        }

    });

* `onAddList:` がイベントリスナー
* 追加ボタンでコンソールに 'add list' と表示されるのを確認

## ボタンの活性化制御

* List が選択状態になったら、「編集」「削除」ボタンを有効化する

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

## のこりのリスナーを追加

**app/view/main/MainController.js**

    onEditList: function() {
        console.log('edit list');
    },

    onRemoveList: function() {
        console.log('remove list');
    }

* 今のところは `console.log` のみ記述。
* リスナーが呼び出されていることを確認

## 編集ボタンで Edit ビューに切り替え

編集ボタンを押したときに、表示を Edit ビューに切り替えるのを実装します。
その時にはもちろん一覧のデータをフォームにセットします。

Main ビューに `reference` を追加します。

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

次の3つの `reference` を追加しました。

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

* `setActiveItem` メソッド
    * center パネルのアクティブな子アイテムを切り替えます
* `getViewModel`
    * ビューに関連するビューモデルを取得できます

## List ビューに戻る

これで「編集」ボタンで Edit ビューが表示されますが、
このままでは List ビューに戻れないので、戻る処理を実装します。

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

* `fbar`

**app/view/main/MainController.js**

イベントリスナーを追加。まずは `console.log` で。

    onSubmit: function() {
        console.log('submit');
    },

    onCancel: function() {
        console.log('cancel');
    }

* イベント確認

## 戻る処理を実装

**app/view/main/MainController.js**

    onSubmit: function() {
        var me = this,
            list = me.lookupReference('mylist');

        me.setActiveItem(list);
    },

* 戻ることを確認します。
* データが変更されたらグリッドが更新されることを確認します。
* ダーティマークが消えないのを確認します。
