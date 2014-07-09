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
    }

});
