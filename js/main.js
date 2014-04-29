$(document).ready(function(){

	// Backstretch Doku: https://github.com/srobbin/jquery-backstretch

	$.backstretch(
		"/img/alexander-frede.jpg",
		{
			centeredX: false,
			centeredY: false,
			fade: 1000,
		}
	);

	$('a[title]').each(function() {
		var $this, delay, title, defaults;
		$this = $(this);
		title = $this.attr('title') ? $this.attr('title') : false;
        defaults = {
            duration_in: '100', // standard fade-in verzögerung
            duration_out: '50' // standard fade-out verzögerung
        }
		if (title) {
			delay = $this.data('delay') ? $this.data('delay').toString().split('|') : [defaults.duration_in];
			delay = delay && delay.length === 2 ? delay : [delay[0], defaults.duration_out];
			delay = {
				show: parseInt(delay[0].trim()),
				hide: parseInt(delay[1].trim())
			};
			$this.removeAttr('title');
			$this.tooltip({
				html: true,
				delay: delay,
				title: title.replace(/\/\//g, '<br>'),

			});
		}
	});

});
