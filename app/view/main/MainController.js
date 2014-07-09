Ext.define('MyList.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

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
        var me = this,
            list = me.lookupReference('mylist'),
            selected = list.getSelection();

        if( selected.length > 0 ) {
            selected[0].erase();
        }

    },

    onSubmit: function() {
        var me = this,
            list = me.lookupReference('mylist'),
            edit = me.lookupReference('myedit'),
            data = edit.getViewModel().getData();

        data.rec.save();
        me.setActiveItem(list);
    },

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
});
