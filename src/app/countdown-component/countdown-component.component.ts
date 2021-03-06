/**
* @Author: mars
* @Date:   2016-12-28T01:01:23-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-29T21:12:57-05:00
*/



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown-component',
  templateUrl: './countdown-component.component.html',
  styleUrls: ['./countdown-component.component.css']
})
export class CountdownComponentComponent implements OnInit {
  endOfYear: Array<any>;
  initializing: boolean = false;
  constructor() {
    this.initializing = true;

  }

  ngOnInit() {
    setInterval(() => {
      this._computeEndOfYearTime();
    }, 1000);
  }

  _computeEndOfYearTime() {

    this.endOfYear = this._computeEndOfYearTimeByCountry('US');

    // one second before end of 2016
    // console.log(this.endOfYearNP);
    this.initializing = false;

  }

  _computeEndOfYearTimeByCountry(countryCode) {
    let endOfYear = CountryTime.now(countryCode);
    endOfYear.month(11);
    endOfYear.date(31);
    endOfYear.hours(23);
    endOfYear.minutes(59);
    endOfYear.seconds(59);
    return endOfYear;
  }
}
