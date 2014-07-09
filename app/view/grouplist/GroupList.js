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
