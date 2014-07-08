/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('MyList.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'Ext.direct.*',
        'Ext.direct.RemotingProvider',
        'Ext.data.proxy.Direct',
        'Ext.tip.QuickTipManager'
    ],

    name: 'MyList',

    views: [
        // TODO: add views here
    ],

    controllers: [
        'Root'
        // TODO: add controllers here
    ],

    stores: [
        // TODO: add stores here
    ],
    
    launch: function () {
        // TODO - Launch the application
    }
});

Ext.onReady(function() {
    Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
});
