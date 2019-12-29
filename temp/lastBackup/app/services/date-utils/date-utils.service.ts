import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  static getMinDate() {
        return new Date(-8640000000000000);
    };

    static getMaxDate() {
        return new Date(8640000000000000);
    };

    static getDateOnly(date: any) {
        return moment(date).startOf('day').toDate();
    };

    static getMonthFirstDay(date: any) {
        date.setDate(1);
        return date;
    };

    static getMonthLastDay(date: any) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var lastDay = new Date(year + (month == 12 ? 1 : 0), (month == 1 ? 12 : month + 1), 0);
        return lastDay;
    };

    static getQuarterFirstDay(date: any) {
        var month = date.getMonth() - date.getMonth() % 3;
        date.setDate(1);
        date.setMonth(month);
        return date;
    };

    static getQuarterLastDay(date: any) {
        var firstDay = this.getQuarterFirstDay(date);
        var lastDay = moment(firstDay).add(1, 'quarters').add(-1, 'days');
        return lastDay;
    };

    static getYearFirstDay(date: any) {
        date = this.getDateOnly(date);
        date.setMonth(0);
        date.setDate(1);
        return date;
    };

    static getYearLastDay(date: any) {
        date = this.getDateOnly(date);
        date.setMonth(11);
        date.setDate(31);
        return date;
    };

    static getNextPeriod(direction: any, chartData: any) {
        var newDate = this.getDateOnly(new Date());
        switch (direction) {
            case '-':
                newDate = moment(chartData.StartDate).add(-1, 'days').toDate();
                break;
            case '+':
                var newDate = moment(chartData.EndDate).add(1, 'days').toDate();
                break;
            default:
                break;
        }
        switch (chartData.Type) {
            case 'year':
                chartData.StartDate = moment(this.getYearFirstDay(newDate)).toISOString();
                chartData.EndDate = moment(this.getYearLastDay(newDate)).toISOString();
                break;
            case 'quarter':
                chartData.StartDate = moment(this.getQuarterFirstDay(newDate)).toISOString();
                chartData.EndDate = moment(this.getQuarterLastDay(newDate)).toISOString();
                break;
            case 'month':
                chartData.StartDate = moment(this.getMonthFirstDay(newDate)).toISOString();
                chartData.EndDate = moment(this.getMonthLastDay(newDate)).toISOString();
                break;
            default:
                break;
        }
    };
    static getLastMonthsDay(months: any){
        var tempDate = new Date();
        tempDate.setMonth(tempDate.getMonth() - months);
        return tempDate;
    };
}
