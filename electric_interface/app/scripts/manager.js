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
            PANEL_RATIO       = PANEL_INIT_WIDTH / PANEL_INIT_HEIGHT,
            KEYS              = {
                CTRL  : 17,
                SHIFT : 16,
                A     : 65
            },
            BUTTON_OFFSET_Y   = ["13.5%", "22.3%", "29.3%", "35.3%", "42.3%", "49.3%", "56.3%", "64.3%"],
            COOKIE_LOG_NAME   = "energy_log",
            INIT_LOG          = {
                players_energy_percentage : [0],
                buttons_state_history     : []
            };

        return {
            resizePanel : function resizePanel()
            {
                var panel_new_height = 0,
                    panel_new_width  = 0,
                    panel_margin_top = 0,
                    win_ratio        = $(window).width() / $(window).height();

                if (WIN_INIT_RATIO >= win_ratio)
                {
                    panel_new_width  = PANEL_INIT_WIDTH * $(window).width() / WIN_INIT_WIDTH;
                    panel_new_height = panel_new_width / PANEL_RATIO;
                    panel_margin_top = 29 * $(window).width() / WIN_INIT_WIDTH;
                }
                else if (WIN_INIT_RATIO < win_ratio)
                {
                    panel_new_height = PANEL_INIT_HEIGHT * $(window).height() / WIN_INIT_HEIGHT;
                    panel_new_width  = panel_new_height * PANEL_RATIO;
                    panel_margin_top = 29 * $(window).height() / WIN_INIT_HEIGHT;
                }

                this.panel.width(panel_new_width);
                this.panel.height(panel_new_height);
                this.panel.css({marginTop : panel_margin_top});
            },

            updateLog : function updateLog()
            {
                window.localStorage.setItem(COOKIE_LOG_NAME, JSON.stringify(this.log));
            },

            updateEnergyBar : function updateEnergyBar()
            {
                var nrg = Utils.arraySum(this.log.players_energy_percentage);
                this.bar.css({width : nrg + "%"});
            },

            resetAll : function resetAll()
            {
                window.localStorage.clear();
                window.location.reload();
            },

            resetButtonHistory : function resetButtonHistory( e )
            {
                var t = $(e.currentTarget),
                    i = parseInt(t.attr("id").replace("reset_time_",""),10),
                    button_elem   = $(".buttons-container").eq( i + 1),
                    current_state = button_elem[0].className.replace("buttons-container ","");;

                this.log.buttons_state_history[ i ] = [];
                this.changeState( button_elem, i, window.CONFIG.buttons[i], current_state, "off", false );
                this.closeAdminPanel()
            },

            setEnergyPercentage : function setEnergyPercentage()
            {
                var input_val = parseInt( $("#energy_percentage").val(), 10),
                    offset    = input_val - Utils.arraySum( this.log.players_energy_percentage );

                this.log.players_energy_percentage.push( offset );
                this.updateLog();
                this.updateEnergyBar();
                this.closeAdminPanel();
            },

            getStateTime: function getStateTime( i, state )
            {
                //.push([{time : new Date().getTime(), state : "off"}]);
                var time = 0,
                    time_tmp = 0;

                for( var h in this.log.buttons_state_history[i] )
                {
                    var history = this.log.buttons_state_history[i][h];

                    if( history.state === state )
                        time_tmp = history.time;
                    else if( history.state !== state && time_tmp !== 0 )
                    {
                        time += history.time - time_tmp;
                        time_tmp = 0;
                    }
                }

                if( time_tmp !== 0 )
                    time += new Date().getTime() - time_tmp;

                return time;
            },

            changeState : function changeState(b, i, button, current_state, new_state, add_points)
            {
                add_points = typeof add_points === "undefined" ? true : add_points;
                b.removeClass(current_state);
                b.addClass(new_state);

                this.log.buttons_state_history[i].push({time : new Date().getTime(), state : new_state});

                if( add_points )
                    this.log.players_energy_percentage.push(button.state_percentage_offset[new_state]);

                this.updateLog();
                this.updateEnergyBar();
            },

            onButtonClick : function onButtonClick(e)
            {
                var t      = $(e.currentTarget),
                    i      = t.index() - 1,
                    button = window.CONFIG.buttons[i];

                if (t.hasClass("idle") && Utils.arraySum(this.log.players_energy_percentage) + button.state_percentage_offset.on >= 0)
                    this.changeState(t, i, button, "idle", "on");
                else if (t.hasClass("on") && button.can_switch_off)
                    this.changeState(t, i, button, "on", "idle");
                else if (t.hasClass("off"))
                    return false;
            },

            generateButtons : function generateButtons()
            {
                for (var b in window.CONFIG.buttons)
                {
                    var i          = parseInt(b, 10),
                        button     = window.CONFIG.buttons[b],
                        template   = this.panel.find(".buttons-container").first().clone(),
                        epidle     = button.state_percentage_offset.idle >= 0 ? "+" + button.state_percentage_offset.idle : button.state_percentage_offset.idle + "",
                        epidle_str = button.can_switch_off ? " [" + epidle + "%]" : "",
                        epon_str   = " [" + ( button.state_percentage_offset.on >= 0 ? "+" + button.state_percentage_offset.on : button.state_percentage_offset.on + "" ) + "%]";

                    template.find(".on .text").text(button.text + epidle_str);
                    template.find(".idle .text").text(button.text + epon_str);
                    template.find(".off .text").text(button.text);
                    template.css({
                        top : BUTTON_OFFSET_Y[i],
                        "animation-delay": (Math.random()*10).toFixed(3)+"s",
                        "animation-duration": (Math.random()*20).toFixed(3)+"s"
                    });
                    template.click(this.onButtonClick.bind(this));

                    this.panel.find(".column").first().append(template);

                    if (!this.log.buttons_state_history[i])
                        this.log.buttons_state_history.push([{time : new Date().getTime(), state : "off"}]);
                    else
                    {
                        var last_state = this.log.buttons_state_history[i].length - 1;
                        template.removeClass("off");
                        template.addClass(this.log.buttons_state_history[i][last_state].state);
                    }

                    this.updateLog();
                }
            },

            closeAdminPanel : function closeAdminPanel(e)
            {
                this.admin_panel.hide();
            },

            buttonStateAdminChange : function buttonStateAdminChange(e)
            {
                var t             = $(e.currentTarget),
                    state         = t.val(),
                    i             = parseInt( t.attr("name").replace("bt_state_",""), 10),
                    button_elem   = $(".buttons-container").eq( i + 1),
                    current_state = button_elem[0].className.replace("buttons-container ","");

                this.changeState( button_elem, i, window.CONFIG.buttons[i], current_state, state, false )
            },

            openAdminPanel : function openAdminPanel(e)
            {
                $("#admin_panel").find("tr").not($("#admin_panel").find("tr").first()).remove();
                $("#energy_percentage").val( Utils.arraySum( this.log.players_energy_percentage ) );

                for( var b in window.CONFIG.buttons )
                {
                    var i             = parseInt( b, 10),
                        button        = window.CONFIG.buttons[i],
                        button_elem   = $(".buttons-container").eq( i + 1 ),
                        current_state = button_elem[0].className.replace("buttons-container ",""),
                        on_time       = Utils.msToHMS( this.getStateTime(i,"on") ),
                        td1           = $("<td>Pulsante <strong>"+button.text+"</strong></td>"),
                        td2           = $("<td>Stato: <select name='bt_state_"+i+"'>" +
                                             "<option value='on' "+(current_state === "on" ? "selected" : "")+">Acceso</option>" +
                                             "<option value='idle' "+(current_state === "idle" ? "selected" : "")+">Sbloccato</option>" +
                                             "<option value='off' "+(current_state === "off" ? "selected" : "")+">Bloccato</option>" +
                                         "</select><br>" +
                                         "Pulsante acceso da: "+on_time+"<br>" +
                                         "<button id='reset_time_"+i+"'>Resetta Pulsante</button></td>"),
                        tr            = $("<tr>").append(td1).append(td2);

                    $("#admin_panel").find("table").append(tr);
                    tr.find("select").change(this.buttonStateAdminChange.bind(this));
                    tr.find("button").click(this.resetButtonHistory.bind(this));
                }
                this.admin_panel.show();
            },

            checkShortCuts : function checkShortCuts(e)
            {
                if( !this.keys )
                    this.keys = {};

                this.keys[e.which] = true;

                if (this.keys[KEYS.CTRL] && this.keys[KEYS.SHIFT] && this.keys[KEYS.A])
                    this.openAdminPanel();
            },

            onKeyUp : function onKeyUp(e)
            {
                if( this.keys && this.keys[e.which] )
                    delete this.keys[e.which];
            },

            setListeners : function setListeners()
            {
                $(window).resize(this.resizePanel.bind(this));
                $(document).keydown(this.checkShortCuts.bind(this));
                $(document).keyup(this.onKeyUp.bind(this));
                $("#admin_close").click(this.closeAdminPanel.bind(this));
                $("#set_energy").click(this.setEnergyPercentage.bind(this));
                $("#reset_all").click(this.resetAll.bind(this));
            },

            getCookieLog : function getCookieLog()
            {
                var cookie_log = window.localStorage.getItem(COOKIE_LOG_NAME);

                if (cookie_log)
                    this.log = JSON.parse(cookie_log);
                else
                {
                    this.log                           = INIT_LOG;
                    this.log.players_energy_percentage = [window.CONFIG.players_init_energy_percentage];
                    this.updateLog();
                }

                this.updateEnergyBar();
            },

            getDOMElements : function getDOMElements()
            {
                this.panel       = $("#panel");
                this.bar         = $("#energy_bar").find(".bar");
                this.admin_panel = $("#admin_background");
            },

            init : function init()
            {
                this.getDOMElements();
                this.getCookieLog();
                this.generateButtons();
                this.setListeners();
                this.resizePanel();
            }
        };
    }();

$(document).ready(Manager.init.bind(Manager));
