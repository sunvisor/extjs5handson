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
    },{
        xtype: 'combobox',
        name: 'group',
        bind: {
            value: '{rec.group}',
            fieldLabel: '{label.group}',
            store: '{groups}'
        },
        valueField: 'id',
        displayField: 'groupName'
    }]

});

