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
        'MyList.view.edit.Edit'
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
        xtype: 'panel',
        html: 'west',
        width: 250,
        split: true
    },{
        region: 'center',
        xtype: 'container',
        layout: 'card',
        items:[{
            xtype: 'myedit'
        },{
            xtype: 'panel',
            html: 'edit panel'
        }]
    }]
});
