/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        function casperFullImg() {
            $("img").each( function() {
                var contentWidth = $(".post-content").outerWidth(); // Width of the content
                var imageWidth = $(this)[0].naturalWidth; // Original image resolution

                if (imageWidth >= contentWidth) {
                    $(this).addClass('full-img');
                } else {
                    $(this).removeClass('full-img');
                }
            });
        };

        casperFullImg();
        $(window).smartresize(casperFullImg);

    });

    $(document).ready(function() {
      $('img').wrap('<div class="image"></div>');
    });

    $(document).on('click', 'article.post header.post-header', function() {
      var self = $(this).parent();
      var delay = 200;

      if (self.hasClass('open')) {
        self.children('section.post-content').slideUp(delay, function() {
          self.removeClass('open');
        });
      } else {
        if ($('article.post.open').length) {
          $('article.post.open').removeClass('open').children('section.post-content').slideUp(delay, function() {
            self.children('section.post-content').slideDown(delay, function() {
              $('html, body').animate({
                scrollTop: self.offset().top
              }, delay);
              self.addClass('open');
            });
          });
        } else {
          self.children('section.post-content').slideDown(delay, function() {
            $('html, body').animate({
              scrollTop: self.offset().top
            }, delay);
            self.addClass('open');
          });
        }
      }
      return false;
    }).on('click', '.post-comment-count', function() {
      window.location.href = $(this).attr('href');
      return false;
    });

    $('[rel="tooltip"]').tooltip({
      container: 'body',
      animation: false,
      html: true
    });

    $(window).scroll(function() {
      if ($(this).scrollTop()) {
        $('#back-to-top').fadeIn();
      } else {
        $('#back-to-top').fadeOut();
      }
    });

    $('#back-to-top').click(function() {
      $('html, body').animate({scrollTop: 0}, 200);
      return false;
    });

}(jQuery));

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
