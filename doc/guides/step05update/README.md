# Step.5 データの更新

このステップでは、ユーザーが変更したデータでサーバー側に更新をかけます。

## proxy の設定

**app/model/List.js**

    proxy: {
        type: 'direct',
        api: {
            read: 'MyList.rpc.MyList.getList',
            create: 'MyList.rpc.MyList.createData',
            update: 'MyList.rpc.MyList.updateData',
            destroy: 'MyList.rpc.MyList.removeData'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json'
        }
    }

* `model` 単体での更新を設定
* `proxy`
    * `type`
        * `'ajax'`
        * `'rest'`
        * `'direct'`
    * `api` コンフィグに CRUD それぞれのメソッドを設定
    * `reader`
    * `writer`

## 編集の更新

Model のデータを変更した後 `save` メソッドを呼び出します。
既存の Model の更新になるので `update` にセットしたメソッドが呼ばれます。

**app/view/main/MainController.js**

Edit ビューにつけた「登録」ボタンのイベントリスナーで、画面を変える前にデータを保存するロジックを付け加えます。

    onSubmit: function() {
        var me = this,
            list = me.lookupReference('mylist'),
            edit = me.lookupReference('myedit'),
            data = edit.getViewModel().getData();

        data.rec.save();
        me.setActiveItem(list);
    },

* `save` メソッド
* ダーティマークが消える
* リロードしてもデータが変わっている

## 追加

新しいレコードを追加する時には、新しい Model のインスタンスを生成して、それをEdit の rec にセットしてあげます。

**app/view/main/MainController.js**

    onAddList: function() {
        var me = this,
            list = me.lookupReference('mylist'),
            edit = me.lookupReference('myedit'),
            vmodel = edit.getViewModel();

        vmodel.setData({
            rec: Ext.create('MyList.model.List')
        });
        edit.reset();
        me.setActiveItem(edit);
    },

* id がない状態を `phantom` といいます。
* その状態の時に `save` メソッドが呼ばれると、`create` にセットしたメソッドが呼び出されます。
* サーバー側のメソッドでは、新しいレコードを保存し、新しい id をセットしたレコードを返します。
* 更新でも追加でも Model の `save` メソッドを呼ぶので、「登録」ボタンのリスナーの処理に変更はありません。

## 削除

レコードの削除を実装します。
レコードを削除する場合は、Model の `erase` メソッドを実行します。

**app/view/main/MainController.js**

    onRemoveList: function() {
        var me = this,
            list = me.lookupReference('mylist'),
            selected = list.getSelection();

        if( selected.length > 0 ) {
            selected[0].erase();
        }

    },

* `erase` メソッドは、サーバーに `destroy` のリクエストを送り、
* モデルのインスタンスを破棄します。
* ボタンの活性が変化するのも確認

* `save` でも `erase` でも、Model は自分が所属しているストアを調べて、そこのリストの状態も変更します。

## キャンセル

* データバインディングされているのでユーザーがフォームを変更したら、その変更は即座に Model の内容も変更しています。
* キャンセルされたときには、それを元に戻す必要があります。

**app/view/main/MainController.js**

    onCancel: function() {
        var me = this,
            list = me.lookupReference('mylist'),
            edit = me.lookupReference('myedit'),
            rec = edit.getViewModel().getData().rec;

        if( !rec || rec.phantom ) {
            edit.reset();
        } else {
            rec.load(rec.get('id'));
        }
        me.setActiveItem(list);

    }

* Model の `load` メソッドでサーバーから訂正前のデータを再取得しています。

## Advance: 別な方法

* Model のメソッドで 1件ごとに処理するのではなく、Store の単位で一括処理もできます。
* Store には、`add` / `remove` といったメソッドがあり、Store にレコードを追加、削除できます。
* Store のメンバーの Model を変更するとダーティな状態になります。
* proxy が正しくセッティングされている場合は、Store にいくつかの更新をかけた後で、Store の `sync` メソッドを呼び出すと、それらの変更をまとめてサーバーに送ってくれます。
* Store の getModifiedRecords や getRemovedRecords メソッドで、更新／削除されたレコードを取得できますので、自前で処理することも可能です。
* Ext JS 5 から導入された、Session を使う方法もあります。
  [Ext JS 5 のデータパッケージ詳説](http://www.xenophy.com/sencha-blog/11334)
  が参考になります。
