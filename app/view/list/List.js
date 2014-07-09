Ext.define('MyList.view.list.List',{

    extend:     'Ext.grid.Panel',

    xtype:      'mylist',

    viewModel: 'list',

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
