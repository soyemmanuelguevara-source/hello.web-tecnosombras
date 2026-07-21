/* ══════════════════════════════════════════════════════════════
   TECNOSOMBRAS — MAIN.JS
   Loader, revelado por scroll, contadores, marquee, partículas,
   parallax, máquina de escribir del hero, menú móvil y WhatsApp.
   ══════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  var WA_NUMBER = '528331098740';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── WhatsApp links: build correctly-encoded hrefs from data-wa-msg ── */
  function initWhatsAppLinks(){
    var links = document.querySelectorAll('[data-wa-msg]');
    links.forEach(function(link){
      var msg = link.getAttribute('data-wa-msg') || '';
      link.setAttribute('href', 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg));
    });
  }

  /* ── Footer year ── */
  function initYear(){
    var y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
  }

  /* ══════════════════════════════════════════════════════════
     LOADER
     ══════════════════════════════════════════════════════════ */
  function initLoader(){
    var loader = document.getElementById('loader');
    var curtain = document.getElementById('loader-curtain');
    var barFill = document.querySelector('.loader-bar-fill');
    if(!loader || !curtain || !barFill){ document.body.classList.add('loaded'); return; }

    var MIN_MS = reduceMotion ? 400 : 2400;
    var startTime = performance.now();
    var progress = 0;
    var realLoaded = false;
    var finished = false;

    function tick(){
      var target = realLoaded ? 100 : 90;
      progress += (target - progress) * 0.06 + 0.2;
      if(progress > target) progress = target;
      barFill.style.width = progress + '%';
      if(progress < 99.4 && !finished){
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);

    function onReady(){
      realLoaded = true;
      var elapsed = performance.now() - startTime;
      var wait = Math.max(0, MIN_MS - elapsed);
      setTimeout(finish, wait);
    }

    function finish(){
      if(finished) return;
      finished = true;
      progress = 100;
      barFill.style.width = '100%';
      loader.classList.add('is-done');
      curtain.classList.add('curtain-go');

      setTimeout(function(){
        document.body.classList.remove('is-loading');
        document.body.classList.add('loaded');
        if(loader.parentNode) loader.parentNode.removeChild(loader);
        startHeroTypewriter();
        setTimeout(function(){ curtain.classList.add('curtain-hidden'); }, reduceMotion ? 0 : 1000);
      }, reduceMotion ? 0 : 650);
    }

    if(document.readyState === 'complete'){
      onReady();
    } else {
      window.addEventListener('load', onReady);
    }
    /* Safety net so the site never gets stuck behind the loader */
    setTimeout(function(){ if(!finished) finish(); }, 7000);
  }

  /* ══════════════════════════════════════════════════════════
     HERO TYPEWRITER + COLOR SWEEP TITLE
     ══════════════════════════════════════════════════════════ */
  function startHeroTypewriter(){
    var lines = Array.prototype.slice.call(document.querySelectorAll('.hero-title [data-line]'));
    if(!lines.length) return;

    if(reduceMotion){
      lines.forEach(function(line){ line.classList.add('type-done'); });
      return;
    }

    lines.forEach(function(line){
      var text = line.textContent;
      line.textContent = '';
      var inner = document.createElement('span');
      inner.className = 'type-inner';
      line.appendChild(inner);
      line.setAttribute('data-full-text', text);
    });

    var idx = 0;
    function typeLine(){
      if(idx >= lines.length) return;
      var line = lines[idx];
      var inner = line.querySelector('.type-inner');
      var text = line.getAttribute('data-full-text');
      var charIndex = 0;
      var speed = Math.max(22, 60 - text.length);
      line.classList.add('is-typing');

      (function step(){
        inner.textContent = text.slice(0, charIndex);
        charIndex++;
        if(charIndex <= text.length){
          setTimeout(step, speed);
        } else {
          line.classList.remove('is-typing');
          line.classList.add('type-done');
          idx++;
          setTimeout(typeLine, 200);
        }
      })();
    }
    setTimeout(typeLine, 380);
  }

  /* ══════════════════════════════════════════════════════════
     SCROLL PROGRESS BAR
     ══════════════════════════════════════════════════════════ */
  function initScrollProgress(){
    var bar = document.getElementById('scroll-progress');
    if(!bar) return;
    var ticking = false;
    function update(){
      var h = document.documentElement;
      var scrollTop = h.scrollTop || document.body.scrollTop;
      var scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      var ratio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, ratio)) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ requestAnimationFrame(update); ticking = true; }
    }, { passive:true });
    update();
  }

  /* ══════════════════════════════════════════════════════════
     NAVBAR: scrolled state + active link + back-to-top
     ══════════════════════════════════════════════════════════ */
  function initNavbar(){
    var navbar = document.getElementById('navbar');
    var backTop = document.getElementById('back-to-top');
    var ticking = false;

    function update(){
      var y = window.scrollY || document.documentElement.scrollTop;
      if(navbar) navbar.classList.toggle('scrolled', y > 40);
      if(backTop) backTop.classList.toggle('is-visible', y > 700);
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ requestAnimationFrame(update); ticking = true; }
    }, { passive:true });
    update();

    if(backTop){
      backTop.addEventListener('click', function(){
        window.scrollTo({ top:0, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    }

    /* Active link highlighting */
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
    if(navLinks.length && 'IntersectionObserver' in window){
      var map = {};
      navLinks.forEach(function(link){
        var id = link.getAttribute('href').slice(1);
        var section = document.getElementById(id);
        if(section) map[id] = link;
      });
      var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          var link = map[entry.target.id];
          if(!link) return;
          if(entry.isIntersecting){
            navLinks.forEach(function(l){ l.classList.remove('active'); });
            link.classList.add('active');
          }
        });
      }, { rootMargin:'-45% 0px -45% 0px', threshold:0 });
      Object.keys(map).forEach(function(id){ observer.observe(document.getElementById(id)); });
    }
  }

  /* ══════════════════════════════════════════════════════════
     MOBILE MENU
     ══════════════════════════════════════════════════════════ */
  function initMobileMenu(){
    var btn = document.getElementById('hamburger');
    var menu = document.getElementById('mob-menu');
    if(!btn || !menu) return;

    function close(){
      btn.classList.remove('is-open');
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    function open(){
      btn.classList.add('is-open');
      menu.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    btn.addEventListener('click', function(){
      var isOpen = menu.classList.contains('is-open');
      isOpen ? close() : open();
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', close);
    });
    window.addEventListener('keydown', function(e){
      if(e.key === 'Escape') close();
    });
  }

  /* ══════════════════════════════════════════════════════════
     REVEAL ON SCROLL
     ══════════════════════════════════════════════════════════ */
  function initReveal(){
    var items = document.querySelectorAll('.reveal');
    if(!items.length) return;

    if(!('IntersectionObserver' in window)){
      items.forEach(function(el){ el.classList.add('in-view'); });
      return;
    }
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
    items.forEach(function(el){ observer.observe(el); });
  }

  /* ══════════════════════════════════════════════════════════
     COUNTERS (stats)
     ══════════════════════════════════════════════════════════ */
  function initCounters(){
    var nums = document.querySelectorAll('.stat-num[data-count]');
    if(!nums.length) return;

    function animate(el){
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      if(reduceMotion){ el.textContent = target + suffix; return; }
      var duration = 1700;
      var startTime = null;
      function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }
      function frame(ts){
        if(startTime === null) startTime = ts;
        var progress = Math.min(1, (ts - startTime) / duration);
        var eased = easeOutCubic(progress);
        var value = Math.round(target * eased);
        el.textContent = value + suffix;
        if(progress < 1) requestAnimationFrame(frame);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(frame);
    }

    if(!('IntersectionObserver' in window)){
      nums.forEach(animate);
      return;
    }
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:0.5 });
    nums.forEach(function(el){ observer.observe(el); });
  }

  /* ══════════════════════════════════════════════════════════
     MARQUEE — duplicate content for seamless infinite loop
     ══════════════════════════════════════════════════════════ */
  function initMarquee(){
    var track = document.getElementById('marquee');
    if(!track) return;
    track.innerHTML += track.innerHTML;
  }

  /* ══════════════════════════════════════════════════════════
     PARTICLES FIELD (lightweight CSS floaters, multiple sections)
     ══════════════════════════════════════════════════════════ */
  function initParticleFields(){
    var fields = document.querySelectorAll('.particles-field');
    if(!fields.length || reduceMotion) return;

    fields.forEach(function(field){
      var count = window.innerWidth < 700 ? 7 : 14;
      for(var i = 0; i < count; i++){
        var p = document.createElement('span');
        p.className = 'particle' + (Math.random() > 0.6 ? ' p-red' : '');
        var size = 3 + Math.random() * 6;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
        var duration = 7 + Math.random() * 9;
        p.style.animationDuration = duration + 's';
        p.style.animationDelay = (Math.random() * duration) + 's';
        field.appendChild(p);
      }
    });
  }

  /* ══════════════════════════════════════════════════════════
     PARALLAX — [data-parallax] elements move on scroll
     ══════════════════════════════════════════════════════════ */
  function initParallax(){
    if(reduceMotion) return;
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if(!els.length) return;
    var ticking = false;
    var vh = window.innerHeight;

    function update(){
      vh = window.innerHeight;
      els.forEach(function(el){
        var speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.2;
        var rect = el.parentElement.getBoundingClientRect();
        var centerOffset = (rect.top + rect.height / 2) - vh / 2;
        var y = centerOffset * speed * -1;
        el.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ requestAnimationFrame(update); ticking = true; }
    }, { passive:true });
    window.addEventListener('resize', function(){
      if(!ticking){ requestAnimationFrame(update); ticking = true; }
    });
    update();
  }

  /* ══════════════════════════════════════════════════════════
     HERO CANVAS — soft drifting light orbs
     ══════════════════════════════════════════════════════════ */
  function initHeroCanvas(){
    var canvas = document.getElementById('hero-canvas');
    if(!canvas || reduceMotion) return;
    var ctx = canvas.getContext('2d');
    var hero = document.getElementById('hero');
    var orbs = [];
    var running = true;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var colors = ['rgba(240,179,28,', 'rgba(214,35,40,', 'rgba(255,255,255,'];

    function resize(){
      var rect = hero.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildOrbs(rect.width, rect.height);
    }

    function buildOrbs(w, h){
      var count = w < 700 ? 12 : 26;
      orbs = [];
      for(var i = 0; i < count; i++){
        var r = 1.2 + Math.random() * 2.4;
        orbs.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: r,
          baseR: r,
          vy: 0.12 + Math.random() * 0.22,
          vx: (Math.random() - 0.5) * 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.15 + Math.random() * 0.35,
          twinkle: Math.random() * Math.PI * 2
        });
      }
    }

    function draw(){
      if(!running) return;
      var w = canvas.width / dpr, h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      orbs.forEach(function(o){
        o.y -= o.vy;
        o.x += o.vx;
        o.twinkle += 0.02;
        if(o.y < -10){ o.y = h + 10; o.x = Math.random() * w; }
        if(o.x < -10) o.x = w + 10;
        if(o.x > w + 10) o.x = -10;
        var a = o.alpha * (0.6 + 0.4 * Math.sin(o.twinkle));
        var grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 6);
        grad.addColorStop(0, o.color + a + ')');
        grad.addColorStop(1, o.color + '0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * 6, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    resize();
    requestAnimationFrame(draw);

    var resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    });

    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        running = entries[0].isIntersecting;
        if(running) requestAnimationFrame(draw);
      });
      io.observe(hero);
    }
    document.addEventListener('visibilitychange', function(){
      running = !document.hidden;
      if(running) requestAnimationFrame(draw);
    });
  }

  /* ══════════════════════════════════════════════════════════
     CONTACT FORM → WHATSAPP
     ══════════════════════════════════════════════════════════ */
  function initContactForm(){
    var form = document.getElementById('wa-form');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(typeof form.reportValidity === 'function' && !form.reportValidity()) return;

      var name = (document.getElementById('f-name') || {}).value || '';
      var interest = (document.getElementById('f-interest') || {}).value || '';
      var msg = (document.getElementById('f-msg') || {}).value || '';

      var text = 'Hola, mi nombre es ' + name.trim() + '.' +
                  ' Me interesa: ' + interest + '.' +
                  ' Detalle del proyecto: ' + msg.trim();

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener,noreferrer');
      form.reset();
    });
  }

  /* ══════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════ */
  initWhatsAppLinks();
  initYear();
  initLoader();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initReveal();
  initCounters();
  initMarquee();
  initParticleFields();
  initParallax();
  initHeroCanvas();
  initContactForm();

})();
