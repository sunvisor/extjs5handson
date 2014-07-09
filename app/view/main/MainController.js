Ext.define('MyList.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onAddList: function() {
        console.log('add list');
    },

    onListSelect: function(view, selected) {
        var me = this,
            flag = selected.length === 0,
            editButton = me.lookupReference('editButton'),
            removeButton = me.lookupReference('removeButton');

        editButton.setDisabled(flag);
        removeButton.setDisabled(flag);
    },

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

    onRemoveList: function() {
        console.log('remove list');
    },

    onSubmit: function() {
        var me = this,
            list = me.lookupReference('mylist');

        me.setActiveItem(list);
    },

    onCancel: function() {
        console.log('cancel');
    }
});
