/* 
 * @package Inwave Event
 * @version 1.0.0
 * @created Mar 3, 2016
 * @author Inwavethemes
 * @email inwavethemes@gmail.com
 * @website http://inwavethemes.com
 * @support Ticket https://inwave.ticksy.com/
 * @copyright Copyright (c) 2015 Inwavethemes. All rights reserved.
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */


(function ($) {
    "use strict";
    $(document).ready(function () {
        var $iwTab = $('.iw-tabs.event-detail'),
                content_list = $iwTab.find('.iw-tab-content .iw-tab-item-content'),
                list = $iwTab.find('.iw-tab-items .iw-tab-item'),
                accordion_day = $('.iw-tab-item-content .iw-tabs');
        $('.iw-tab-items .iw-tab-item', $iwTab).click(function () {
            if ($(this).hasClass('active')) {
                return;
            }
            $(this).addClass('active');
            var itemclick = this;
            list.each(function () {
                if (list.index(this) !== list.index(itemclick) && $(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            });
            loadTabContent();
        });

        function loadTabContent() {
            var item_active = $iwTab.find('.iw-tab-items .iw-tab-item.active');
            content_list.addClass('iw-hidden');
            $(content_list.get(list.index(item_active))).removeClass('iw-hidden');
        }
        loadTabContent();

        $('.iw-tab-item-content .iw-accordion-header').live('click', function () {
            var itemClick = $(this),
                    accordion_list = accordion_day.find('.iw-accordion-item'),
                    item_target = itemClick.parent();
            if (itemClick.hasClass('active')) {
                itemClick.removeClass('active');
                item_target.find('.iw-accordion-content').slideUp();
                item_target.find('.iw-accordion-header-icon .expand').hide();
                item_target.find('.iw-accordion-header-icon .no-expand').show();
                return;
            }
            itemClick.addClass('active');
            item_target.find('.iw-accordion-content').slideDown();
            item_target.find('.iw-accordion-header-icon .expand').show();
            item_target.find('.iw-accordion-header-icon .no-expand').hide();
            accordion_list.each(function () {
                if (accordion_list.index(this) !== accordion_list.index(item_target) && $(this).find('.iw-accordion-header').hasClass('active')) {
                    $(this).find('.iw-accordion-header').removeClass('active');
                    $(this).find('.iw-accordion-content').slideUp();
                    $(this).find('.iw-accordion-header-icon .expand').hide();
                    $(this).find('.iw-accordion-header-icon .no-expand').show();
                }
            });
        });

        $('.iw-tab-item-content .iw-accordion-time-header').live('click', function () {
            var itemClick = $(this);
            var item_target = itemClick.parent();
            var time_accordion_list = itemClick.parents('.iw-tabs.accordion.time').find('.iw-accordion-time-item');
            if (itemClick.hasClass('active')) {
                itemClick.removeClass('active');
                item_target.find('.iw-accordion-time-content').slideUp();
                item_target.find('.iw-accordion-time-header-icon .expand').hide();
                item_target.find('.iw-accordion-time-header-icon .no-expand').show();
                return;
            }
            itemClick.addClass('active');
            item_target.find('.iw-accordion-time-content').slideDown();
            item_target.find('.iw-accordion-time-header-icon .expand').show();
            item_target.find('.iw-accordion-time-header-icon .no-expand').hide();
            time_accordion_list.each(function () {
                if (time_accordion_list.index(this) !== time_accordion_list.index(item_target) && $(this).find('.iw-accordion-time-header').hasClass('active')) {
                    $(this).find('.iw-accordion-time-header').removeClass('active');
                    $(this).find('.iw-accordion-time-content').slideUp();
                    $(this).find('.iw-accordion-time-header-icon .expand').hide();
                    $(this).find('.iw-accordion-time-header-icon .no-expand').show();
                }
            });
        });

//        if($('.input-date').length){
//            $('.input-date').datepicker();
//        }
    });
})(jQuery);