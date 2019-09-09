import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }
  //时间日期
  dateToYYMMDDHHMMSS(date: Date): string {
    var y = date.getFullYear();
    var M = ((date.getMonth() + 1) >= 10 ? '' : '0') + (date.getMonth() + 1);
    var d = (date.getDate() >= 10 ? '' : '0') + date.getDate();
    var h = (date.getHours() >= 10 ? '' : '0') + date.getHours();
    var m = (date.getMinutes() >= 10 ? '' : '0') + date.getMinutes();
    var s = (date.getSeconds() >= 10 ? '' : '0') + date.getSeconds();
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
  };
  dateToYYMMDD(date: Date): string {
    var y = date.getFullYear();
    var M = ((date.getMonth() + 1) >= 10 ? '' : '0') + (date.getMonth() + 1);
    var d = (date.getDate() >= 10 ? '' : '0') + date.getDate();
    return y + '-' + M + '-' + d;
  };
  dateToMMDD(date: Date): string {
    var M = ((date.getMonth() + 1) >= 10 ? '' : '0') + (date.getMonth() + 1);
    var d = (date.getDate() >= 10 ? '' : '0') + date.getDate();
    return M + '-' + d;
  }
  dateToHHMMSS(date: Date): string {
    var h = (date.getHours() >= 10 ? '' : '0') + date.getHours();
    var m = (date.getMinutes() >= 10 ? '' : '0') + date.getMinutes();
    var s = (date.getSeconds() >= 10 ? '' : '0') + date.getSeconds();
    return h + ':' + m + ':' + s;
  };
  stringToDate(str: string): Date {
    var date = new Date(str.replace(/-/g, '/'));
    return date;
  };
  addYear(date: Date, year: number): Date {
    var y = date.getFullYear();
    return new Date(date.setFullYear(y + year));
  };
  addMonth(date: Date, month: number): Date {
    var d1 = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + month);
    var d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    date.setDate(Math.min(d1, d2));
    return new Date(date);
  };
  addDay(date: Date, day: number): Date {
    var d = date.getDate();
    return new Date(date.setDate(d + day));
  };
  getYear(date: Date): number {
    var y = date.getFullYear();
    return y;
  };
  getMonth(date: Date): number {
    var M = date.getMonth() + 1;
    return M;
  };
  getDate(date: Date): number {
    var d = date.getDate();
    return d;
  };
  getHour(date: Date): number {
    var h = date.getHours();
    return h;
  };
  getMinute(date: Date): number {
    var m = date.getMinutes();
    return m;
  };
  getSecond(date: Date): number {
    var s = date.getSeconds();
    return s;
  };
  getDayStart(date: Date): Date {
    return new Date((date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + date.getDate());
  };
  getDayEnd(date: Date): Date {
    return new Date((date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + '23:59:59');
  };
  secondToHHMMSS(seconds: number): string {
    var temp = 0;
    var str = '';
    temp = parseInt(seconds / 3600 + '');
    str += (temp < 10) ? '0' + temp + ':' : '' + temp + ':';
    temp = parseInt(seconds % 3600 / 60 + '');
    str += (temp < 10) ? '0' + temp + ':' : '' + temp + ':';
    temp = parseInt(seconds % 3600 % 60 + '');
    str += (temp < 10) ? '0' + temp : '' + temp;
    return str;
  }
  //随机数
  getBooleanRandom(min, max) {
    var i = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    return i == 0 ? false : true;
  };
  getIntRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  getStringRandom(length, seed) {
    var s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (arguments[1]) {
      s = seed;
    }
    var str = '';
    for (var i = 0; i < length; i++) {
      str += s.charAt(Math.floor(Math.random() * s.length));
    }
    return str;
  }
  //web
  setCookie(name, value) {
    document.cookie = name + '=' + value + ';path=/';
  };
  getCookie(name) {
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    var arr = document.cookie.match(reg);
    if (arr) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  };
  isInnerIp(url) {
    var reg1 = /(http|ftp|https|www):\/\//g;
    url = url.replace(reg1, '');
    var reg2 = /\:+/g;
    url = url.replace(reg2, '.');
    var urlArr = url.split('.');
    var ip = urlArr[0] + '.' + urlArr[1] + '.' + urlArr[2] + '.' + urlArr[3];
    var ipNum = this._getIpNum(ip);
    var aBegin = this._getIpNum('10.0.0.0');
    var aEnd = this._getIpNum('10.255.255.255');
    var bBegin = this._getIpNum('172.16.0.0');
    var bEnd = this._getIpNum('172.31.255.255');
    var cBegin = this._getIpNum('192.168.0.0');
    var cEnd = this._getIpNum('192.168.255.255');
    var dBegin = this._getIpNum('127.0.0.0');
    var dEnd = this._getIpNum('127.255.255.255');
    return ((ipNum >= aBegin) && (ipNum <= aEnd)) ||
      ((ipNum >= bBegin) && (ipNum <= bEnd)) ||
      ((ipNum >= cBegin) && (ipNum <= cEnd)) ||
      ((ipNum >= dBegin) && (ipNum <= dEnd));
  }
  private _getIpNum(ip) {
    var ipArr = ip.split('.');
    var a = parseInt(ipArr[0]);
    var b = parseInt(ipArr[1]);
    var c = parseInt(ipArr[2]);
    var d = parseInt(ipArr[3]);
    var ipNum = a * 256 * 256 * 256 + b * 256 * 256 + c * 256 + d;
    return ipNum;
  };
  //util
  isNull(obj) {
    return (obj === undefined || obj === null || obj === '' || JSON.stringify(obj) === '{}') ? true : false;
  };
  isNumber(obj) {
    var reg = /^[0-9]*$/;
    return reg.test(obj);
  };
  parameterTransfer(value, out) {
    if (this.isNull(value)) {
      return out;
    } else {
      return value;
    }
  };
  binaryDecode(number, p) {
    //从右向左数，第一个数是第一位，p传1，依次类推
    var position = Math.pow(2, p - 1);
    return (number & position) === position ? 1 : 0;
  };
  binaryDecode2(number, p): any {
    let oc = 1;
    let c = oc << (p - 1);
    return (c & number) != 0 ? 1 : 0;
  }

}
