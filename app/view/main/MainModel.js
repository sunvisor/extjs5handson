/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('MyList.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        title: '名簿リスト',
        label: {
            id: 'ID',
            name: '氏名',
            kana: 'フリガナ',
            namekana: '氏名(カナ)',
            group: 'グループ'
        }
    },

    stores: {
        'groups': {
            fields:[
                'id',
                'groupName'
            ],

            data: [
                { 'id': 1, 'groupName': '家族' },
                { 'id': 2, 'groupName': '親類' },
                { 'id': 3, 'groupName': '友人' },
                { 'id': 4, 'groupName': '知人' },
                { 'id': 5, 'groupName': '同僚' },
                { 'id': 6, 'groupName': '取引先' },
                { 'id': 7, 'groupName': '勉強会' },
                { 'id': 8, 'groupName': '同窓会' },
                { 'id': 9, 'groupName': 'ネット' },
                { 'id': 10, 'groupName': 'その他' }
            ]
        }
    }
});
