var Utils =
    {
        pad : function (num, size)
        {
            var num   = parseInt(num, 10),
                minus = num < 0 ? "-" : "",
                s     = "000" + Math.abs(num);
            return minus + s.substr(s.length - size);
        },

        arraySum : function (arr)
        {
            return arr.reduce(function (prev, curr)
            {
                return prev + curr;
            }, 0);
        },

        msToHMS : function (ms)
        {
            // 1- Convert to seconds:
            var seconds = ms / 1000;
            // 2- Extract hours:
            var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
            seconds = seconds % 3600; // seconds remaining after extracting hours
            // 3- Extract minutes:
            var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
            // 4- Keep only seconds not extracted to minutes:
            seconds = parseInt( seconds % 60, 10 );
            return Utils.pad(hours, 2) + " ore, " + Utils.pad(minutes, 2) + " minuti, " + Utils.pad(seconds,2) + " secondi";
        },

        setCookie : function (cname, cvalue, exdays)
        {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires     = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },

        deleteCookie : function (cname)
        {
            document.cookie = cname + "=" + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        },

        getCookie : function (cname)
        {
            var name = cname + "=";
            var ca   = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++)
            {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        }
    };
