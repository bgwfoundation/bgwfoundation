/* 
 * @package Inwave Event
 * @version 1.0.0
 * @created Jun 3, 2015
 * @author Inwavethemes
 * @email inwavethemes@gmail.com
 * @website http://inwavethemes.com
 * @support Ticket https://inwave.ticksy.com/
 * @copyright Copyright (c) 2015 Inwavethemes. All rights reserved.
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */

/**
 * Description of iwevent-script
 *
 * @developer duongca
 */
(function ($) {

    function getTimeRemaining(endtime) {
        var t = endtime * 1000 - Date.parse(new Date()),
                seconds = Math.floor((t / 1000) % 60),
                minutes = Math.floor((t / 1000 / 60) % 60),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            var t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }


    $(document).ready(function () {
        var deadline = $('.event-time-counter').data('time');
        if ($('#eventTimeCounter').length > 0) {
            initializeClock('eventTimeCounter', deadline);
        }

        $('.infunding-listing-page .order-dir').click(function () {
            var order_dir = $(this).find('i');
            if (order_dir.hasClass('fa-sort-amount-desc')) {
                order_dir.removeClass('fa-sort-amount-desc').addClass('fa-sort-amount-asc');
                $(this).find('input[name="order_dir"]').val('asc');
            } else {
                order_dir.removeClass('fa-sort-amount-asc').addClass('fa-sort-amount-desc');
                $(this).find('input[name="order_dir"]').val('desc');
            }
            document.filterForm.submit();
        });

        $('.filter-form select, .filter-form input[name="keyword"]').change(function () {
            document.filterForm.submit();
        });

        $('.iwe-wrap .iwevent-item').hover(function () {
            var item = $(this);
            item.find('.iwevent-info').addClass('active');
            item.find('.iwevent-des').fadeIn();
        }, function () {
            var item = $(this);
            item.find('.iwevent-des').fadeOut();
            item.find('.iwevent-info').removeClass('active');
        });

        $('.iwe-pricing-block.style2 .ticket-item').hover(function () {
            $(this).addClass('active');
        }, function () {
            $(this).removeClass('active');
        });

        $('select[name="ticket_buy"]').change(function () {
            var value = $(this).val().split('|')[1];
            $('input[name="quantity"]').attr('max', value);
        }).trigger('change');

        $('.ticket-container .ticket-plan span').click(function () {
            var input = $(this).parents('.iwe-checkoutform').find('input[name="ticket_buy"]'),
                    value = $(this).data('value');
            input.val(value);

            var parent = $(this).parent();
            $('.ticket-container .ticket-plan').removeClass('active');
            parent.addClass('active');
        });

        $('.button .join-us').click(function () {
            var tabItems = $('.iw-tabs .iw-tab-item');
            var tabItemContents = $('.iw-tabs .iw-tab-item-content');

            tabItems.each(function (index) {
                if (index === 2) {
                    $(tabItems.get(index)).addClass('active');
                } else {
                    $(tabItems.get(index)).removeClass('active');
                }
            });
            tabItemContents.each(function (index) {
                if (index === 2) {
                    $(tabItemContents.get(index)).removeClass('iw-hidden');
                } else {
                    $(tabItemContents.get(index)).addClass('iw-hidden');
                }
            });
        });

        $('.btn-buy-ticket').click(function () {
            if($(this).hasClass('disable-btn')){
                return;
            }
            var link = $(this).data('link');
            if (link) {
                var win = window.open(link, '_blank');
                win.focus();
            } else {
                var id = $(this).data('id');
                Custombox.open({
                    target: '#buyticket-form-' + id,
                    cache: true,
                    effect: 'fadein',
                    speed: 300,
                    overlayOpacity: 0.8,
                    width: 800
                });
            }
        });

        //Clse custombox
        $('.btn-event-cancel').click(function () {
            Custombox.close();
        });
    });
})(jQuery);
