(function($) {
  'use strict';

  /*--------------------------------
   Start Preloader Animation
  ----------------------------------*/
  $(window).on('load', function() {
    $('.preloader').fadeOut(100);

    baguetteBox.run('.grid-gallery', {
      animation: 'slideIn'
    });

    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();

    init();
  });

  /*--------------------------------
      End Preloader Animation
    ----------------------------------*/

  // -----------------------------
  //  Count Up
  // -----------------------------
  function counter() {
    var oTop;
    if ($('.count').length !== 0) {
      oTop = $('.count').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.count').each(function() {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 1000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
          }
        });
      });
    }
  }
  // -----------------------------
  //  On Scroll
  // -----------------------------
  $(window).on('scroll', function() {
    counter();
  });



  /*--------------------------------
   Start Smooth Scrolling
  ----------------------------------*/
  function smoothScroll() {
    // Select all links with hashes
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .on("click", function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, "easeInOutExpo", function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            });
          }
        }
      });
    jQuery.extend(jQuery.easing, {
      easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    });
  }
  // Applying Smooth Scroll When The Browser Is Not Opera Mini Or UC Browser
  if (navigator.userAgent.indexOf('Opera Mini') == -1 || navigator.userAgent.indexOf('UCBrowser') != -1) {
    smoothScroll();
  }
  /*--------------------------------
      End Smooth Scrolling
  ----------------------------------*/

  /*--------------------------------
   Start Header
    ----------------------------------*/
  // Initiating Background Slider
  var backgroundSlide = $('#background-slide');
  backgroundSlide.owlCarousel({
    loop: true,
    items: 1,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    animateOut: 'fadeOut'
  });
  $('.slider-prev-button').on("click", function() {
    backgroundSlide.trigger('prev.owl.carousel');
  });
  $('.slider-next-button').on("click", function() {
    backgroundSlide.trigger('next.owl.carousel');
  });
  // Setting Up Background Images
  function SliderBackground() {
    if ($(".owl-full-width .slider").length) {
      $(".owl-full-width .slider").each(function() {
        var $this = $(this);
        var img = $this.children(img);
        var imgSrc = img.attr("src");
        $this.css({
          backgroundImage: "url(" + imgSrc + ")",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        });
      });
    }
  }
  // Initializing Background Setting Function
  SliderBackground();
  // Toggle Fullscreen Navigation
  $('#burger').on("click", function() {
    $(".fullscreen-nav-container").slideToggle(300);
  });
  $(".fullscreen-nav-holder a, .turn-home").on("click", function() {
    $("#burger").trigger("click");
  });
  /*--------------------------------
     End Header
  ----------------------------------*/

  /*--------------------------------
  Start Menu
    ----------------------------------*/
  // Highlighting Menu on Scroll Through Sections
  $(window).on('scroll', function() {
    $('section').each(function() {
      if ($(window).scrollTop() + 50 >= $(this).offset().top) {
        var id = $(this).attr('id');
        $('.menu-item').removeClass('active');
        $(".menu-item." + id).addClass("active");
        $(".mobile-menu-item").removeClass("active");
        $(".mobile-menu-item." + id).addClass("active");
      }
    });
  });

  // Styling Menu on Scroll
  $('.about').waypoint({
    handler: function(direction) {
      // Fixing Menu after leaving Header Section
      $(".menu").toggleClass("menu-fix");
      // Changing Menu background after leaving Header Section
      $(".menu-container").toggleClass("menu-normal");
      $(".menu-item").toggleClass("menu-item-transparent");
      $(".desktop-menu .hvr-underline-from-left").toggleClass("dark");
      // Toggling Mobile Menu Visibility
      $(".mobile-menu").toggleClass("mobile-menu-fix");
      // Auto-Collapsing Mobile Menu When Left Open
      var a = $(".menu-link").attr("class");
      if (direction == "up" && a == "menu-link active") {
        $(".menu-link").trigger("click");
      }
    }
  });

  // Toggle Mobile Menu
  $('.mobile-menu a').on("click", function() {
    $(".menu-link").toggleClass("active");
    $(".menu-slider").slideToggle(500);
  });
  /*--------------------------------
       End Menu
    ----------------------------------*/


  /*--------------------------------
       Start Testimonials
  ----------------------------------*/
  // Configure and Initialize Owl Carousel
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000
  });
  /*--------------------------------
      End Testimonials
  ----------------------------------*/

  /*--------------------------------
      Start Code for Mobile Devices
  ----------------------------------*/
  // Code for Opera Mini
  var vh = $(window).height();
  if (navigator.userAgent.indexOf('Opera Mini') != -1) {
    // Removing Bootstrap Class and Re-Style Input
    $("input").removeClass("form-control");
    $("input").css({
      "width": "100%",
      "height": "50px",
      "background": "#fff"
    });
    // Removing Full-Screen Nav
    $(".navigation-icon").css("display", "none");
  }

  // Code For UC Browser
  if (navigator.userAgent.indexOf('UCBrowser') != -1) {
    // Removing Full-Screen Nav
    $(".navigation-icon").css("display", "none");
  }
  /*--------------------------------
      End Code for Mobile Devices
  ----------------------------------*/

  /*--------------------------------
      Others
  ----------------------------------*/
  // Code for Internet Explorer
  if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
    $(".header, .fullscreen-nav-container, .like-me, .contact").css("background-attachment", "scroll");
    $(".fullscreen-nav-holder").css("width", "100vw");
  }

  // Wow Plugin Initialization
  var wow = new WOW({
    animateClass: 'animated',
    offset: 70,
    mobile: false
  });
  wow.init();

  // Toggling Visibility of Scroll Up Button
  $(".about").waypoint({
    handler: function(direction) {
      $(".scroll-up").toggleClass("scroll-up-show");
    },
    offset: "bottom-in-view"
  });
  $(".sub-button").waypoint({
    handler: function(direction) {
      $(".scroll-up").toggleClass("scroll-up-show");
    },
    offset: "bottom-in-view"
  });
  /*--------------------------------
      Others
  ----------------------------------*/

  var g_containerInViewport;
  function init() {
    setStickyContainersSize();
    bindEvents();
  }

  function bindEvents() {
    window.addEventListener("wheel", wheelHandler);
  }

  function setStickyContainersSize() {
    document.querySelectorAll('.sticky-container').forEach(function(container) {
      const stikyContainerHeight = container.querySelector('main').scrollWidth;
      container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
    });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
  }

  function wheelHandler(evt) {

    const containerInViewPort = Array.from(document.querySelectorAll('.sticky-container')).filter(function(container) {
      return isElementInViewport(container);
    })[0];

    if (!containerInViewPort) {
      return;
    }

    var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop - 100;
    var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop + 100;
    let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

    if (g_canScrollHorizontally) {
      containerInViewPort.querySelector('main').scrollLeft += evt.deltaY;
    }
  }

  $(document).ready(function() {
    // Variable to keep track of the last scroll position
    var lastScrollTop = 0;

    // Event listener for scrolling
    $(window).scroll(function(event) {
      var currentScrollTop = $(this).scrollTop();

      // Check if the user is scrolling down
      if (currentScrollTop > lastScrollTop) {
        // Disable elements with class 'arrow-down'
        $('.arrow-down').each(function() {
          $(this).fadeOut(); // Default fade out over 400ms
          // You can also specify the duration, e.g., $(this).fadeOut(1000) for 1 second
        });
      }

      // Update lastScrollTop
      lastScrollTop = currentScrollTop;
    });
  });
}(jQuery));

$(document.links).filter(function() {
  return this.hostname != window.location.hostname;
}).attr('target', '_blank');

