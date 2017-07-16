(function ($) {
    "use strict";
// When the window has finished loading create our google map below
    $.fn.iwMap = function () {
        $(this).each(function () {
            var mapObj = this,
                map_style = $(this).data('map_style'),
                title = $(this).data('title'),
                description = $(this).data('description'),
                icon = $(this).data('marker_icon'),
                image = $(this).data('image'),
                lat = $(this).data('lat'),
                long = $(this).data('long'),
                width = $(this).data('width'),
                height = $(this).data('height'),
                panby_x = $(this).data('panby_x'),
                panby_y = $(this).data('panby_y');
            var loc = new google.maps.LatLng(lat, long);
            //$(this).addClass('map-rendered');

            if(!map_style){
                map_style = 'style1';
            }

            var mapOptions = {
                //zoomControl: false,
                //scaleControl: false,
                //panControl: false,
                scrollwheel: false,
                //disableDoubleClickZoom: true,
                draggable: true,
                // How zoomed in you want the map to start at (always required)
                zoom: $(this).data('zoom'),
                // The latitude and longitude to center the map (always required)
                center: loc,
                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.
                styles: 
				[
					{"featureType": "landscape", "elementType": "labels", "stylers": [{"color": "#fbfbfb"},{"visibility": "off"}]},
					{"featureType": "transit", "elementType": "labels", "stylers": [{"visibility": "off"}]}, 
					{"featureType": "poi", "elementType": "labels", "stylers": [{"visibility": "off"}]},
					{"featureType": "water", "elementType": "labels", "stylers": [{"color": "#f6f6f6"},{"visibility": "off"}]},
					{"featureType": "road", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]},
					{"stylers": [{"hue": "#00aaff"}, {"saturation": -100}, {"gamma": 2.15}, {"lightness": 12}]},
					{"featureType": "road", "elementType": "labels.text.fill", "stylers": [{"color": "#d3d3d3"},{"visibility": "on"},
					{"lightness": 24}]}, {"featureType": "road", "elementType": "geometry", "stylers": [{"lightness": 57}]}
				]
				
            };
			
			if(map_style == 'style5' || map_style == 'style3'){
                var mapOptions = {
				scrollwheel: false,
                //disableDoubleClickZoom: true,
                draggable: true,
                // How zoomed in you want the map to start at (always required)
                zoom: $(this).data('zoom'),
                // The latitude and longitude to center the map (always required)
                center: loc,
                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.
                styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
            };
            }

            var map = new google.maps.Map($(this).find('.map-view').get(0), mapOptions);

            if(panby_x != '' || panby_y != ''){
                map.panBy(panby_x, panby_y);
            }

            var marker_options = {
                position: loc,
                map: map
            };

            if(title){
                marker_options.title = title;
            }
            if(icon){
                marker_options.icon = icon;
                //marker_options.icon.url = icon;
                //marker_options.icon.anchor = new google.maps.Point(26, -160);
            }

            var marker = new google.maps.Marker(marker_options);

            switch(map_style){
                case 'style5':
                case 'style5':
                    var content = '';
                    if(title || description){
                        content += '<div class="info">';
                        if(description){
                            content += '<p>'+description+'</p>';
                        }
                        if(title){
                            content += '<h3>'+title+'</h3>';
                        }
                        content += '</div>';
                    }

                    var infobox = new InfoBox({
                        content: content,
                        disableAutoPan: false,
                        maxWidth: 150,
                        //pixelOffset: new google.maps.Size(-230, -450),
                        pixelOffset: new google.maps.Size(0 - (width/2) + 5, 0 - height - 25),
                        zIndex: null,
                        boxStyle: {
                            opacity: 1,
                            width: width+'px',
                            //height: height+'px',
                        },
                        closeBoxMargin: "0 0 -15px 0",
                        closeBoxURL: false,
                        infoBoxClearance: new google.maps.Size(1, 1)
                    });

                    //map.panBy(0, -160);
                    infobox.open(map, marker);
                    google.maps.event.addListener(marker, 'click', function () {
                        infobox.open(map, this);
                        //map.panTo(loc);
                    });

                    break;
                default :
                    if(image){
                        var content = '';
                        if(image){
                            content += '<img src="'+image+'" alt="">';
                        }
                        if(title || description){
                            content += '<div class="info">';
                            if(title){
                                content += '<h3>'+title+'</h3>';
                            }
                            if(description){
                                content += '<p>'+description+'</p>';
                            }
                            content += '</div>';
                        }

                        var infobox = new InfoBox({
                            content: content,
                            disableAutoPan: false,
                            maxWidth: 150,
                            //pixelOffset: new google.maps.Size(-230, -450),
                            pixelOffset: new google.maps.Size(0 - (width/2) + 5, 0 - height - 70),
                            zIndex: null,
                            boxStyle: {
                                opacity: 1,
                                width: width+'px',
                                //height: height+'px',
                            },
                            closeBoxMargin: "0 0 -15px 0",
                            closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                            infoBoxClearance: new google.maps.Size(1, 1)
                        });
                        //map.panBy(0, -160);
                        infobox.open(map, marker);
                        google.maps.event.addListener(marker, 'click', function () {
                            infobox.open(map, this);
                            //map.panTo(loc);
                        });
                    }
                    else
                    {
                        var markerinfowindow = new google.maps.InfoWindow();
                        markerinfowindow.setContent(description);
                        //map.panBy(-300, 0);
                        google.maps.event.addListener(marker, 'click', function () {
                            markerinfowindow.open(map, marker);
                        });
                    }
               break;
            }

        });
    };
    $(window).load(function(){$(".map-contain").iwMap();});
})(jQuery);