Ext.define('MyList.model.List', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'group', type: 'number'}
    ],

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

});
