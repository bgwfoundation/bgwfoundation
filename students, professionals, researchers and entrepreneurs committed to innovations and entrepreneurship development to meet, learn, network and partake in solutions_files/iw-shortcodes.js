/*
 * @package Inwave Event
 * @version 1.0.0
 * @created May 4, 2015
 * @author Inwavethemes
 * @email inwavethemes@gmail.com
 * @website http://inwavethemes.com
 * @support Ticket https://inwave.ticksy.com/
 * @copyright Copyright (c) 2015 Inwavethemes. All rights reserved.
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */

(function($){
    "use strict";

    /**
     * Tabs
     */
    $.fn.iwTabs = function (type) {
        $(this).each(function () {
            var iwTabObj = this, $iwTab = $(this);
            if (type === 'tab') {
                iwTabObj.content_list = $iwTab.find('.iw-tab-content .iw-tab-item-content');
                iwTabObj.list = $iwTab.find('.iw-tab-items .iw-tab-item');
                iwTabObj.item_click_index = 0;
                $('.iw-tab-items .iw-tab-item', this).click(function () {
                    if ($(this).hasClass('active')) {
                        return;
                    }
                    var itemclick = this, item_active = $iwTab.find('.iw-tab-items .iw-tab-item.active');
                    iwTabObj.item_click_index = iwTabObj.list.index(itemclick);
                    $(itemclick).addClass('active');
                    iwTabObj.list.each(function () {
                        if (iwTabObj.list.index(this) !== iwTabObj.list.index(itemclick) && $(this).hasClass('active')) {
                            $(this).removeClass('active');
                        }
                    });
                    iwTabObj.loadTabContent();
                });
                this.loadTabContent = function () {
                    var item_click = $(iwTabObj.content_list.get(iwTabObj.item_click_index));
                    iwTabObj.content_list.each(function () {
                        if (iwTabObj.content_list.index(this) < iwTabObj.content_list.index(item_click)) {
                            $(this).addClass('prev').removeClass('active next');
                        } else if (iwTabObj.content_list.index(this) === iwTabObj.content_list.index(item_click)) {
                            $(this).addClass('active').removeClass('prev next');
                        } else {
                            $(this).addClass('next').removeClass('prev active');
                        }
                    });
                };
            } else {
                this.accordion_list = $iwTab.find('.iw-accordion-item');
                $('.iw-accordion-header', this).click(function () {
                    var itemClick = $(this);
                    var item_target = itemClick.parent();
                    if (itemClick.hasClass('active')) {
                        itemClick.removeClass('active');
                        item_target.find('.iw-accordion-content').slideUp({easing: 'easeOutQuad'});
                        item_target.find('.iw-accordion-header-icon .expand').hide();
                        item_target.find('.iw-accordion-header-icon .no-expand').show();
                        return;
                    }
                    itemClick.addClass('active');
                    item_target.find('.iw-accordion-content').slideDown({easing: 'easeOutQuad'});
                    item_target.find('.iw-accordion-header-icon .expand').show();
                    item_target.find('.iw-accordion-header-icon .no-expand').hide();
                    iwTabObj.accordion_list.each(function () {
                        if (iwTabObj.accordion_list.index(this) !== iwTabObj.accordion_list.index(item_target) && $(this).find('.iw-accordion-header').hasClass('active')) {
                            $(this).find('.iw-accordion-header').removeClass('active');
                            $(this).find('.iw-accordion-content').slideUp({easing: 'easeOutQuad'});
                            $(this).find('.iw-accordion-header-icon .expand').hide();
                            $(this).find('.iw-accordion-header-icon .no-expand').show();
                        }
                    });
                });

                $('.iw-accordion-header', this).hover(function () {
                    var item = $(this), item_target = item.parent();
                    if (item.hasClass('active')) {
                        return;
                    }
                    item_target.find('.iw-accordion-header-icon .expand').show();
                    item_target.find('.iw-accordion-header-icon .no-expand').hide();
                }, function () {
                    var item = $(this), item_target = item.parent();
                    if (item.hasClass('active')) {
                        return;
                    }
                    item_target.find('.iw-accordion-header-icon .expand').hide();
                    item_target.find('.iw-accordion-header-icon .no-expand').show();
                });
            }

        });
    };
})(jQuery);


