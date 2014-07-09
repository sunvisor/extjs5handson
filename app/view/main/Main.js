/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('MyList.view.main.Main', {
    extend: 'Ext.container.Container',

    xtype: 'app-main',

    requires: [
        'MyList.view.edit.Edit',
        'MyList.view.list.List',
        'MyList.view.grouplist.GroupList'
    ],

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
        xtype: 'grouplist',
        html: 'west',
        width: 250,
        split: true
    },{
        region:     'center',
        xtype:      'container',
        reference:  'center',
        layout: 'card',
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
            xtype:      'myedit',
            reference:  'myedit',
            fbar: [{
                text: '登録',
                handler: 'onSubmit'
            },{
                text: 'キャンセル',
                handler: 'onCancel'
            }]
        }]
    }]
});
