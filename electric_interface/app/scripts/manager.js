/**
 * Created by Miroku on 11/10/2018.
 */

var Manager = Manager || function ()
{
    var WIN_INIT_WIDTH    = 1366,
        WIN_INIT_HEIGHT   = 900,
        WIN_INIT_RATIO    = WIN_INIT_WIDTH / WIN_INIT_HEIGHT,
        PANEL_INIT_WIDTH  = 1118,
        PANEL_INIT_HEIGHT = 835,
        PANEL_RATIO       = PANEL_INIT_WIDTH / PANEL_INIT_HEIGHT;

    return {
        resizePanel: function resizePanel()
        {
            var panel_new_height = 0,
                panel_new_width  = 0,
                panel_margin_top = 0,
                win_ratio        = $( window ).width() / $( window ).height();

            if( WIN_INIT_RATIO >= win_ratio )
            {
                panel_new_width  = PANEL_INIT_WIDTH * $( window ).width() / WIN_INIT_WIDTH;
                panel_new_height = panel_new_width / PANEL_RATIO;
                panel_margin_top = 29 * $(window).width() / WIN_INIT_WIDTH;
            }
            else if ( WIN_INIT_RATIO < win_ratio )
            {
                panel_new_height = PANEL_INIT_HEIGHT * $(window).height() / WIN_INIT_HEIGHT;
                panel_new_width  = panel_new_height * PANEL_RATIO;
                panel_margin_top = 29 * $(window).height() / WIN_INIT_HEIGHT;
            }

            this.panel.width( panel_new_width );
            this.panel.height( panel_new_height );
            this.panel.css( { marginTop: panel_margin_top } );
        },

        setListeners: function setListeners()
        {
            $(window).resize( this.resizePanel.bind(this) );
        },

        getDOMElements: function getDOMElements()
        {
            this.panel = $("#panel");
        },

        init: function init()
        {
            this.getDOMElements();
            this.setListeners();
            this.resizePanel();
        }
    };
}();

$(document).ready(Manager.init.bind(Manager));
