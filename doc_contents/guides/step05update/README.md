## Step.5 データの更新

### proxy の設定

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

* `proxy`
* `type`
* `api` コンフィグに CRUD それぞれのメソッドを設定
* `model` 単体での更新を設定
* `reader`
* `writer`

### 編集の更新

update がかかる

**app/view/main/MainController.js**

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

### 追加

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

* Edit に切り替える前に空のレコードをセット
* id がない = phantom
* `save` で create が走る

### 削除

**app/view/main/MainController.js**

    onRemoveList: function() {
        var me = this,
            list = me.lookupReference('mylist'),
            selected = list.getSelection();

        if( selected.length > 0 ) {
            selected[0].erase();
        }

    },

* `erase` メソッド
* ボタンの活性が変化するのも確認

### キャンセル

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



