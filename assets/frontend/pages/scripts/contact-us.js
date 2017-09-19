var ContactUs = (function() {
  return {
    //main function to initiate the module
    init: function() {
      var map;
      $(document).ready(function() {
        map = new GMaps({
          div: '#map',
          lat: -6.199122,
          lng: 106.823641
        });
        var marker = map.addMarker(
          {
            lat: -6.199122,
            lng: 106.823641,
            title: 'Eabsen.com',
            infoWindow: {
              content:
                '<b>Eabsen.com </b> (PT. Eabsen GLobal Indonesia) The City Tower, 12 Floor Unit 1N JL. M.H Thamrin No.81, Menteng Jakarta Pusat, DKI Jakarta 10310 Indonesia'
            }
          },
          {
            lat: 1.487885,
            lng: 124.840073,
            title: 'Eabsen.com',
            infoWindow: {
              content:
                '<b>Eabsen.com Cabang Manado</b> (PT. Eabsen GLobal Indonesia) Jalan Sarapung no. 23 Manado Sulawesi Utara'
            }
          }
        );

        marker.infoWindow.open(map, marker);
      });
    }
  };
})();
