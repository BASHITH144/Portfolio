/***************************************************
==================== JS INDEX ======================
****************************************************

01. Smooth Scroll Js
02. Char SplitText Js
03. Text Invart Js
04. Button Hover Js
05. Banner Title
06. Footer Title
07. Portfolio Panel Js
08. Image Cliping Effect
09. Hover Reveal
10. Tesimonial Two Shape Effect
11. Portfolio Three Effect


****************************************************/

(function ($) {
  "use strict";

  ////////////////////////////////////////////////////
  // 01. Smooth Scroll Js
  function smoothScroll() {
    $(document).on("click", 'a[href^="#"]', function (event) {
      var href = $(this).attr("href");
      if (href && href !== "#" && href !== "#0") {
        var target = $(href);
        if (target.length) {
          event.preventDefault();
          let smoother = (typeof ScrollSmoother !== "undefined") ? ScrollSmoother.get() : null;
          if (smoother) {
            smoother.scrollTo(target[0], true);
          } else if (typeof gsap !== "undefined" && gsap.plugins && gsap.plugins.scrollTo) {
            gsap.to(window, { scrollTo: { y: target[0], offsetY: 80 }, duration: 1, ease: "power2.inOut" });
          } else {
            $("html, body")
              .stop()
              .animate(
                {
                  scrollTop: target.offset().top - 80,
                },
                1000,
              );
          }
        }
      }
    });
  }
  smoothScroll();

  if ($("#smooth-wrapper").length && $("#smooth-content").length) {
    gsap.registerPlugin(
      ScrollTrigger,
      ScrollSmoother,
      ScrollToPlugin
    );
    gsap.config({
      nullTargetWarn: false,
    });
    let smoother = ScrollSmoother.create({
      smoothTouch: 0.2,
      smooth: 4,
      effects: true,
      normalizeScroll: false,
      ignoreMobileResize: true,
    });

    $(window).on("load", function () {
      ScrollTrigger.refresh();
    });
  }

  ////////////////////////////////////////////////////
  // 02. Char SplitText Js
  if ($(window).width() > 576 && $(".tw-char-animation").length > 0) {
    let char_come = gsap.utils.toArray(".tw-char-animation");
    char_come.forEach((splitTextLine) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: "top 90%",
          end: "bottom 60%",
          scrub: false,
          markers: false,
          toggleActions: "play none none none",
        },
      });
      const itemSplitted = new SplitText(splitTextLine, {
        type: "chars, words",
      });
      gsap.set(splitTextLine, {
        perspective: 300,
      });
      itemSplitted.split({
        type: "chars, words",
      });
      tl.from(itemSplitted.chars, {
        duration: 1,
        delay: 0.5,
        x: 100,
        autoAlpha: 0,
        stagger: 0.05,
      });
    });
  }

  ////////////////////////////////////////////////////
  // 03. Text Invart Js
  if ($(".tw-itm-title tw-itm-anim").length) {
    let staggerAmount = 0.03,
      translateXValue = 20,
      delayValue = 0.1,
      easeType = "power2.out",
      animatedTextElements = document.querySelectorAll(
        ".tw-itm-title tw-itm-anim",
      );

    animatedTextElements.forEach((element) => {
      let animationSplitText = new SplitText(element, { type: "chars, words" });

      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        onEnter: () => {
          gsap.from(animationSplitText.chars, {
            duration: 1,
            delay: delayValue,
            x: translateXValue,
            autoAlpha: 0,
            stagger: staggerAmount,
            ease: easeType,
          });
        },
      });
    });
  }
  if ($(".tw-sub-tilte").length) {
    var agtsub = $(".tw-sub-tilte");
    if (agtsub.length == 0) return;
    gsap.registerPlugin(SplitText);
    agtsub.each(function (index, el) {
      el.split = new SplitText(el, {
        type: "lines,words,chars",
        linesClass: "split-line",
      });
      if ($(el).hasClass("tw-sub-anim")) {
        gsap.set(el.split.chars, {
          opacity: 0,
          x: "7",
        });
      }
      el.anim = gsap.to(el.split.chars, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 60%",
          markers: false,
          scrub: 1,
        },
        x: "0",
        y: "0",
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
      });
    });
  }
  if ($(".tw-itm-title").length) {
    var txtheading = $(".tw-itm-title");
    if (txtheading.length == 0) return;
    gsap.registerPlugin(SplitText);
    txtheading.each(function (index, el) {
      el.split = new SplitText(el, {
        type: "lines,words,chars",
        linesClass: "split-line",
      });
      if ($(el).hasClass("tw-itm-anim")) {
        gsap.set(el.split.chars, {
          opacity: 0.3,
          x: "-7",
        });
      }
      el.anim = gsap.to(el.split.chars, {
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          end: "top 60%",
          markers: false,
          scrub: 1,
        },
        x: "0",
        y: "0",
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
      });
    });
  }

  ////////////////////////////////////////////////////
  // 04. Button Hover Js
  // Ensure common buttons have the hover dot injected so the GSAP animation can run
  function injectHoverDots() {
    const selectors = ['.tw-hover-btn', '.btn-download-cv', '.studio-submit-btn', '.nav-icon-btn', '.tw-btn-circle', '.about-floating-badge'];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        try {
          if (!el.classList.contains('tw-hover-btn')) el.classList.add('tw-hover-btn');
          // ensure element is positioned for absolute children
          const cs = window.getComputedStyle(el);
          if (cs.position === 'static') el.style.position = 'relative';
          if (!el.querySelector('.tw-hover-btn-circle-dot')) {
            const dot = document.createElement('span');
            dot.className = 'tw-hover-btn-circle-dot';
            dot.style.position = 'absolute';
            dot.style.width = '0px';
            dot.style.height = '0px';
            dot.style.borderRadius = '50%';
            dot.style.pointerEvents = 'none';
            el.appendChild(dot);
          }
        } catch (e) {}
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectHoverDots); else injectHoverDots();
  // Delegated hover: enter, move, leave and touch support
  $(document).on('mouseenter', '.tw-hover-btn', function (e) {
    const $btn = $(this);
    const dot = $btn.find('.tw-hover-btn-circle-dot');
    if (!dot.length) return;
    const bx = e.pageX - $btn.offset().left;
    const by = e.pageY - $btn.offset().top;
    // center the dot at cursor
    dot.css({ top: by + 'px', left: bx + 'px', transform: 'translate(-50%, -50%)' });
    // animate expansion
    try { if (dot[0]._expandTween) dot[0]._expandTween.kill(); } catch (err) {}
    dot[0]._expandTween = gsap.to(dot[0], { width: 520, height: 520, duration: 0.6, ease: 'power2.out' });
    // small variant
    const dot2 = $btn.find('.tw-btn-circle-dot');
    if (dot2.length) {
      dot2.css({ top: by + 'px', left: bx + 'px', transform: 'translate(-50%, -50%)' });
      try { if (dot2[0]._expandTween) dot2[0]._expandTween.kill(); } catch (err) {}
      dot2[0]._expandTween = gsap.to(dot2[0], { width: 120, height: 120, duration: 0.55, ease: 'power2.out' });
    }
  });

  // update position while moving inside
  $(document).on('mousemove', '.tw-hover-btn', function (e) {
    const $btn = $(this);
    const dot = $btn.find('.tw-hover-btn-circle-dot');
    if (!dot.length) return;
    const bx = e.pageX - $btn.offset().left;
    const by = e.pageY - $btn.offset().top;
    dot.css({ top: by + 'px', left: bx + 'px' });
    const dot2 = $btn.find('.tw-btn-circle-dot');
    if (dot2.length) dot2.css({ top: by + 'px', left: bx + 'px' });
  });

  // leave / touchend
  $(document).on('mouseleave touchend touchcancel', '.tw-hover-btn', function (e) {
    const $btn = $(this);
    const dot = $btn.find('.tw-hover-btn-circle-dot');
    if (!dot.length) return;
    // animate collapse
    try { if (dot[0]._expandTween) dot[0]._expandTween.kill(); } catch (err) {}
    dot[0]._expandTween = gsap.to(dot[0], { width: 0, height: 0, duration: 0.45, ease: 'power2.out' });
    const dot2 = $btn.find('.tw-btn-circle-dot');
    if (dot2.length) {
      try { if (dot2[0]._expandTween) dot2[0]._expandTween.kill(); } catch (err) {}
      dot2[0]._expandTween = gsap.to(dot2[0], { width: 0, height: 0, duration: 0.45, ease: 'power2.out' });
    }
  });
  // Use .tw-hover-btn as the hover target; prefer .tw-hover-btn-item as the movable content
  var hoverBtns = gsap.utils.toArray(".tw-hover-btn");
  const hoverBtnItem = gsap.utils.toArray(".tw-hover-btn-item");
  hoverBtns.forEach((btn, i) => {
    $(btn).mousemove(function (e) {
      callParallax(e);
    });
    function callParallax(e) {
      parallaxIt(e, hoverBtnItem[i] || btn, 60);
    }
    function parallaxIt(e, target, movement) {
      var $this = $(btn);
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;
      gsap.to(target, 1, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
        ease: Power2.easeOut,
      });
    }
    $(btn).mouseleave(function (e) {
      gsap.to(hoverBtnItem[i] || btn, 1, {
        x: 0,
        y: 0,
        ease: Power2.easeOut,
      });
    });
  });

  ////////////////////////////////////////////////////
  // 05. Banner Title
  const mm = gsap.matchMedia();
  mm.add(
    {
      desktop: "(max-width: 1920px)",
      desktop_one: "(min-width: 1700px) and (max-width: 1800px)",
      desktop_two: "((min-width: 1600px) and (max-width: 1699px))",
      desktop_three: "((min-width: 1400px) and (max-width: 1599px)",
      desktop_four: "((min-width: 1200px) and (max-width: 1399px))",
      desktop_five: "((min-width: 992px) and (max-width: 1199px))",
      desktop_six: "((min-width: 768px) and (max-width: 991px))",
      desktop_seven: "((min-width: 576px) and (max-width: 767px))",
      desktop_eight: "((min-width: 425px) and (max-width: 575px))",
      desktop_nine: "((min-width: 375px) and (max-width: 424px))",
    },
    (context) => {
      const {
        desktop,
        desktop_one,
        desktop_two,
        desktop_three,
        desktop_four,
        desktop_five,
        desktop_six,
        desktop_seven,
        desktop_eight,
        desktop_nine,
      } = context.conditions;
      if (document.querySelector(".banner-area")) {
        const isDarkMode = document.body.classList.contains("dark");
        const bigtextColor = isDarkMode ? "#FFFFFF" : "#CBFE01";
        let scaleVal, yVal, xVal;

        if (desktop) {
          scaleVal = 0.095;
          yVal = "39.5%";
          xVal = "-11.5%";
        }

        if (desktop_one) {
          scaleVal = 0.105;
          yVal = "41.5%";
          xVal = "-11.5%";
        }

        if (desktop_two) {
          scaleVal = 0.11;
          yVal = "44%";
          xVal = "-11%";
        }

        if (desktop_three) {
          scaleVal = 0.125;
          yVal = "51%";
          xVal = "-10%";
        }

        if (desktop_four) {
          scaleVal = 0.105;
          yVal = "55%";
          xVal = "-11%";
        }

        if (desktop_five) {
          scaleVal = 0.125;
          yVal = "66%";
          xVal = "-44%";
        }

        if (desktop_six) {
          scaleVal = 0.165;
          yVal = "71%";
          xVal = "-42%";
        }

        if (desktop_seven) {
          scaleVal = 0.225;
          yVal = "98%";
          xVal = "-39%";
        }

        if (desktop_eight) {
          scaleVal = 0.285;
          yVal = "119%";
          xVal = "-36%";
        }

        if (desktop_nine) {
          scaleVal = 0.305;
          yVal = "136%";
          xVal = "-35%";
        }
        const ab2 = gsap.timeline({
          duration: 5,
          scrollTrigger: {
            trigger: ".banner-area",
            scrub: 2,
            start: "top 100%",
            end: "bottom 0%",
          },
        });
        ab2.to(".big-text-wrapper .big-text", {
          scale: scaleVal,
          color: bigtextColor,
          duration: 2,
          y: yVal,
          x: xVal,
          transformOrigin: "bottom center",
        });
      }
    },
  );

  ////////////////////////////////////////////////////
  // 06. Footer Title
  if ($(".animated-title").length > 0) {
    let cta = gsap.timeline({
      repeat: -1,
      delay: 0.5,
      scrollTrigger: {
        trigger: ".animated-title",
        start: "bottom 100%-=50px",
      },
    });
    gsap.set(".animated-title", {
      opacity: 0,
    });
    gsap.to(".animated-title", {
      opacity: 1,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".animated-title",
        start: "bottom 100%-=50px",
        once: true,
      },
    });
    let mySplitText = new SplitText(".animated-title", { type: "words,chars" });
    let chars = mySplitText.chars;
    let endGradient = chroma.scale([
      "#ffff",
      "#ffff",
      "#ffff",
      "#ffff",
      "#ffff",
    ]);
    cta.to(chars, {
      duration: 0.5,
      scaleY: 0.6,
      ease: "power1.out",
      stagger: 0.04,
      transformOrigin: "center bottom",
    });
    cta.to(
      chars,
      {
        yPercent: -10,
        ease: "elastic",
        stagger: 0.03,
        duration: 0.8,
      },
      0.5,
    );
    cta.to(
      chars,
      {
        scaleY: 1,
        ease: "elastic.out",
        stagger: 0.03,
        duration: 1.5,
      },
      0.5,
    );
    cta.to(
      chars,
      {
        color: (i, el, arr) => {
          return endGradient(i / arr.length).hex();
        },
        ease: "power1.out",
        stagger: 0.03,
        duration: 0.3,
      },
      0.5,
    );
    cta.to(
      chars,
      {
        yPercent: 0,
        ease: "back",
        stagger: 0.03,
        duration: 0.8,
      },
      0.7,
    );
    cta.to(chars, {
      color: "#ffff",
      duration: 1.4,
      stagger: 0.05,
    });
  }

  ////////////////////////////////////////////////////
  // 07. Portfolio Panel Js
  let otherSections = document.querySelectorAll(".portfolio-panel");
  gsap.set(otherSections, {
    scale: 1,
  });
  otherSections.forEach((section) => {
    gsap.to(section, {
      scale: 0.8,
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top 20%",
        end: "bottom 100%",
        endTrigger: ".portfolio-panel-area",
        pinSpacing: false,
        markers: false,
      },
    });
  });

  ///////////////////////
  // 08. Image Cliping Effect
  document.addEventListener("DOMContentLoaded", () => {
    const initialClipPaths = [
      "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
      "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
      "polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
      "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
      "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
      "polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
      "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
      "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
      "polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)",
    ];
    const finalClipPaths = [
      "polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)",
      "polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)",
      "polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)",
      "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
      "polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
      "polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)",
      "polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
      "polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)",
      "polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)",
    ];
    // Create mask divs for each wrapper
    document.querySelectorAll(".tw-clip-anim").forEach((wrapper) => {
      const img = wrapper.querySelector(".tw-anim-img[data-animate='true']");
      if (!img) return;
      const url = img.src;
      // Remove old masks if any (reuse safe)
      wrapper.querySelectorAll(".mask").forEach((m) => m.remove());
      for (let i = 0; i < 9; i++) {
        const mask = document.createElement("div");
        mask.className = `mask mask-${i + 1}`;
        Object.assign(mask.style, {
          backgroundImage: `url(${url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
          inset: "0",
        });
        wrapper.appendChild(mask);
      }
    });
    // Animate masks
    gsap.utils.toArray(".tw-clip-anim").forEach((wrapper) => {
      const masks = wrapper.querySelectorAll(".mask");
      if (!masks.length) return;
      gsap.set(masks, { clipPath: (i) => initialClipPaths[i] });
      const order = [
        [".mask-1"],
        [".mask-2", ".mask-4"],
        [".mask-3", ".mask-5", ".mask-7"],
        [".mask-6", ".mask-8"],
        [".mask-9"],
      ];
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapper, start: "top 75%" },
      });
      order.forEach((targets, i) => {
        const validTargets = targets
          .map((c) => wrapper.querySelector(c))
          .filter((el) => el); // filter out nulls

        if (validTargets.length) {
          tl.to(
            validTargets,
            {
              clipPath: (j, el) =>
                finalClipPaths[Array.from(masks).indexOf(el)],
              duration: 1,
              ease: "power4.out",
              stagger: 0.1,
            },
            i * 0.125,
          );
        }
      });
    });
  });

  ///////////////////////
  // 09. Hover Reveal
  const hoverItem = document.querySelectorAll(".hover__reveal-item");
  function moveImage(e, hoverItem, index) {
    const item = hoverItem.getBoundingClientRect();
    const x = e.clientX - item.x;
    const y = e.clientY - item.y;
    if (hoverItem.children[index]) {
      hoverItem.children[index].style.transform = `translate(${x}px, ${y}px)`;
    }
  }
  hoverItem.forEach((item, i) => {
    item.addEventListener("mousemove", (e) => {
      setInterval(moveImage(e, item, 1), 50);
    });
  });

  ///////////////////////
  // 10. Tesimonial Two child (2) Effect
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.matchMedia({
    // only run on 1200px and above
    "(min-width: 1199px)": function () {
      gsap.fromTo(
        ".testimonial-two-main .testimonial-wrapper:nth-child(2)",
        {
          y: 300,
        },
        {
          y: 0,
          ease: "power9.out",
          scrollTrigger: {
            trigger: ".testimonial-two-main",
            start: "top 80%",
            end: "top 40%",
            scrub: 5.5, // рџ‘€ add smooth transition delay
            markers: false,
          },
        },
      );
    },
    // below 1199px в†’ do nothing (animation OFF)
    "(max-width: 1198px)": function () {
      // optional cleanup if needed
    },
  });

  ///////////////////////
  // 10. Tesimonial Two Shape Effect
  let nn = gsap.matchMedia();
  nn.add("(min-width: 1199px)", () => {
    gsap.fromTo(
      ".testimonial-two-shape",
      { y: "0%" },
      {
        y: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".testimonial-two-shape",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      },
    );
  });

  ///////////////////////
  // 11. Portfolio Three Effect
  gsap.to(".portfolio-three-shape", {
    scrollTrigger: {
      trigger: ".portfolio-three-area",
      start: "top center-=200",
      pin: ".portfolio-three-shape",
      end: "bottom bottom-=200",
      markers: false,
      pinSpacing: false,
      scrub: 1,
    },
  });

  ///////////////////////
  // 12. Project Cards JOURNEY Storytelling GSAP Master Animations
  if (document.querySelectorAll("#projects").length > 0 && typeof gsap !== "undefined") {
    // Single clean viewport reveal for zigzag items
    const projectItems = document.querySelectorAll("#projects .project-zigzag-item");
    if (projectItems.length > 0) {
      gsap.fromTo(
        projectItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects-zigzag-timeline",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Add image hover pan: map cursor Y to image translate
      gsap.utils.toArray('#projects .project-card-thumb').forEach((thumb) => {
        const img = thumb.querySelector('img');
        if (!img) return;
        // ensure image has will-change for smoothness
        img.style.willChange = 'transform';

        let tween = null;
        let scrollTween = null;

        thumb.addEventListener('mouseenter', () => {
          // debug
          try { console.log('project-thumb mouseenter', thumb); } catch(e){}
          // start a slow smooth scroll to page bottom while cursor is over the thumbnail
          // Use GSAP ScrollTo only when plugin is present; otherwise use incremental fallback
          const hasScrollTo = typeof ScrollToPlugin !== 'undefined' || (gsap && gsap.plugins && gsap.plugins.scrollTo);
          if (scrollTween) { try { scrollTween.kill(); } catch(e){}; scrollTween = null; }
          if (hasScrollTo && typeof gsap !== 'undefined' && gsap.to) {
            // use GSAP ScrollTo
            try {
              scrollTween = gsap.to(window, { scrollTo: { y: document.body.scrollHeight }, duration: 20, ease: 'linear' });
            } catch (err) {
              // plugin missing or error — fallback below
            }
          }
          // fallback: if scrollTween not started, use interval
          if (!scrollTween) {
            const intervalId = setInterval(() => {
              const atBottom = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2;
              if (!atBottom) window.scrollBy(0, 1);
              else clearInterval(intervalId);
            }, 16);
            thumb._autoScrollInterval = intervalId;
          }
        });

        thumb.addEventListener('mousemove', (e) => {
          const rect = thumb.getBoundingClientRect();
          const y = e.clientY - rect.top;
          const ratio = Math.max(0, Math.min(1, y / rect.height));
          // map ratio [0,1] to translateY [-10%,10%]
          const translateY = (ratio - 0.5) * 20;
          if (tween) tween.kill();
          tween = gsap.to(img, { y: `${translateY}%`, duration: 0.45, ease: 'power2.out' });
        });

        thumb.addEventListener('mouseleave', () => {
          if (tween) tween.kill();
          gsap.to(img, { y: '0%', duration: 0.6, ease: 'power2.out' });
          if (scrollTween) { scrollTween.kill(); scrollTween = null; }
        });
      });
    }
  }

  // Dynamic render from JSON data (if present)
  async function renderProjectsFromJSON() {
    const container = document.querySelector('.projects-zigzag-timeline');
    if (!container) return;
    try {
      // Prefer inline JSON (useful when opening the page via file://)
      const inlineEl = document.getElementById('projects-data');
      let data = null;
      if (inlineEl && inlineEl.textContent && inlineEl.textContent.trim().length > 0) {
        try {
          const parsed = JSON.parse(inlineEl.textContent);
          // support both {projects:[]} and []
          data = Array.isArray(parsed) ? parsed : parsed.projects || [];
        } catch (e) {
          console.warn('projects-data inline JSON parse failed', e);
        }
      }
      if (!data && window.siteContent && Array.isArray(window.siteContent.projects) && window.siteContent.projects.length > 0) {
        data = window.siteContent.projects;
      }
      if (!data) {
        const resp = await fetch('assets/data/site-content.json?' + new Date().getTime());
        if (!resp.ok) return;
        const siteData = await resp.json();
        data = Array.isArray(siteData) ? siteData : (siteData.projects || []);
      }
      console.debug('renderProjectsFromJSON: loaded data count', Array.isArray(data) ? data.length : (data.projects || []).length);
      // Remove existing hard-coded items (keep journey-bg-shape)
      const bg = container.querySelector('.journey-bg-shape');
      container.innerHTML = '';
      if (bg) container.appendChild(bg);
      data.forEach((p, i) => {
        const side = i % 2 === 0 ? 'left-card' : 'right-card';
        const art = document.createElement('article');
        art.className = `project-zigzag-item ${side}`;
        const imgSrc = p.image ? p.image.replace(/ /g, '%20') : 'assets/images/thumbs/portfolio-three-thumb1.png';
        art.innerHTML = `
          <div class="project-card-inner ${side === 'right-card' ? 'reverse' : ''}">
            <div class="project-card-content">
              <div class="project-card-header">
                <span class="project-number">${String(p.id).padStart(2,'0')}</span>
                <span class="project-number-line"></span>
              </div>
              <h3 class="project-title"><a href="${p.live_url || '#'}" target="_blank">${p.title} <span class="title-arrow-icon">↗</span></a></h3>
              <p class="project-description">${p.summary}</p>
              <div class="project-tags">${(p.tags||[]).map(t=>`<span class="project-tag">${t}</span>`).join('')}</div>
              <div class="project-info-chips">
                ${(p.repo_url?`<a class="project-chip" href="${p.repo_url}" target="_blank"><i class="ph ph-github-logo"></i> GitHub</a>`:'')}
                ${(p.live_url?`<a class="project-chip" href="${p.live_url}" target="_blank"><i class="ph ph-arrow-up-right"></i> Live</a>`:'')}
                <span class="project-chip project-chip-status">${p.year_or_status || ''}</span>
              </div>
            </div>
            <div class="project-card-thumb">
              <img src="${imgSrc}" alt="${p.title}" />
            </div>
          </div>
        `;
        container.appendChild(art);
        try { console.debug('renderProjectsFromJSON: appended project', p.slug || p.title); } catch(e){}
      });
      // Initialize reveal animation and hover-pan for newly created items
      const projectItems = document.querySelectorAll("#projects .project-zigzag-item");
      console.debug('initialize projectItems count', projectItems.length);
      if (projectItems.length > 0) {
        gsap.fromTo(
          projectItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".projects-zigzag-timeline",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );

        const thumbs = gsap.utils.toArray('#projects .project-card-thumb');
        console.debug('attaching thumbnail handlers count', thumbs.length);
        thumbs.forEach((thumb) => {
          const img = thumb.querySelector('img');
          if (!img) return;
          try { console.debug('attaching handler for thumb img', img.src); } catch(e){}
          img.style.willChange = 'transform';
          let tween = null;
          let scrollTween = null;
          thumb.addEventListener('mousemove', (e) => {
            const rect = thumb.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const ratio = Math.max(0, Math.min(1, y / rect.height));
            const translateY = (ratio - 0.5) * 20;
            if (tween) tween.kill();
            tween = gsap.to(img, { y: `${translateY}%`, duration: 0.45, ease: 'power2.out' });
          });
          thumb.addEventListener('mouseleave', () => {
            try { if (tween) tween.kill(); } catch(e){}
            try { gsap.to(img, { y: '0%', duration: 0.6, ease: 'power2.out' }); } catch(e){}
            try { if (scrollTween) { scrollTween.kill(); scrollTween = null; } } catch(e){}
            try { if (thumb._autoScrollInterval) { clearInterval(thumb._autoScrollInterval); thumb._autoScrollInterval = null; } } catch(e){}
            try { console.log('project-thumb mouseleave', thumb); } catch(e){}
          });
        });
      }
      // re-run animations for newly added items
      ScrollTrigger.refresh();
    } catch (e) {
      console.warn('Could not load projects.json', e);
    }
  }

  ////////////////////////////////////////////////////
  // Dynamic Site Content Loader from assets/data/site-content.json
  async function loadSiteContentFromJSON() {
    try {
      const response = await fetch("assets/data/site-content.json?" + new Date().getTime());
      if (!response.ok) return;
      const data = await response.json();
      window.siteContent = data;

      // 1. Header
      if (data.header) {
        const brandName = document.querySelector(".brand-pill-name");
        if (brandName && data.header.name) brandName.textContent = data.header.name;
        const brandBadge = document.querySelector(".brand-pill-badge");
        if (brandBadge && data.header.badge) brandBadge.textContent = data.header.badge;
        const downloadBtn = document.querySelector(".btn-download-cv");
        if (downloadBtn) {
          if (data.header.resume_url) downloadBtn.href = data.header.resume_url;
          const span = downloadBtn.querySelector("span");
          if (span && data.header.download_btn_text) span.textContent = data.header.download_btn_text;
        }
      }

      // 2. Hero
      if (data.hero) {
        const mainStatement = document.querySelector(".hero-card-left-title");
        if (mainStatement && data.hero.main_statement) mainStatement.textContent = data.hero.main_statement;

        if (Array.isArray(data.hero.skills_list)) {
          const skillsUl = document.querySelector(".hero-skill-list");
          if (skillsUl) {
            const lis = skillsUl.querySelectorAll("li span");
            data.hero.skills_list.forEach((text, i) => {
              if (lis[i]) lis[i].textContent = text;
            });
          }
        }

        if (Array.isArray(data.hero.metrics)) {
          const metricCards = document.querySelectorAll(".metric-card-item");
          data.hero.metrics.forEach((metric, i) => {
            if (metricCards[i]) {
              const counter = metricCards[i].querySelector(".gsap-metric-counter");
              if (counter && metric.num) {
                counter.setAttribute("data-counter-end", metric.num);
                counter.textContent = metric.num;
              }
              const numSpan = metricCards[i].querySelector(".metric-num");
              if (numSpan && metric.suffix !== undefined && counter) {
                numSpan.innerHTML = '';
                numSpan.appendChild(counter);
                numSpan.appendChild(document.createTextNode(metric.suffix));
              }
              const label = metricCards[i].querySelector(".metric-label");
              if (label && metric.label) label.textContent = metric.label;
            }
          });
        }
      }

      // 3. About
      if (data.about) {
        const aboutTitle = document.querySelector(".about-three-title");
        if (aboutTitle && data.about.title) aboutTitle.textContent = data.about.title;

        const paragraphs = document.querySelectorAll(".about-text-paragraph");
        if (paragraphs[0] && data.about.paragraph1) paragraphs[0].textContent = data.about.paragraph1;
        if (paragraphs[1] && data.about.paragraph2) paragraphs[1].textContent = data.about.paragraph2;
        if (paragraphs[2] && data.about.paragraph3) paragraphs[2].textContent = data.about.paragraph3;

        const badgeInner = document.querySelector(".about-badge-inner");
        if (badgeInner && data.about.floating_badge_num) {
          badgeInner.innerHTML = `${data.about.floating_badge_num}<span class="about-badge-plus">${data.about.floating_badge_suffix || '+'}</span>`;
        }
      }

      // 4. Services
      if (data.services) {
        const badge = document.querySelector(".studio-badge-pill");
        if (badge && data.services.badge) {
          badge.innerHTML = `<i class="ph ph-lightning"></i> ${data.services.badge}`;
        }
        const title = document.querySelector(".studio-section-title");
        if (title && data.services.title) title.textContent = data.services.title;
        const desc = document.querySelector(".studio-section-desc");
        if (desc && data.services.description) desc.textContent = data.services.description;

        if (Array.isArray(data.services.items)) {
          const cards = document.querySelectorAll(".studio-service-card");
          data.services.items.forEach((item, i) => {
            if (cards[i]) {
              const numEl = cards[i].querySelector(".studio-service-num");
              if (numEl && item.num) numEl.textContent = item.num;
              const titleEl = cards[i].querySelector(".studio-service-title");
              if (titleEl && item.title) titleEl.textContent = item.title;
              const descEl = cards[i].querySelector(".studio-service-desc");
              if (descEl && item.desc) descEl.textContent = item.desc;
            }
          });
        }
      }

      // 5. Contact / Footer
      if (data.contact) {
        const heading = document.querySelector(".footer-three-top-left h2");
        if (heading && data.contact.heading) heading.textContent = data.contact.heading;

        const nameEl = document.querySelector(".footer-three-top-content h3");
        if (nameEl && data.contact.name) nameEl.textContent = data.contact.name;

        const roleEl = document.querySelector(".footer-three-top-content p.opacity-80");
        if (roleEl && data.contact.role) roleEl.textContent = data.contact.role;

        const contactLinks = document.querySelectorAll(".contact-info-list a.contact-card-item");
        if (contactLinks[0] && data.contact.email) {
          contactLinks[0].href = `mailto:${data.contact.email}`;
          const span = contactLinks[0].querySelector("span");
          if (span) span.textContent = data.contact.email;
        }
        if (contactLinks[1] && data.contact.phone) {
          contactLinks[1].href = `tel:${data.contact.phone.replace(/[^0-9+]/g, '')}`;
          const span = contactLinks[1].querySelector("span");
          if (span) span.textContent = data.contact.phone;
        }
      }

      // 6. Generic data-content attribute support
      document.querySelectorAll("[data-content]").forEach(el => {
        const path = el.getAttribute("data-content");
        const val = path.split('.').reduce((acc, part) => acc && acc[part], data);
        if (val !== undefined && val !== null) {
          el.textContent = val;
        }
      });

      // Re-init hero animation if site-content has identity_titles
      if (typeof initHeroIdentityAnimation === "function" && document.getElementById("heroIdentityContainer")) {
        const cont = document.getElementById("heroIdentityContainer");
        cont.innerHTML = "";
        initHeroIdentityAnimation();
      }

      // Re-render projects if site-content has projects
      if (Array.isArray(data.projects) && typeof renderProjectsFromJSON === "function") {
        renderProjectsFromJSON();
      }

      // 7. Certificates — dynamically render from site-content.json
      if (Array.isArray(data.certificates) && data.certificates.length > 0) {
        const grid = document.querySelector(".cert-courses-grid");
        if (grid) {
          grid.innerHTML = "";
          data.certificates.forEach(cert => {
            const iconClass = cert.icon || "ph ph-certificate";
            const iconStyle = cert.icon_style ? ` ${cert.icon_style}` : "";
            const fileUrl = cert.file || "#";
            const card = document.createElement("div");
            card.className = "cert-course-card";
            card.setAttribute("data-aos", "fade-up");
            card.setAttribute("data-aos-duration", "800");
            card.innerHTML = `
              <div class="cert-course-icon-wrap${iconStyle}">
                <i class="${iconClass}"></i>
              </div>
              <div class="cert-course-body">
                <span class="cert-course-issuer">${cert.issuer || ""}</span>
                <h3 class="cert-course-title">${cert.title || ""}</h3>
                <p class="cert-course-desc">${cert.description || ""}</p>
              </div>
              <div class="cert-course-footer">
                <a class="cert-course-btn" href="${fileUrl}" target="_blank" rel="noopener noreferrer">
                  <i class="ph ph-eye"></i> View Certificate
                </a>
                <a class="cert-course-btn cert-course-btn-dl" href="${fileUrl}" download>
                  <i class="ph ph-download-simple"></i>
                </a>
              </div>`;
            grid.appendChild(card);
          });
          // Refresh AOS for newly added elements
          if (typeof AOS !== "undefined") AOS.refresh();
        }
      }
    } catch (e) {
      console.warn("Could not load site-content.json:", e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      loadSiteContentFromJSON();
      renderProjectsFromJSON();
    });
  } else {
    loadSiteContentFromJSON();
    renderProjectsFromJSON();
  }

  ////////////////////////////////////////////////////
  // Dynamic Hero Identity Typography Animation System (replaced per user request)
  function initHeroIdentityAnimation() {
    try { console.debug('initHeroIdentityAnimation: start'); } catch(e){}
    const container = document.getElementById("heroIdentityContainer");
    const bgWrapper = document.getElementById("heroIdentityBg");
    const heroSection = document.querySelector(".banner-three-area");
    if (!container) return;

    const identityTitles = (window.siteContent && window.siteContent.hero && Array.isArray(window.siteContent.hero.identity_titles) && window.siteContent.hero.identity_titles.length > 0)
      ? window.siteContent.hero.identity_titles
      : [
          "WEB DEVELOPER",
          "FRONT-END DEVELOPER",
          "WORDPRESS DEVELOPER",
          "SOFTWARE ENGINEER",
          "AUTOMATION BUILDER"
        ];

    let currentIndex = 0;
    let isAnimating = false;

    function getFontSizeForText(text) {
      const len = text.length;
      if (len > 16) {
        return "clamp(40px, 6.5vw, 180px)";
      } else if (len > 12) {
        return "clamp(55px, 8.5vw, 230px)";
      } else {
        return "clamp(75px, 11vw, 280px)";
      }
    }

    function createWordElement(text) {
      const wordDiv = document.createElement("div");
      wordDiv.className = "identity-word";
      wordDiv.style.fontSize = getFontSizeForText(text);

      const characters = text.split("");
      characters.forEach((char) => {
        if (char === " ") {
          const spaceSpan = document.createElement("span");
          spaceSpan.className = "identity-space";
          spaceSpan.innerHTML = "&nbsp;";
          wordDiv.appendChild(spaceSpan);
        } else {
          const charWrap = document.createElement("span");
          charWrap.className = "identity-char-wrap";

          const charSpan = document.createElement("span");
          charSpan.className = "identity-char";
          charSpan.textContent = char;

          charWrap.appendChild(charSpan);
          wordDiv.appendChild(charWrap);
        }
      });

      return wordDiv;
    }

    // Add the initial word element
    let currentWordElem = createWordElement(identityTitles[currentIndex]);
    container.appendChild(currentWordElem);

    // Initial page-load reveal
    const initialChars = currentWordElem.querySelectorAll('.identity-char');
    gsap.fromTo(
      initialChars,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 1.0, ease: 'power4.out', stagger: 0.02 }
    );

    function transitionToNextWord() {
      if (isAnimating) return;
      isAnimating = true;

      const nextIndex = (currentIndex + 1) % identityTitles.length;
      const nextWordElem = createWordElement(identityTitles[nextIndex]);
      container.appendChild(nextWordElem);

      const outgoingChars = currentWordElem.querySelectorAll('.identity-char');
      const incomingChars = nextWordElem.querySelectorAll('.identity-char');

      gsap.set(incomingChars, { opacity: 0, scale: 0.98 });

      const tl = gsap.timeline({
        onComplete: () => {
          if (currentWordElem && currentWordElem.parentNode) currentWordElem.parentNode.removeChild(currentWordElem);
          currentWordElem = nextWordElem;
          currentIndex = nextIndex;
          isAnimating = false;
          gsap.delayedCall(3.5, transitionToNextWord);
        }
      });

      tl.to(outgoingChars, { opacity: 0, scale: 1.01, duration: 0.8, ease: 'power4.out', stagger: 0.02 }, 0);
      tl.to(incomingChars, { opacity: 1, scale: 1, duration: 0.8, ease: 'power4.out', stagger: 0.02 }, 0);
    }

    gsap.delayedCall(3.5, transitionToNextWord);

    // Subtle parallax interaction limited to a few pixels
    if (heroSection && bgWrapper) {
      const xTo = gsap.quickTo(bgWrapper, 'x', { duration: 0.8, ease: 'power2.out' });
      const yTo = gsap.quickTo(bgWrapper, 'y', { duration: 0.8, ease: 'power2.out' });

      window.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normX = (e.clientX - centerX) / (rect.width / 2);
        const normY = (e.clientY - centerY) / (rect.height / 2);
        const targetX = Math.max(-4, Math.min(4, normX * 4));
        const targetY = Math.max(-2, Math.min(2, normY * 2));
        xTo(targetX);
        yTo(targetY);
      });
    }
  }

  // Initialize Hero Identity Animation & Portfolio Navigation
  function runAllInitFunctions() {
    const fnList = [
      initHeroIdentityAnimation,
      initCertificatesScrollReveal,
      initPortfolioNav,
      initThemeScrollTransition,
      initHeroCardCounters,
      initStatsStripCounters
    ];
    fnList.forEach((fn) => {
      try {
        if (typeof fn === "function") fn();
      } catch (e) {
        console.error("Error initializing GSAP function:", e);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runAllInitFunctions);
  } else {
    runAllInitFunctions();
  }

  ////////////////////////////////////////////////////
  // Portfolio Offcanvas Navigation, Smooth Scroll & Scrollspy
  function initPortfolioNav() {
    // Delegated click handler for menu links
    $(document).on("click", ".tw-main-menu-content a[href^='#'], .tw-main-menu-mobile a[href^='#']", function (e) {
      const targetId = $(this).attr("href");
      if (targetId && targetId.startsWith("#") && targetId.length > 1) {
        e.preventDefault();
        const $target = $(targetId);
        if ($target.length) {
          // Auto Close Offcanvas Menu
          $(".tw-offcanvas-2-area").removeClass("opened");
          $(".body-overlay").removeClass("opened");
          setTimeout(() => {
            $(".tw-text-hover-effect-word").removeClass("animated-text");
          }, 500);

          // Smooth Scroll
          $("html, body").animate(
            {
              scrollTop: $target.offset().top - 40
            },
            600
          );
        }
      }
    });

    // Active Menu Scrollspy Highlight
    function updateActiveNav() {
      const scrollPos = $(window).scrollTop() + 200;
      const navOrder = ["#contact", "#certificates", "#projects", "#about", "#home"];
      let activeId = "";

      for (let i = 0; i < navOrder.length; i++) {
        const id = navOrder[i];
        const $sec = $(id);
        if ($sec.length) {
          const top = $sec.offset().top - 150;
          const height = $sec.outerHeight();
          if (scrollPos >= top && scrollPos < top + height) {
            activeId = id;
            break;
          }
        }
      }

      if (!activeId && $(window).scrollTop() < 300) {
        activeId = "#home";
      }

      $(".tw-main-menu-content a, .tw-main-menu-mobile a").each(function () {
        const href = $(this).attr("href");
        if (href === activeId) {
          $(this).addClass("active-nav-item").css("color", "#CBFE01");
        } else if (href && href.startsWith("#")) {
          $(this).removeClass("active-nav-item").css("color", "");
        }
      });
    }

    $(window).on("scroll", updateActiveNav);
    updateActiveNav();
  }

  ////////////////////////////////////////////////////
  // Certificates & Achievements Scroll Reveal (0.8s, TranslateY: 50px -> 0, Stagger: 0.12s, Ease: power3.out)
  function initCertificatesScrollReveal() {
    const certItems = document.querySelectorAll(".cert-item");
    if (!certItems.length || typeof gsap === "undefined") return;

    gsap.fromTo(
      certItems,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".certificates-timeline-wrapper",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }

  ////////////////////////////////////////////////////
  // Scroll Theme Transition Animation (White Theme to Black Theme)
  function initThemeScrollTransition() {
    const skillsSec = document.querySelector(".studio-skills-section");
    if (!skillsSec || typeof ScrollTrigger === "undefined") return;

    // Toggle dark mode class on body when scrolled into dark theme sections
    ScrollTrigger.create({
      trigger: skillsSec,
      start: "top 65%",
      onEnter: () => document.body.classList.add("is-dark-theme-active"),
      onLeaveBack: () => document.body.classList.remove("is-dark-theme-active")
    });
  }

  ////////////////////////////////////////////////////
  // Hero Metric Cards Number Increment / Counting Effect
  function initHeroCardCounters() {
    const counters = document.querySelectorAll(".gsap-metric-counter");
    if (!counters.length || typeof gsap === "undefined") return;

    const startCounters = () => {
      counters.forEach((el, index) => {
        const endVal = parseInt(el.getAttribute("data-counter-end") || el.innerText, 10);
        if (isNaN(endVal)) return;

        // Custom duration and easing based on value size so small numbers (1, 3) also animate visibly
        const duration = endVal <= 3 ? 1.0 : parseFloat(el.getAttribute("data-counter-duration") || "2.0");
        const easeType = endVal <= 3 ? "none" : "power2.out";

        let counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: endVal,
          duration: duration,
          delay: 0.15 + index * 0.15,
          ease: easeType,
          onUpdate: () => {
            const current = endVal <= 3 ? Math.floor(counterObj.val + 0.01) : Math.round(counterObj.val);
            el.innerText = Math.min(current, endVal);
          },
          onComplete: () => {
            el.innerText = endVal;
            // Pop glow effect when counting finishes
            gsap.fromTo(
              el,
              { scale: 1.25, color: "#CBFE01", display: "inline-block" },
              { scale: 1, color: "", duration: 0.4, ease: "back.out(2)" }
            );
          }
        });
      });
    };

    // Use IntersectionObserver so the animation always triggers when the card stack is actually seen
    const stack = document.querySelector(".hero-card-stack-right");
    if (stack && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startCounters();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(stack);
    } else {
      startCounters();
    }
  }

  ////////////////////////////////////////////////////
  // Stats Strip Decimal Counter Animation (4.78 / 5 and 1.15K+)
  function initStatsStripCounters() {
    const decCounters = document.querySelectorAll(".gsap-decimal-counter");
    if (!decCounters.length || typeof gsap === "undefined") return;

    const startDecCounters = () => {
      decCounters.forEach((el, index) => {
        const endVal = parseFloat(el.getAttribute("data-counter-end") || "0");
        const decimals = parseInt(el.getAttribute("data-counter-decimals") || "2", 10);
        if (isNaN(endVal)) return;

        let counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: endVal,
          duration: parseFloat(el.getAttribute("data-counter-duration") || "2.0"),
          delay: 0.1 + index * 0.2,
          ease: "power2.out",
          onUpdate: () => {
            el.innerText = counterObj.val.toFixed(decimals);
          },
          onComplete: () => {
            el.innerText = endVal.toFixed(decimals);
            gsap.fromTo(
              el,
              { scale: 1.25, color: "#CBFE01", display: "inline-block" },
              { scale: 1, color: "", duration: 0.4, ease: "back.out(2)" }
            );
          }
        });
      });
    };

    const strip = document.querySelector(".stats-strip-row");
    if (strip && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startDecCounters();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(strip);
    } else {
      startDecCounters();
    }
  }

})(jQuery);

