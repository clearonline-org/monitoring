/**
* @Author: mars
* @Date:   2016-12-31T00:30:20-05:00
* @Last modified by:   mars
* @Last modified time: 2017-01-04T20:59:23-05:00
*/



import { Component, OnInit } from '@angular/core';
import { countries } from './map-data';

@Component({
  selector: 'app-ammap-view',
  templateUrl: './ammap-view.component.html',
  styleUrls: ['./ammap-view.component.css']
})
export class AmmapViewComponent implements OnInit {


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
      "imagesSettings": {
        "rollOverColor": "#f1faff",
        "rollOverScale": 3,
        "selectedScale": 3,
        // "selectedColor": "#089282",
        "selectedColor": "#f1faff",
        // "color": "#13564e"
        "color": "#a8dbfb" //
      },
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
        "images": countries
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
