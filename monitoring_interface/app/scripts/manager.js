/**
 * Created by Miroku on 11/10/2018.
 */

var Manager = Manager || function ()
    {
        var KEYS = {
            CTRL  : 17,
            SHIFT : 16,
            A     : 65
        };

        return {

            bringToBackground : function (ev)
            {
                var t = $(ev.currentTarget);

                if (!t.hasClass("active"))
                    t.removeClass("foreground");
            },

            scaleChart : function scaleChart(ev)
            {
                var t = $(ev.currentTarget).parent();
                if (!t.hasClass("active"))
                {
                    t.addClass("active");
                    t.addClass("foreground");
                }
                else if (t.hasClass("active"))
                {
                    t[0].removeEventListener("transitionend", this.bringToBackground);
                    t[0].addEventListener("transitionend", this.bringToBackground);

                    t.removeClass("active");
                }
            },

            resetAll : function resetAll()
            {
                window.localStorage.clear();
                window.location.reload();
            },

            closeAdminPanel : function closeAdminPanel(e)
            {
                this.admin_panel.hide();
            },

            openAdminPanel : function openAdminPanel(e)
            {
                $("#admin_panel").find("tr").not($("#admin_panel").find("tr").first()).remove();
                this.admin_panel.show();
            },

            checkShortCuts : function checkShortCuts(e)
            {
                if (!this.keys)
                    this.keys = {};

                this.keys[e.which] = true;

                //if (this.keys[KEYS.CTRL] && this.keys[KEYS.SHIFT] && this.keys[KEYS.A])
                //    this.openAdminPanel();
            },

            onKeyUp : function onKeyUp(e)
            {
                if (this.keys && this.keys[e.which])
                    delete this.keys[e.which];
            },

            setVideoPlayback : function setListeners()
            {
                this.videos.each(function ()
                {
                    this.playbackRate = 0.5;
                });
            },

            setListeners : function setListeners()
            {
                $(document).keydown(this.checkShortCuts.bind(this));
                $(document).keyup(this.onKeyUp.bind(this));
                $("#admin_close").click(this.closeAdminPanel.bind(this));
                this.videos.click(this.scaleChart.bind(this))
            },

            getDOMElements : function getDOMElements()
            {
                this.admin_panel = $("#admin_background");
                this.videos      = $("video");
            },

            init : function init()
            {
                this.getDOMElements();
                this.setListeners();
                this.setVideoPlayback();
            }
        };
    }();

$(document).ready(Manager.init.bind(Manager));
