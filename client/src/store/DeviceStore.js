import { makeAutoObservable } from 'mobx';

export class DeviceStore {
  constructor() {
    this._devices = [];
    this._page = 1;
    this._totlaCount = 0;
    this._limit = 10;

    makeAutoObservable(this);
  }

  setDevices(devices) {
    this._devices = devices;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(total) {
    this._totlaCount = total;
  }

  setLimit(limit) {
    this._limit = limit;
  }

  get devices() {
    return this._devices;
  }

  get totalCount() {
    return this._totlaCount;
  }

  get page() {
    return this._page;
  }

  get limit() {
    return this._limit;
  }
}
