// Collab reel — continuous marquee, letters revealed one-by-one at the right edge
(function() {
    var collab = document.querySelector('.collab-reel');
    var track = document.querySelector('.reel-track');
    if (!collab || !track) return;

    var phrase = track.textContent.trim();
    var copies = 6;
    var gap = '   ';
    var unit = phrase + gap;

    track.innerHTML = '';
    for (var r = 0; r < copies; r++) {
        unit.split('').forEach(function(ch) {
            var s = document.createElement('span');
            s.textContent = ch === ' ' ? ' ' : ch;
            if (ch === "'") s.className = 'reel-apos';
            track.appendChild(s);
        });
    }

    var spans = Array.prototype.slice.call(track.querySelectorAll('span'));
    var speed = 0.817;
    var pos = 0;
    var singleW = 0;
    var containerRight = 0;
    var offsets = null;

    function measure() {
        track.style.transform = 'translateX(0)';
        singleW = track.scrollWidth / copies;
        var trackBCR = track.getBoundingClientRect();
        offsets = spans.map(function(s) {
            return s.getBoundingClientRect().left - trackBCR.left;
        });
        containerRight = collab.getBoundingClientRect().right;
    }

    var lastW = window.innerWidth;
    window.addEventListener('resize', function() {
        // Ignore height-only resizes (mobile URL-bar show/hide) so the reel
        // doesn't snap back to the start; only re-measure on real width changes.
        if (window.innerWidth === lastW) return;
        lastW = window.innerWidth;
        pos = 0;
        offsets = null;
    });

    function step() {
        if (!offsets) measure();

        pos -= speed;
        if (pos <= -singleW) pos += singleW;
        track.style.transform = 'translateX(' + pos.toFixed(2) + 'px)';
        // letters stay visible; the frame's overflow:hidden clips the marquee

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
})();
