
function WaterLevels ( station_id, datum, units, time_zone, start_date, end_date ) {

    var self = this;

    this.station_id = station_id;
    this.datum = datum;
    this.units = units;
    this.time_zone = time_zone;
    this.start_date = start_date;
    this.end_date = end_date;

    this.new_data = function ( data ) {

        console.log( data );

    };

    this.update_data = function () {

        var request_url = 'http://tidesandcurrents.noaa.gov/api/datagetter?' +
                'begin_date=' + self.start_date + '&' +
                'end_date=' + self.end_date + '&' +
                'station=' + self.station_id + '&' +
                'time_zone=' + self.time_zone + '&' +
                'units=' + self.units + '&' +
                'datum=' + self.datum + '&' +
                'application=web_services&' +
                'product=water_level&' +
                'format=json';

        //$.get( request_url, self.new_data );
        $.ajax({
            type: 'GET',
            url: request_url,
            contentType: 'text/plain',
            xhrFields: {
                withCredentials: false
            },
            success: self.new_data
        });

    };

    self.update_data();

}