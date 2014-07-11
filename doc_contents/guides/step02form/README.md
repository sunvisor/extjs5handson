# Step.2 Form でのデータバインディング

ここでは画面上にフォームを配置し、フォームフィールドと裏側にあるデータがバインドされる様子を確認します。

## Edit ビューの作成

フォームを使った Edit ビューを作成します。

**app/view/edit/Edit.js**

    Ext.define('MyList.view.edit.Edit',{
        extend: 'Ext.form.Panel',
        xtype: 'myedit',

        requires: [
            'Ext.form.field.Hidden'
        ],

        viewModel: 'edit',

        bodyPadding: 12,

        bind: {
            title: '{title}'
        },

        defaults: {
            fieldWidth: 100
        },

        items: [{
            xtype: 'hidden',
            name: 'id',
            bind: '{rec.id}'
        },{
            xtype: 'textfield',
            name: 'name',
            bind: {
                value: '{rec.name}',
                fieldLabel: '{label.name}'
            }
        },{
            xtype: 'textfield',
            name: 'kana',
            bind: {
                value: '{rec.kana}',
                fieldLabel: '{label.kana}'
            }
        },{
            xtype: 'displayfield',
            bind: {
                value: '{namekana}',
                fieldLabel: '{label.namekana}'
            }
        }]

    });

* `requires`
* `defaults`
* `items`
* `xtype`
* `bind`
* `textfield`
* `displayfield`

## Edit ビューの ViewModel を作成

**app/view/edit/EditModel.js**

    Ext.define('MyList.view.edit.EditModel', {

        extend: 'Ext.app.ViewModel',

        alias: 'viewmodel.edit',

        data: {
            name: 'MyList',
            rec: {
                name: '中村久司',
                kana: 'なかむらひさし'
            }
        },

        formulas: {
            namekana: function(get) {
                var name = get('rec.name');
                    kana = get('rec.kana');
                return name + ' (' + kana + ')';
            }
        }
    });

* `alias: 'viewmodel.foo'`
* `data`
* `formulas` と `get`

## Main ビューに Edit を追加

    requires: [
        'MyList.view.edit.Edit'
    ],

と

        items:[{
            xtype: 'myedit'
        },{
            xtype: 'panel',
            html: 'edit panel'
        }]

* `requires`
* 本来は2枚目に置くのだけど、フォームの表示確認のため1枚目に
* watch していない場合は refresh
* ブラウザで表示
* フォームを修正すると、同時に `namekana` の `displayfield` が更新されることを確認。
