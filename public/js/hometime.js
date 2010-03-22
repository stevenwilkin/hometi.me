var HomeTime = (function(){
	
	var
		home_time = null,
		home_hour = 17,		//
		home_minute = 0;	// default values for user specifed home time

	/**
	 * create a Date object corresponding to the user's home time
	 */
	function updateHomeTime(){
		var now = new Date();
		home_time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), home_hour, home_minute)
	}

	/**
	 * calculate the number of milliseconds until home time
	 */
	function countdown(){
		return (home_time.getTime() - (new Date()).getTime());
	}

	/**
	 * cookie manipulation
	 * http://www.quirksmode.org/js/cookies.html
	 */
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	return {

		/**
		 * load settings from cookie and start countdown
		 */
		init: function(){
			home_hour = readCookie('home_hour') || home_hour;
			home_minute = readCookie('home_minute') || home_minute;
			updateHomeTime();
		},

		/**
		 * persist settings to cookie
		 */
		save: function(){
			createCookie('home_hour', home_hour);
			createCookie('home_minute', home_minute);
		}
	};

})();

$(HomeTime.init);
