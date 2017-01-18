/**
* @Author: mars
* @Date:   2017-01-18T01:17:41-05:00
* @Last modified by:   mars
* @Last modified time: 2017-01-18T01:57:29-05:00
*/



import { Component, OnInit } from '@angular/core';

/**
 * SVG path for target icon
 */
const targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
/**
 * SVG path for plane icon
 */
const planeSVG = "m2,106h28l24,30h72l-44,-0,0,0 21,34 0,34l-98,0 -80,0,0,30h-28l15,-47";


// import { countries } from './map-data';
const locations = [{
      "svgPath": targetSVG,
      "title": "Paris",
      "latitude": 48.8567,
      "longitude": 2.3510
    }, {
      "svgPath": targetSVG,
      "title": "Toronto",
      "latitude": 43.8163,
      "longitude": -79.4287
    }, {
      "svgPath": targetSVG,
      "title": "Los Angeles",
      "latitude": 34.3,
      "longitude": -118.15
    }, {
      "svgPath": planeSVG,
      "positionOnLine": 0,
      "color": "#000000",
      "alpha": 0.1,
      "animateAlongLine": true,
      "lineId": "line2",
      "flipDirection": true,
      "loop": true,
      "scale": 0.03,
      "positionScale": 1.3
    }, {
      "svgPath": planeSVG,
      "positionOnLine": 0,
      "color": "#585869",
      "animateAlongLine": true,
      "lineId": "line1",
      "flipDirection": true,
      "loop": true,
      "scale": 0.03,
      "positionScale": 1.8
    } ];

    const connections = [{
          "id": "line1",
          "arc": -0.85,
          "alpha": 0.3,
          "latitudes": [ 48.8567, 43.8163, 34.3 ],
          "longitudes": [ 2.3510, -79.4287, -118.15 ]
        }];


@Component({
  selector: 'app-amnetwork-view',
  templateUrl: './amnetwork-view.component.html',
  styleUrls: ['./amnetwork-view.component.css']
})
export class AmnetworkViewComponent implements OnInit {

    countryName: string = 'United States';
    currentCode: string = 'US';
    currentTz: string = 'America/New_York';
    currentYear: string = '2017';
    currentTime: string = '00:00:00 AM'
    endOfYear: any;
    initializing: boolean = false;
    constructor() {
      this.initializing = true;
    }


    _computeEndOfYearTime() {

      this.endOfYear = this._computeEndOfYearTimeByCountry(this.currentCode);
      this.currentTz = this.endOfYear.tz();
      this.currentYear = this.endOfYear.get('year');
      this.currentTime = CountryTime.now(this.currentCode).format('hh:mm:ss a');

      this.initializing = false;

      console.log('hello!!');

    }

      ngOnInit() {

        setInterval(() => {
          this._computeEndOfYearTime();
        }, 1000);

      }

      ngAfterViewInit() {
        let self = this;


        // countries.forEach(c => {
        //   console.log(c.code);
        //   let endOfYear, today;
        //   try {
        //     endOfYear = this._computeEndOfYearTimeByCountry(c.code || 'US');
        //     today = CountryTime.now(c.code || 'US');
        //   } catch(e){
        //     endOfYear = this._computeEndOfYearTimeByCountry('US');
        //     today = CountryTime.now('US');
        //   }

        //   // c.title = `${c.title} -> ${endOfYear.diff(today, 'seconds')}`;
        // });

        let map;

        if (AmCharts.isReady) {
          let map = createMapElement();
          map.addListener("clickMapObject",  event => {

              console.log(this, self, `${event.mapObject.id} ===> ${event.mapObject.title}`);


              let code = event.mapObject.id, today;
              try {
                self.currentCode = code;
                self.countryName = event.mapObject.title;
                self.endOfYear = self._computeEndOfYearTimeByCountry(code);
                today = CountryTime.now(code);
              } catch(e){
                self.currentCode = 'US';
                self.countryName = 'United States';

                self.endOfYear = self._computeEndOfYearTimeByCountry('US');
                today = CountryTime.now('US');
              }
  console.log(this.endOfYear);
              // this.endOfYear.diff(today, 'seconds');


          });
        } else {
          AmCharts.ready(function () {
            let map = createMapElement();

            map.addListener("clickMapObject",  event => {
                console.log(this, self, `${event.mapObject.id} ===> ${event.mapObject.title}`);


                let code = event.mapObject.id, today;
                try {
                  self.currentCode = code;
                  self.countryName = event.mapObject.title;
                  self.endOfYear = self._computeEndOfYearTimeByCountry(code);
                  today = CountryTime.now(code);
                } catch(e){
                  self.currentCode = 'US';
                  self.countryName = 'United States';

                  self.endOfYear = self._computeEndOfYearTimeByCountry('US');
                  today = CountryTime.now('US');
                }
      console.log(self.endOfYear);
                // this.endOfYear.diff(today, 'seconds');



            });

          });
        }
      }


      _computeEndOfYearTimeByCountry(countryCode): any {
        let endOfYear = CountryTime.now(countryCode);
        endOfYear.month(11);
        endOfYear.date(31);
        endOfYear.hours(23);
        endOfYear.minutes(59);
        endOfYear.seconds(59);
        return endOfYear;
      }


    }


    function createMapElement() {

      return AmCharts.makeChart( "mapdiv", {
        /**
        * this tells amCharts it's a map
        */
        "type": "map",
        /**
        * create data provider object
        * map property is usually the same as the name of the map file.
        * getAreasFromMap indicates that amMap should read all the areas available
        * in the map data and treat them as they are included in your data provider.
        * in case you don't set it to true, all the areas except listed in data
        * provider will be treated as unlisted.
        */
        "dataProvider": {
          "map": "worldLow",
          "getAreasFromMap": true,
          "zoomLevel": 3.5,
          "zoomLongitude": -55,
          "zoomLatitude": 42,
          "lines": connections,
          "images": locations
        },

        "imagesSettings": {
          "color": "#585869",
          "rollOverColor": "#585869",
          "selectedColor": "#585869",
          "pauseDuration": 0.2,
          "animationDuration": 2.5,
          "adjustAnimationSpeed": true
        },

        /**
        * create areas settings
        * autoZoom set to true means that the map will zoom-in when clicked on the area
        * selectedColor indicates color of the clicked area.
        */
        "areasSettings": {
          "autoZoom": true,
          "selectedColor": "rgba(0, 158, 255, 1)"
        },

        /**
        * let's say we want a small map to be displayed, so let's create it
        */
        "smallMap": {}
      } );




  }
