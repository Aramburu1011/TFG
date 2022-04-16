$(function () {
  $(window).on("load", function (a) {
    $(".preloader").delay(500).fadeOut(500);
  });
  $(window).on("scroll", function (a) {
    var b = $(window).scrollTop();
    if (b < 110) {
      $(".header-menu").removeClass("sticky");
      $(".header-menu-1 img").attr("src", "resources/images/logo-2.png");
      $(".header-menu-2 img").attr("src", "resources/images/logo-4.png");
      $(".header-menu-4 img").attr("src", "resources/images/logo-7.png");
    } else {
      $(".header-menu").addClass("sticky");
      $(".header-menu-1 img").attr("src", "resources/images/logo-9.png");
      $(".header-menu-2 img").attr("src", "resources/images/logo-5.png");
      $(".header-menu-4 img").attr("src", "resources/images/logo-8.png");
    }
  });
  jQuery(document).ready(function (a) {
    function b(c) {
      a(c).bind("click", function (d) {
        d.preventDefault();
        a(this).parent().fadeOut();
      });
    }
    a(".seylon-toggler").bind("click", function () {
      var c = a(this)
        .parents(".seylon-dropdown")
        .children(".seylon-dropdown-menu")
        .is(":hidden");
      a(".seylon-dropdown .seylon-dropdown-menu").hide();
      a(".seylon-dropdown .seylon-toggler").removeClass("active");
      if (c) {
        a(this)
          .parents(".seylon-dropdown")
          .children(".seylon-dropdown-menu")
          .toggle()
          .parents(".seylon-dropdown")
          .children(".seylon-toggler")
          .addClass("active");
      }
    });
    a(document).bind("click", function (d) {
      var c = a(d.target);
      if (!c.parents().hasClass("seylon-dropdown")) {
        a(".seylon-dropdown .seylon-dropdown-menu").hide();
      }
    });
    a(document).bind("click", function (d) {
      var c = a(d.target);
      if (!c.parents().hasClass("seylon-dropdown")) {
        a(".seylon-dropdown .seylon-toggler").removeClass("active");
      }
    });
  });
  $("select").niceSelect();
  $(".video-popup").magnificPopup({ type: "iframe" });
  $(".image-popup").magnificPopup({
    type: "image",
    gallery: { enabled: true },
  });
  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 800,
    values: [20, 560],
    slide: function (a, b) {
      $("#amount1").val("$" + b.values[0] + ".00");
      $("#amount2").val("$" + b.values[1] + ".00");
    },
  });
  $("#amount1").val("$" + $("#slider-range").slider("values", 0) + ".00");
  $("#amount2").val("$" + $("#slider-range").slider("values", 1) + ".00");
  $(".details-image").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".details-image-thumb",
  });
  $(".details-image-thumb").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".details-image",
    dots: false,
    infinite: true,
    arrows: true,
    prevArrow: '<span class="prev"><i class="fal fa-chevron-left"></i></span>',
    nextArrow: '<span class="next"><i class="fal fa-chevron-right"></i></span>',
    centerMode: false,
    focusOnSelect: true,
  });
  $(window).on("scroll", function () {
    var a = $(window).scrollTop();
    if (a > 300) {
      $(".go-top").addClass("active");
    }
    if (a < 300) {
      $(".go-top").removeClass("active");
    }
  });
  $(".go-top").on("click", function () {
    $("html, body").animate({ scrollTop: "0" }, 1200);
  });
  $(".input-file").each(function () {
    var a = $(this),
      b = a.next(".js-labelFile"),
      c = b.html();
    a.on("change", function (d) {
      var e = "";
      if (d.target.value) {
        e = d.target.value.split("\\").pop();
      }
      e
        ? b.addClass("has-file").find(".js-fileName").html(e)
        : b.removeClass("has-file").html(c);
    });
  });
});
