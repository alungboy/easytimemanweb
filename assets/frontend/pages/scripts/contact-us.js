var ContactUs = function () {

    return {
        //main function to initiate the module
        init: function () {
			var map;
			$(document).ready(function(){
			  map = new GMaps({
				div: '#map',
	            lat: 1.487920,
				lng: 124.840035,
			  });
			   var marker = map.addMarker({
		            lat: 1.487885,
					lng: 124.840073,
		            title: 'easytimeman.com',
		            infoWindow: {
		                content: "<b>easytimeman.com</b> Jalan Sarapung no. 23 (Virgo Travel Lantai 3)"
		            }
		        });

			   marker.infoWindow.open(map, marker);
			});
        }
    };

}();