jQuery(document).ready(function($){
    /**
     * Video
     */
    $('.iw-video .play-button').click(function () {
        if (!$(this).parents('.iw-video').hasClass('playing')) {
            $(this).parents('.iw-video').find('video').get(0).play();
            $(this).parents('.iw-video').addClass('playing');
            return false;
        }
    });
	
    $('.iw-video,.iw-event-facts').click(function () {
        $(this).find('video').get(0).pause();
    });
    $('.iw-video video').on('pause', function (e) {
        $(this).parents('.iw-video').removeClass('playing');
    });

    /** CONTACT FORM **/
    $('.iw-contact form').submit(function (e) {
		var captcha = $('.captcha-view').data('value'), input_val = $('.captcha').val();
		if (captcha !== input_val) {
			alert('Captcha invalid, please input again!');
			$('.captcha').focus();
			return false;
		}
        $.ajax({
            type: "POST",
            url: inwaveCfg.ajaxUrl,
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function (xhr) {
                $('.iw-contact .ajax-overlay').show();
            },
            success: function (result) {
                if (result.success) {
                    $('.iw-contact form').get(0).reset();
                } else {
                    $('.iw-contact .form-message').addClass('error');
                }
                $('.iw-contact .ajax-overlay').hide();
                $('.iw-contact .form-message').html(result.message);
            }
        });
        e.preventDefault();
    });
    $('.iw-contact .btn-cancel').click(function () {
        $('.iw-contact form').get(0).reset();
        $('.iw-contact .form-message').removeClass('error');
        $('.iw-contact .form-message').html('');
        return false;
    });

    /** price box hover */
    $('.pricebox.style3').hover(function () {
        if (!$(this).hasClass('no-price')) {
            $('.pricebox.style3').removeClass('featured');
            $(this).addClass('featured');
        }
    });
    $('.pricebox.style2').hover(function () {
        if (!$(this).hasClass('no-price')) {
            $('.pricebox.style2').removeClass('featured');
            $(this).addClass('featured');
        }
    });
    $('.pricebox.style3').css('min-height', $('.pricebox.style3.featured').height());
    $(document).ready(function (){
        $('.iw-price-list .price-item').click(function(){
            $('.iw-price-list .price-item').removeClass('selected');
            $(this).addClass('selected');
            var price = $(this).data('price'),
                url = $('.iw-infunding-donate-us .infunding-paypal a').data('url');
            $('.iw-price-list input[name="amount"]').val(price);
            $('.iw-infunding-donate-us .infunding-paypal a').attr('href',url+'&amount='+price);
        });

        $('.iw-price-list input[name="amount"]').change(function(){
            var val = $(this).val();
            if(val >0){}else{
                val = 100;
            }
            var url = $('.iw-infunding-donate-us .infunding-paypal a').data('url');
            $('.iw-infunding-donate-us .infunding-paypal a').attr('href',url+'&amount='+val);
        }).trigger('change');
    });

    /*if($(".iw-sponsors-list.style1").length){
        $(".iw-sponsors-list.style1").owlCarousel({
            // Most important owl features
            direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
            items: 5,
            itemsCustom: false,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            singleItem: false,
            itemsScaleUp: false,
            autoPlay: false,
            stopOnHover: false,
            navigation: true,
            navigationText: ["", ""],
            rewindNav: true,
            scrollPerPage: false,
            //Pagination
            pagination: false,
            paginationNumbers: false
        });
    }

    if($(".iw-sponsors-list.style2").length) {
        $(".iw-sponsors-list.style2").owlCarousel({
            // Most important owl features
            direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
            items: 5,
            itemsCustom: false,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [980, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            navigation: true,
            navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            scrollPerPage: false,
            pagination: false
        });
    }
*/
    if($(".iwe-sponsor-slider .iwe-sponsors-list").length){
        $(".iwe-sponsor-slider .iwe-sponsors-list").owlCarousel({
            direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
            items: $(this).data("number"),
            itemsCustom: false,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [980, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            navigation: true,
            navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            scrollPerPage: false,
            pagination: false
        });
    }

    $(window).on("load resize", function () {
        $(".iw-our-missions").click(function (){
            $('html, body').animate({
                scrollTop: $(".iw-scroll-to-top").offset().top
            }, 500);
        });

        var container_with = $('.iwevent-listing.iwevent_carousel .container').width();
        var container_with2 = $('body .container').width();
        var window_with = $(window).width();
        $('.iwevent-listing.iwevent_carousel .owl-controls').css({left : 'auto', right : (window_with - container_with) /2});
        $('.rtl .iwevent-listing.iwevent_carousel .owl-controls').css({left : (window_with - container_with) /2, right : 'auto'});
        $('.layers-effect.left').css({left : -(window_with - container_with2) /2, right : 'auto'});
        $('.rtl .layers-effect.left').css({right : -(window_with - container_with2) /2, left : 'auto'});
        $('.layers-effect.right').css({right : -(window_with - container_with2) /2, left : 'auto'});
        $('.rtl .layers-effect.right').css({left : -(window_with - container_with2) /2, right : 'auto'});


        var height_address = $( '.iw-contact-address-right .iw-address' ).height();
        var height_icon = $( '.iw-contact-address-right .iw-address .icon' ).height();
        var margin_top = (height_address - height_icon)/2;
        $(".iw-contact-address-right .iw-address .icon").css("margin-top",+ margin_top);

        if($('.speaker-flex-slider').length){
            $('.speaker-flex-slider .iw-carousel').flexslider({
                animation: "slide",
                controlNav: false,
                pagination: false,
                directionNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 170,
                itemMargin: 0,
                move: 0,
                rtl: true,
                asNavFor: '.speaker-flex-slider .iw-slider'
            });

            $('.speaker-flex-slider .iw-slider').flexslider({
                animation: "slide",
                controlNav: false,
//            directionNav: false,
                animationLoop: false,
                customDirectionNav: $(".custom-navigation a"),
                slideshow: true,
                rtl: true,
                sync: ".speaker-flex-slider .iw-carousel",
                start: function(slider){
                    $('body').removeClass('loading');
                }
            });
        }

        $('.iwe-speaker-block.style3 .speakers-item').each(function(){
            var item = $(this);
            var a_height = item.find('.speaker-overlay .speaker-name-position').outerHeight();
            item.find('.speaker-overlay').css({bottom : a_height});
        });
    });

    $('[data-toggle="tooltip"]').tooltip();

    if($('.inwave-funfact').length){
        $('.inwave-funfact').waypoint(function() {
            var default_settings =  {
                from: 0,
                to: 0,
                speed: 2500,
                refreshInterval: 50,
                formatter: function(value, settings){
                    if(settings.add_comma){
                        return value.toFixed(settings.decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    else{
                        return value.toFixed(settings.decimals);
                    }
                }
            };

            var settings = $(this).data('settings');
            settings = $.extend({}, default_settings, settings);
            $(".funfact-number", this).countTo(settings);
        },{
            triggerOnce: true,
            offset: '90%'
        });
    }

    // Skill bar
    if ( $('.skillbar').length > 0) {
        $('.skillbar').each(function () {
            var speed = $(this).attr('data-speed');
            $(this).find('.skillbar_level').animate({
                width: $(this).attr('data-percent')
            }, speed);
			$(this).find('.skillbar_callout').animate({
                left: $(this).attr('data-percent')
            }, speed);
			$(this).find('.skillbar_callout').css('left', $(this).attr('data-percent'));
        });
    }

    //countdown
    if ( $('.inwave-countdown').length > 0) {
        $('.inwave-countdown').each(function () {
           var countdown = $(this).data('countdown');
            $(this).countdown(countdown, function(event){
                    var inwave_day = event.strftime('%-D');
                    var inwave_hour = event.strftime('%-H');
                    var inwave_minute = event.strftime('%-M');
                    var inwave_second = event.strftime('%-S');

                    $(this).find('.day').html(inwave_day);
                    $(this).find('.hour').html(inwave_hour);
                    $(this).find('.minute').html(inwave_minute);
                    $(this).find('.second').html(inwave_second);
            })
        });
    }

	$('.iw-event-pricing .ticket-item').hover(function () {
            $('.iw-event-pricing .ticket-item').removeClass('ticket-feature');
            $(this).addClass('ticket-feature');
    });

    if($('.speaker-slider').length){
        $('.speaker-slider').each(function () {
            $(this).find('.speakers').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
				rtl: $('body').hasClass('rtl') ? true : false,
                asNavFor: '.slider-for',
                dots: false,
                centerMode: true,
				centerPadding: '0',
                focusOnSelect: true,
				speed:300,
				responsive: [
					{
						breakpoint: 979,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerPadding: '175px'
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerPadding: '95px'
						}
					},
					{
						breakpoint: 479,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerPadding: '0'
						}
					}
				],
				nextArrow:'<button type="button" class="slick-next"></button>',
				prevArrow:'<button type="button" class="slick-prev"></button>'
            });
        });
    }
	
	
	if($('.iwe-schedule-block.style4').length){
			$('.iwe-schedule-block.style4').each(function () {
				$(this).find('.schedules').slick({
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 3,
					rtl: $('body').hasClass('rtl') ? true : false,
					centerMode: true,
					centerPadding: '22%',
					dots: false,
					dotsClass: 'slick-dots',
					nextArrow:'<button class="slick-next"><i class="ion-android-arrow-forward"></i></button>',
					prevArrow:'<button class="slick-prev"><i class="ion-android-arrow-back"></i></button>',
					responsive: [
						{
							breakpoint: 991,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								centerPadding: '0',
							}
						},
						{
							breakpoint: 767,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								centerPadding: '0',
							}
						},
						{
							breakpoint: 479,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								centerPadding: '0',
							}
						}
					],
				});
			});
		}
	
	

    if($('.iwe-speaker-block.style6 .speakers').length){
        $('.iwe-speaker-block.style6 .speakers').multiscroll({
            'scrollingSpeed': 400,
            /*sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE'],*/
            anchors: ['firstSection', 'second', 'third'],
            /*menu: '#menu',*/
            navigation: true,
            loopBottom: false,
            loopTop: false
        });
    }

    $('.link-detail a').click(function(e){
        e.preventDefault();

        var button = $(this);
        if(button.hasClass('disabled')){
            return;
        }
        var ul = button.closest('.time-schedule-items').find('ul');
        var total =  ul.data('total');
        var event =  ul.data('event');
        var loaded =  parseInt(ul.data('loaded'));
        var schedule =  ul.data('schedule');
        jQuery.ajax({
            type : "post",
            /*dataType : "json",*/
            url : inwaveCfg.ajaxUrl,
            beforeSend: function(){
                button.fadeOut();
                button.next('img').fadeIn();
            },
            data : {action: "iwe_get_schedule_time_html", event: event, schedule : schedule, loaded : loaded},
            success: function(response) {
                if(response){
                    var new_item = $(response);
                    new_item.hide();
                    ul.append(new_item);
                    new_item.slideDown();
                }
                if((loaded + 2) >= total){
                    button.addClass('disabled');
                }
                else{
                    ul.data('loaded', loaded + 2);
                }
                button.next('img').fadeOut();
                button.fadeIn();
            }
        });
    });

});

var iweCheckoutForm = function(value){
    if(jQuery('.iwe-checkout').hasClass('style4')){
        jQuery('*[name="ticket_buy"]').val(value);
        jQuery('.ticket-plan').removeClass('active');
        jQuery('.ticket-plan-inner[data-value="'+value+'"]').closest('.ticket-plan').addClass('active');
        jQuery('html,body').animate({
                scrollTop: jQuery('.iwe-checkout').offset().top},
            'slow');
    }else{
        jQuery('*[name="ticket_buy"]').val(value).trigger("change");
        jQuery('html,body').animate({
                scrollTop: jQuery('.iwe-checkout').offset().top},
            'slow');
    }
};

function iwaveSetCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function iwaveGetCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function iwaveCheckCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}