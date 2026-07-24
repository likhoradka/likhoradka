// Floating "coming soon" elements that drift gently around the cursor:
//   - menu popup chips (shop / menu) on the "coming soon" label
//   - navbar tooltip on the shop / menu nav links
// Each element is reparented to <body> so fixed positioning maps to the
// viewport and z-index clears the menu/wrapper stacking.
(function() {
    function drifter(els) {
        var cx = 0, cy = 0, active = false, raf = null;
        var P = els.map(function(el, i) {
            return { x:0, y:0, init:false, ph: Math.random()*6.283,
                     r1: 36 + i*14, r2: 20 + i*9,
                     s1: 0.00055 + i*0.00018, s2: 0.00085 + i*0.00022,
                     ease: 0.035 + i*0.006 };
        });
        function loop(t) {
            for (var i = 0; i < els.length; i++) {
                var p = P[i];
                var tx = cx + Math.cos(t*p.s1 + p.ph)*p.r1 + Math.sin(t*p.s2 + p.ph)*p.r2;
                var ty = cy + Math.sin(t*p.s1 + p.ph)*p.r1 + Math.cos(t*p.s2 + p.ph)*p.r2;
                if (!p.init) { p.x = tx; p.y = ty; p.init = true; }
                p.x += (tx - p.x) * p.ease;
                p.y += (ty - p.y) * p.ease;
                els[i].style.left = p.x + 'px';
                els[i].style.top  = p.y + 'px';
            }
            if (active) raf = requestAnimationFrame(loop);
        }
        return {
            move:  function(e){ cx = e.clientX; cy = e.clientY; },
            start: function(e){ cx = e.clientX; cy = e.clientY; active = true;
                                els.forEach(function(el){ el.classList.add('is-visible'); });
                                cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); },
            stop:  function(){ active = false;
                               els.forEach(function(el){ el.classList.remove('is-visible'); }); }
        };
    }

    // 1) Menu popup chips on the "coming soon" label
    var chips = [document.getElementById('menu-cs-shop'),
                 document.getElementById('menu-cs-menu')];
    var label = document.querySelector('.menu-cs-label');
    var menu  = document.getElementById('menu');
    if (chips[0] && chips[1] && label && menu) {
        chips.forEach(function(c){ if (c.parentNode !== document.body) document.body.appendChild(c); });
        var dc = drifter(chips);
        label.addEventListener('mouseenter', function(e){ dc.start(e); menu.addEventListener('mousemove', dc.move); });
        label.addEventListener('mouseleave', function(){ dc.stop(); menu.removeEventListener('mousemove', dc.move); });
    }

    // 2) Navbar tooltip on the shop / menu nav links
    var pop = document.getElementById('coming-soon-popup');
    var navLinks = document.querySelectorAll('#navbar a[href="shop.html"], #navbar a[href="services.html"]');
    if (pop && navLinks.length) {
        if (pop.parentNode !== document.body) document.body.appendChild(pop);
        var dp = drifter([pop]);
        navLinks.forEach(function(a){
            a.addEventListener('mouseenter', function(e){ dp.start(e); document.addEventListener('mousemove', dp.move); });
            a.addEventListener('mouseleave', function(){ dp.stop(); document.removeEventListener('mousemove', dp.move); });
        });
    }
})();
