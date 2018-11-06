/**
 * Created by Miroku on 11/10/2018.
 */

var Manager = Manager || function () {
    return {
        
        disegnaStatisticheClassi: function disegnaStatisticheClassi( data )
        {
            var data            = data.data,
                military_data   = data.filter( function(el){ return el.tipo_classe === "militare"; }),
                military_labels = military_data.map( function(el){ return el.nome_classe; }),
                military_colors = military_data.map( function(el){ return Utils.dynamicColor(); }),
                military_data   = military_data.map( function(el){ return parseInt( el.QTY, 10 ); }),
                civilian_data   = data.filter( function(el){ return el.tipo_classe === "civile"; }),
                civilian_labels = civilian_data.map( function(el){ return el.nome_classe; }),
                civilian_colors = civilian_data.map( function(el){ return Utils.dynamicColor(); }),
                civilian_data   = civilian_data.map( function(el){ return parseInt( el.QTY, 10 ); });
            
            this.military_classes_pie = new Chart( this.military_classes_pie_ctx, {
                type   : 'pie',
                data   : { datasets: [ { data: military_data, backgroundColor: military_colors } ], labels: military_labels },
                options: { responsive: false }
            } );
            
            console.log(civilian_data,civilian_labels);
            
            this.civilian_classes_pie = new Chart( this.civilian_classes_pie_ctx, {
                type   : 'pie',
                data   : { datasets: [ { data: civilian_data, backgroundColor: civilian_colors } ], labels: civilian_labels },
                options: { responsive: false }
            } );
        },
        
        recuperaStatisticheClassi: function recuperaStatisticheClassi()
        {
            Utils.requestData(
                "http://api.rebootgrv.com/api.php/statistics/recuperastatisticheclassi",
                "GET",
                {},
                this.disegnaStatisticheClassi.bind( this ),
                window.alert.bind( this, "recuperaStatisticheClassi fallito" )
            );
        },
        
        disegnaStatisticheAbilita: function disegnaStatisticheAbilita()
        {
        },
        
        recuperaStatisticheAbilita: function recuperaStatisticheAbilita()
        {
            Utils.requestData(
                "http://api.rebootgrv.com/api.php/statistics/recuperastatisticheabilita",
                "GET",
                {},
                this.disegnaStatisticheAbilita.bind( this ),
                window.alert.bind( this, "recuperaStatisticheAbilita fallito" )
            );
        },
        
        disegnaStatisticheCrediti: function disegnaStatisticheCrediti()
        {
        },
        
        recuperaStatisticheCrediti: function recuperaStatisticheCrediti() {
            Utils.requestData(
                "http://api.rebootgrv.com/api.php/statistics/recuperastatistichecrediti",
                "GET",
                {},
                this.disegnaStatisticheCrediti.bind( this ),
                window.alert.bind( this, "recuperaStatisticheCrediti fallito" )
            );
        },
        
        disegnaStatistichePG: function disegnaStatistichePG()
        {
        },
        
        recuperaStatistichePG: function recuperaStatistichePG()
        {
            Utils.requestData(
                "http://api.rebootgrv.com/api.php/statistics/recuperastatistichepg",
                "GET",
                {},
                this.disegnaStatistichePG.bind( this ),
                window.alert.bind( this, "recuperaStatistichePG fallito" )
            );
        },
        
        disegnaStatistichePunteggi: function disegnaStatistichePunteggi() {
        },
        
        
        recuperaStatistichePunteggi: function recuperaStatistichePunteggi()
        {
            Utils.requestData(
                "http://api.rebootgrv.com/api.php/statistics/recuperastatistichepunteggi",
                "GET",
                {},
                this.disegnaStatistichePunteggi.bind( this ),
                window.alert.bind( this, "recuperaStatistichePunteggi fallito" )
            );
        },
        
        disegnaStatisticheQtaRavShop: function disegnaStatisticheQtaRavShop()
        {
        },
        
        recuperaStatisticheQtaRavShop: function recuperaStatisticheQtaRavShop()
        {
            Utils.requestData(
                "http://api.rebootgrv.com/api.php/statistics/recuperastatisticheqtaravshop",
                "GET",
                {},
                this.disegnaStatisticheQtaRavShop.bind( this ),
                window.alert.bind( this, "recuperaStatisticheQtaRavShop fallito" )
            );
        },
        
        disegnaStatisticheAcquistiRavShop: function disegnaStatisticheAcquistiRavShop()
        {
        },
        
        recuperaStatisticheAcquistiRavShop: function recuperaStatisticheAcquistiRavShop()
        {
            Utils.requestData(
                "http://api.rebootgrv.com/api.php/statistics/recuperastatisticheacquistiravshop",
                "GET",
                {},
                this.disegnaStatisticheAcquistiRavShop.bind( this ),
                window.alert.bind( this, "recuperaStatisticheAcquistiRavShop fallito" )
            );
        },
        
        loadCharts: function loadCharts() {
            this.recuperaStatisticheClassi();
            this.recuperaStatisticheAbilita();
            this.recuperaStatisticheCrediti();
            //this.recuperaStatistichePG();
            this.recuperaStatistichePunteggi();
            this.recuperaStatisticheQtaRavShop();
            this.recuperaStatisticheAcquistiRavShop();
        },
        
        doLogin: function doLogin() {
            Utils.requestData(
                "http://api.rebootgrv.com/api.php/usersmanager/login/",
                "POST",
                {
                    mail    : "miroku_87@yahoo.it",
                    password: "Kagome87"
                },
                this.loadCharts.bind( this ),
                window.alert.bind( this, "Login fallito" )
            );
        },
        
        getDOMElements: function getDOMElements() {
            this.military_classes_pie_ctx    = $( "#military_classes_pie" )[0].getContext("2d");
            this.military_abilities_bars_ctx = $( "#military_abilities_bars" )[0].getContext("2d");
            this.civilian_classes_pie_ctx    = $( "#civilian_classes_pie" )[0].getContext("2d");
            this.civilian_abilities_pie_ctx  = $( "#civilian_abilities_pie" )[0].getContext("2d");
            this.credits_line_ctx            = $( "#credits_line" )[0].getContext("2d");
            this.pf_pie_ctx                  = $( "#pf_pie" )[0].getContext("2d");
            this.ps_pie_ctx                  = $( "#ps_pie" )[0].getContext("2d");
            this.mente_pie_ctx               = $( "#mente_pie" )[0].getContext("2d");
            this.pm_pie_ctx                  = $( "#pm_pie" )[0].getContext("2d");
            this.pc_tot_pie_ctx              = $( "#pc_tot_pie" )[0].getContext("2d");
            this.px_tot_pie_ctx              = $( "#px_tot_pie" )[0].getContext("2d");
            this.pc_spent_pie_ctx            = $( "#pc_spent_pie" )[0].getContext("2d");
            this.px_spent_pie_ctx            = $( "#px_spent_pie" )[0].getContext("2d");
            this.pc_free_pie_ctx             = $( "#pc_free_pie" )[0].getContext("2d");
            this.px_free_pie_ctx             = $( "#px_free_pie" )[0].getContext("2d");
            this.ravshop_qty_bar_ctx         = $( "#ravshop_qty_bar" )[0].getContext("2d");
            this.ravshop_popularity_bar_ctx  = $( "#ravshop_popularity_bar" )[0].getContext("2d");
        },
        
        init: function init() {
            this.getDOMElements();
            this.doLogin();
        }
    };
}();

$( document ).ready( Manager.init.bind( Manager ) );
