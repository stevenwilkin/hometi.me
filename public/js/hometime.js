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
	 * calculate the countdown until home time
	 */
	function countdown(){
		var count = new Date(home_time.getTime() - (new Date()).getTime());
		if(count <= 0)
			return null;
		var
			hours = count.getUTCHours(),
			minutes = count.getMinutes(),
			seconds = count.getSeconds();
		// hours
		var plural = (hours == 1) ? '' : 's';
		var str = (hours) ? hours + ' hour' + plural : '';
		// minutes
		plural = (minutes == 1) ? '' : 's';
		str += (hours && minutes) ? ', ' : '';
		str += (minutes) ? minutes + ' minute' + plural : '';
		// seconds
		str += ((hours || minutes) && (seconds)) ? ', ' : '';
		plural = (seconds == 1) ? '' : 's';
		str += (seconds) ? seconds + ' second' + plural : '';
		return str;
	}
	
	function displayCountdown(){
		var count = countdown();
		if(count) {
			$('#content').html(count);
			setTimeout(displayCountdown, 1000);
		} else {
			var ampm = 'pm', hour = home_hour.toString(), minute = home_minute.toString();
			if(hour < 12){
				ampm = 'am';
				if(hour == 0)
					hour = 12;
				else if(hour < 10 && hour.length == 2)
					hour = hour[1];
			} else {
				hour = (hour == 12) ? hour : hour - 12;
			}
			if(minute < 10 && minute.length == 1)
				minute = '0' + minute;
			var str = 'It\'s after ' + hour + ':' + minute + ampm + ' - time you weren\'t here!';
			$('#content').html(str);
		}
	}

	/**
	 * allow the user to specify their home time
	 */
	function userControls(){
		var
			hour = (home_hour < 10 && home_hour.toString().length == 1) ? '0' + home_hour : home_hour,
			minute = (home_minute < 10 && home_minute.toString().length == 1) ? '0' + home_minute : home_minute;
		// set link text to hour and minute of home time
		$('a.hour').html(hour);
		$('a.minute').html(minute);
		// set selected option in select elements
		$('select.hour > option[value=' + hour + ']').attr('selected', 'selected');
		$('select.minute > option[value=' + minute + ']').attr('selected', 'selected');
		// change hour/minute by clicking link then changing select option
		$('a.hour, a.minute').click(function(){
			var $select = $(this).next(),
				$link = $(this);
			$link.hide();
			$select.show();
			$select.change(function(){
				var value = $(this).val();
				if($(this).attr('class') == 'hour')
					home_hour = value;
				else
					home_minute = value;
				updateHomeTime();
				save();
				displayCountdown();
				$link.html(value);
				$(this).hide();
				$link.show();
			});
		});
	}

	/**
	 * persist settings to cookie
	 */
	function save(){
		createCookie('home_hour', home_hour);
		createCookie('home_minute', home_minute);
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
			displayCountdown();
			userControls();
		}

	};

})();

$(HomeTime.init);
