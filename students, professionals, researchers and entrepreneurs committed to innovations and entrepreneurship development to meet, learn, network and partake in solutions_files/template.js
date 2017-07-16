(function ($) {
	"use strict";

    window.iwOpenWindow = function (url) {
        window.open(url, 'sharer', 'toolbar=0,status=0,left=' + ((screen.width / 2) - 300) + ',top=' + ((screen.height / 2) - 200) + ',width=650,height=380');
        return false;
    };

    /** theme prepare data */

    function theme_init() {
        $('.header.header-default .search-form a').on('click', function(){
            $('.header .search-form-header').toggleClass('display-search-box');
            $('.header .search-form-header input').focus();
            return false;
        });

        $('.header.header-version-2 .iw-icon-search-cart .search-form a, body.down .header-version-2.clone .iw-icon-search-cart .search-form a').on('click', function(){
            $('.header.header-version-2 .remote-search, body.down .header-version-2.clone .remote-search').addClass('show-icon');
            $('.header.header-version-2 .search-form, body.down .header-version-2.clone .search-form').addClass('hidden-icon');
            $('.header.header-version-2 .header-2-search-form, body.down .header-version-2.clone .header-2-search-form').addClass('show-form');
            return false;
        });
        $('.header.header-version-2 .remote-search, body.down .header-version-2.clone .remote-search').on('click', function(){
            $('.header.header-version-2 .remote-search, body.down .header-version-2.clone .remote-search').removeClass('show-icon');
            $('.header.header-version-2 .search-form, body.down .header-version-2.clone .search-form').removeClass('hidden-icon');
            $('.header.header-version-2 .header-2-search-form, body.down .header-version-2.clone .header-2-search-form').removeClass('show-form');
            return false;
        });

        $('.plan-image').on('click', function( e ) {
            var self = $(this);
            Custombox.open({
                target: self.data('target'),
                effect: 'fadein'
            });
            e.preventDefault();
        });

        $('.header-event-bussines').append('<div class="mouse-icon-wrap"><div class="wheel"></div></div>');
    }

    /**click link one-page scroll to element anchor **/
    $(window).on('load resize',function(){
        var width_window = $(window).width();
        if(width_window > 991){
            var $item_speaker = $('.iwe-speaker-block.style3 .speakers-with-quote .speakers-item').width();
            $('.iwe-speaker-block.style3 .speakers-with-quote .speakers-item').css('height', $item_speaker + 'px');
            $('.header-version-4 .icon-toggle').on('click', function(){
                $('.header-version-4').addClass('open');
                $('.header-version-4 .icon-toggle i').css({'z-index':'-1','position':'relative'});
            });
            $('.header-version-4 .icon-close ').on('click',function(){
                $('.header-version-4').removeClass('open');
                $('.header-version-4 .icon-toggle i').css({'z-index':'2','position':'relative'});
            });
        }
    });
    $(window).on('resize scroll',function(){
        var $width_window = $(window).width();
        var $right = (($width_window - 1200) / 2 + 50) + 'px';
        if($width_window >= 1200){
            $('.body-boxed .header.header-version-3.header-sticky-one-page .iw-menu-default').css({'position':'fixed','right' : $right});
        }
    });

    /** click menu item in header one-page-fashion  */
    function click_item_menu(){
        if($('.header-version-7').length > 0) {
            $('.header-version-7 .iw-main-menu .iw-nav-menu > li a').on('click', function () {
                $('body').removeClass('menu-activated');
            });
        }
    }

    /**
     * Header version 5
     */
    function navStyle5(){
        if($('.header-version-5').length > 0){
        var el = $('.header-version-5 .main-menu');
        if (el.length) {
                var trigger = el.find('.nav-trigger');
                var menuItems = el.find('.iw-nav-menu > li');
                var $body = $('body');

                menuItems.each(function() {
                    var $this = $(this);
                    $this.css({
                        '-webkit-transition-delay': $this.index() / 15 + 's',
                        '-moz-transition-delay': $this.index() / 15 + 's',
                        'transition-delay': $this.index() / 15 + 's'
                    });
                });
                trigger.on('click', function(event) {
                    event.preventDefault();
                    $body.toggleClass('menu-activated');
                });
            }
        };
    };

    /**
     * Sticky Menu
     */

    function sticky_menu(){
        var $header = $(".header-sticky"),
        $clone = $header.before($header.clone().addClass("clone"));
        $(window).on("scroll", function() {
            var fromTop = $(document).scrollTop();
            $('body').toggleClass("down", (fromTop > 200));
        });
    }

    /**
     * Function for header one-page
     */
    function header_one_page(){
        $('.iw-nav-menu li.initial').addClass('current');
        var $width = $( window ).height();
        var $menu_height = $('.header-version-3 .iw-nav-menu').height();
        var $top_menu = ($width - $menu_height) / 2;

        //$('.header-version-3 .iw-menu-default').css('top', $top_menu);

        // initial hello state
        $(window).scroll(function(){
            if($('.header .initial').hasClass('initial')){
                $('.initial').removeClass('initial');
            };
        });

        //Scroll Nav
        if ((typeof $.fn.onePageNav == 'function') && (typeof inwaveNavSetting !== 'undefined')) {

            var booly = false;
            if (inwaveNavSetting.hashTag == 1) {
                booly = true;
            }

            $('.header-version-3 .iw-nav-menu, .off-canvas-menu').onePageNav({
                currentClass: 'current',
                //filter: ':not(.external)',
                changeHash: booly,
                scrollOffset: inwaveNavSetting.scrollOffset
            });
        };

        /** PARALLAX LAYERS EFFECT FOR WELCOME PAGE**/
        if (typeof Parallax !== 'undefined' && $('.scene').length) {
            $('.scene').each(function(){
                var self = $(this);
                self.find('.layer-bg').css({
                    height: ($(window).height() + 400) + 'px',
                    width: ($(window).width() + 400) + 'px'
                });
                $(window).resize(function () {
                    self.find('.layer-bg').css({
                        height: ($(window).height() + 400) + 'px',
                        width: ($(window).width() + 400) + 'px'
                    });
                });
                new Parallax(self.get(0));
            });
        }

        $('.header-default .iw-nav-menu a, .header-version-4 .iw-nav-menu a').on('click', function(event){
            if (this.hash !== "") {
                event.preventDefault();
                var $scroll_element = 0;
                if($('.header-sticky').length > 0){
                    $scroll_element = $($(this).attr('href')).offset().top - 80;
                }else {
                    $scroll_element = $($(this).attr('href')).offset().top;
                }
                $('html, body').animate({
                    scrollTop: $scroll_element
                }, 800);
            }
        });
    }

	/**
     * Woocommerce increase/decrease quantity function
     */
    function woocommerce_init() {
		var owl = $(".product-detail .product-essential .owl-carousel");
        if(owl.length){
            owl.owlCarousel({
                direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
                items: 5,
                itemsDesktopSmall : [979, 5],
                itemsTablet : [768, 4],
                itemsTabletSmall : false,
                itemsMobile : [479, 3],
                pagination: false,
                navigation : true,
                navigationText : ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            });
        }

        /** Quick view product */
        var buttonHtml = '';
        $('.quickview').on('click', function (e) {
            var el = this;
            buttonHtml = $(el).html();
            $(el).html('<i class="quickviewloading fa fa-cog fa-spin"></i>');
            var effect = $(el).find('input').val();
            Custombox.open({
                target: woocommerce_params.ajax_url + '?action=load_product_quick_view&product_id=' + el.href.split('#')[1],
                effect: effect ? effect : 'fadein',
				loading:{
					delay:2000,
					parent:['sk-wandering-cubes'],
					childrens:[
						['sk-cube','sk-cube1'],
						['sk-cube','sk-cube2']
					]
				},
                complete: function () {
                    $(el).html(buttonHtml);
                    var owl = $(".quickview-box .product-detail .product-essential .owl-carousel");
					owl.owlCarousel({
						direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
						items: 4,
						itemsDesktopSmall : [979, 5],
						itemsTablet : [768, 4],
						itemsTabletSmall : false,
						itemsMobile : [479, 3],
						pagination: false,
						navigation : true,
						navigationText : ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
					});
                    $(".quickview-body .next").click(function () {
                        owl.trigger('owl.next');
                    });
                    $(".quickview-body .prev").click(function () {
                        owl.trigger('owl.prev');
                    });
                    $(".quickview-body .woocommerce-main-image").click(function (e) {
                        e.preventDefault();
                    });
                    $(".quickview-body .owl-carousel .owl-item a").click(function (e) {
                        e.preventDefault();
                        if ($(".quickview-body .woocommerce-main-image img").length == 2) {
                            $(".quickview-body .woocommerce-main-image img:first").remove();
                        }
                        $(".quickview-body .woocommerce-main-image img").fadeOut(function () {
                            $(".quickview-body .woocommerce-main-image img").stop().hide();
                            $(".quickview-body .woocommerce-main-image img:last").fadeIn();
                        });
                        $(".quickview-body .woocommerce-main-image").append('<img class="attachment-shop_single wp-post-image" style="display:none;" src="' + this.href + '" alt="">');

                    })
                },
                close: function () {
                    $(el).html(buttonHtml);
                }
            });
            e.preventDefault();

        });


        $('.add_to_wishlist').on('click', function (e) {
            if ($(this).find('.fa-check').length) {
                e.preventDefault();
                return;
            }
            $(this).addClass('wishlist-adding');
            $(this).find('i').removeClass('fa-star').addClass('fa-cog fa-spin');
        });

        $('.yith-wcwl-add-to-wishlist').appendTo('.add-to-box');
        $('.yith-wcwl-add-to-wishlist .link-wishlist').appendTo('.add-to-box form.cart');
        if ($('.variations_form .variations_button').length) {
            $('.yith-wcwl-add-to-wishlist .link-wishlist').appendTo('.variations_form .variations_button');
        }

        //trigger events add cart and wishlist
        $('body').on('added_to_wishlist', function () {
			$('.wishlist-adding').find('i').removeClass('fa-cog fa-spin').addClass('fa-check');
            $('.wishlist-adding').removeClass('wishlist-adding');
        });

        $('body').on('added_to_cart', function (e, f) {
            $('.added_to_cart.wc-forward').remove();
            // $('.cart-adding i').remove();
            //$('.cart-adding').removeClass('cart-adding');
        //    $('.cart-adding').html('<i class="fa fa-check"></i>');
		//	$('.cart-adding').addClass('cart-added');
         //   $('.cart-adding').removeClass('cart-adding');
        });

        /**
         * submitProductsLayout
         */
        window.submitProductsLayout = function (layout) {
            $('.product-category-layout').val(layout);
            $('.woocommerce-ordering').submit();
        };

        $("#woo-tab-contents .box-collateral").hide(); // Initially hide all content
        $("#woo-tab-buttons li:first").attr("class","current"); // Activate first tab
        $("#woo-tab-contents .box-collateral:first").show(); // Show first tab content

        $('#woo-tab-buttons li a').click(function(e) {
            e.preventDefault();
            $("#woo-tab-contents .box-collateral").hide(); //Hide all content
            $("#woo-tab-buttons li").attr("class",""); //Reset id's
            $(this).parent().attr("class","current"); // Activate this
            $($(this).attr('href')).fadeIn(); // Show content for current tab
        });
    }

    /**
     * Carousel social footer
     */
    function carousel_init() {
        $(".owl-carousel").each(function () {
            var slider = $(this);
            var defaults = {
                direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr'
            };
            var config = $.extend({}, defaults, slider.data("plugin-options"));
            // Initialize Slider
            slider.owlCarousel(config).addClass("owl-carousel-init");
        });

        $('.post-gallery .gallery,.post-text .gallery').each(function () {
            var galleryOwl = $(this);
            var classNames = this.className.toString().split(' ');
            var column = 1;
            $.each(classNames, function (i, className) {
                if (className.indexOf('gallery-columns-') != -1) {
                    column = parseInt(className.replace(/gallery-columns-/, ''));
                }
            });
            galleryOwl.owlCarousel({
                direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
                items: column,
                singleItem: true,
                navigation: true,
                pagination: false,
                navigationText: ["<i class=\"fa fa-arrow-left\"></i>", "<i class=\"fa fa-arrow-right\"></i>"],
                autoHeight: true
            });
        });
    }

  	/**
     parallax effect */
    function parallax_init() {
        $('.iw-parallax').each(function () {
            $(this).css({
                'background-repeat': 'no-repeat',
                'background-attachment': 'fixed',
                'background-size': '100% auto',
                'overflow': 'hidden'
            }).parallax("50%", $(this).attr('data-iw-paraspeed'));
        });
        $('.iw-parallax-video').each(function () {
            $(this).parent().css({"height": $(this).attr('data-iw-paraheight'), 'overflow': 'hidden'});
            $(this).parallaxVideo("50%", $(this).attr('data-iw-paraspeed'));
        });
    };


   /*** RUN ALL FUNCTION */
	/*doc ready*/
    $(document).ready(function () {
        woocommerce_init();
        sticky_menu();
        navStyle5();
        header_one_page();
        parallax_init();
        theme_init();
        carousel_init();
        click_item_menu();
        if($(".fit-video").length){
            $(".fit-video").fitVids();
        }

        $('.profile-box.style5').hover(function () {
            $('.profile-box.style5').removeClass('active');
            $(this).addClass('active');
        });

        $('.iw-server-location-2 .map-picker .picker-icon').click(function (){
            var parent = $(this).parent();
            if (parent.hasClass('active')){
                parent.removeClass('active');
            } else {
				$('.iw-server-location-2 .map-picker').removeClass('active');
                parent.addClass('active');
            }
        });

        if($(".infunding-listing-page .filter-form select").length){
            $(".infunding-listing-page .filter-form select").select2();
        }

        if($(".iwe-select-ticket").length){
            $(".iwe-select-ticket").select2({
                placeholder: false,
                allowClear: false
            });
        }

		
		
		if($('.back-to-top').length){
			$('a[href=#page-top]').click(function(){
				$('html, body').animate({scrollTop:0}, 'slow');
				return false;
			});
		}

        $('.bt-buy-ticket a').click(function(e){
            e.preventDefault();
           var href= $(this).attr('href');
            if(href && $(href).length){
                $("html, body").animate({scrollTop: $(href).offset().top}, '800', 'linear');
            }
        });
    });

	/*window loaded */
	$(window).on('load',function(){
		parallax_init();
	});

    /**
     * Toggle button menu in mobile and table
     */

    $(window).on("load resize",function(){
        var event_max_height = 0;
        $('.iwevent-listing.iwevent_grid .events-content-wrap').each(function(){
            var height = $(this).height();
            if(height > event_max_height){
                event_max_height = height;
            }
        });

        $('.iwevent-listing.iwevent_grid .events-content-wrap').height(event_max_height);

        var map_width = $('.container:first-child').width();
        var document_with = $(document).width();
        if($('body').hasClass('rtl')){
            $('.inwave-map.style2 .map-content-wraper').css({
                'right' : (parseInt((document_with - map_width)/2)) + 'px',
                'left'  : 'auto'
            });
        }else {
            $('.inwave-map.style2 .map-content-wraper').css({
                'left' : (parseInt((document_with - map_width)/2)) + 'px'
            });
        }
    });
})(jQuery);

