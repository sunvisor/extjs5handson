Ext.define('MyList.view.edit.EditModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.edit',

    data: {
        name: 'MyList',
        rec: {
            name: '中村久司',
            kana: 'なかむらひさし'
        }
    },

    formulas: {
        namekana: function(get) {
            var name = get('rec.name');
                kana = get('rec.kana');
            return name + ' (' + kana + ')';
        }
    }
});
