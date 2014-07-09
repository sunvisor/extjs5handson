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

