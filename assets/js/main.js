/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

				// Fix.
					if (browser.name == 'ie'
					||	browser.mobile)
						$this
							.css('max-height', '10em')
							.css('overflow-y', 'auto');

			});

// Menu.
var $menu = $('#menu');

$menu.wrapInner('<div class="inner"></div>');

$menu._locked = false;

$menu._lock = function() {
    if ($menu._locked)
        return false;

    $menu._locked = true;

    window.setTimeout(function() {
        $menu._locked = false;
    }, 350);

    return true;
};

$menu._show = function() {
    if ($menu._lock())
        $body.addClass('is-menu-visible');
};

$menu._hide = function() {
    if ($menu._lock())
        $body.removeClass('is-menu-visible');
};

$menu._toggle = function() {
    if ($menu._lock())
        $body.toggleClass('is-menu-visible');
};

$menu
    .appendTo($body)
    .on('click', function(event) {
        event.stopPropagation();
    })
    .on('click', 'a', function(event) {
        var href = $(this).attr('href');

        event.preventDefault();
        event.stopPropagation();

        // Hide.
        $menu._hide();
		

        // Redirect.
        if (href == '#menu')
            return;

        window.setTimeout(function() {
            window.location.href = href;
        }, 350);
    })
    .append('<a class="close" href="#menu"><i class="fas fa-times"></i></a>');

$body
    .on('click', 'a[href="#menu"]', function(event) {
        event.stopPropagation();
        event.preventDefault();

        // Toggle.
        $menu._toggle();
    })
    .on('click', function(event) {
        // Only hide if clicking outside menu
        if (!$(event.target).closest('#menu').length) {
            $menu._hide();
        }
    })
    .on('keydown', function(event) {
        // Hide on escape.
        if (event.keyCode == 27)
            $menu._hide();
    });


// Touch: tap a tile to activate (grow + caption); tap the active tile again to
// follow its link; tap elsewhere to deactivate. Desktop keeps pure hover.
if ($body.hasClass('is-touch')) {
    $body.on('click', '.tiles article > a, .archive-tiles article > a', function(event) {
        var $art = $(this).closest('article');
        if (!$art.hasClass('is-active')) {
            event.preventDefault();
            event.stopPropagation();
            $('.tiles article, .archive-tiles article').removeClass('is-active');
            $art.addClass('is-active');
        }
        // already active → let the navigation proceed
    });
    // Tap outside any tile clears the active state.
    $body.on('click', function(event) {
        if (!$(event.target).closest('.tiles article, .archive-tiles article').length) {
            $('.tiles article, .archive-tiles article').removeClass('is-active');
        }
    });
}

// Once the navbar has collapsed to logo-only (<=540px), a tap anywhere on the
// navbar opens the popup menu (the whole bar is the trigger). Above that width
// the navbar's links — and the logo's home link — behave as usual.
(function() {
    var navMQ = window.matchMedia('(max-width: 540px)');
    $body.on('click', '#navbar', function(event) {
        if (navMQ.matches) {
            event.preventDefault();
            event.stopPropagation();
            $menu._toggle();
        }
    });
})();

// Prevent clicks on content when menu is open, but allow hover
$body.on('click', '#wrapper a, #wrapper button, #wrapper input', function(event) {
    if ($body.hasClass('is-menu-visible')) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
});


})(jQuery);