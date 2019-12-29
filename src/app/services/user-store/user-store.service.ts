import { Injectable } from '@angular/core';
import * as moment from "moment";

export class UserStore {
    id:string;
    expire: number;
    options: any;
    constructor(id, expire) {
        this.id = id;
        this.expire = expire;

        this.options = this.__getObject();
        this.__saveObject();
    }

    clear() {
        this.options = {};
        this.__saveObject();
    }

    isEmpty() {        
        return Object.keys(this.options).length == 0;
    }

    getOptions() {
        return this.options;
    }

    getOption(name) {
        return this.options[name];
    }

    setOption(name, value) {
        this.options[name] = value;
        this.__saveObject();
    }

    __getObject() {
        if (window.localStorage[this.id]) {
            var object = JSON.parse(window.localStorage[this.id]);
            if (moment(object.expireAt).toDate() > new Date()) {
                return object.options;
            }
        }
        return {};
    }

    __saveObject() {
        if (this.isEmpty()) {
            window.localStorage.removeItem(this.id);
        } else {
            var expireAt = moment().add(this.expire, 'seconds').toDate();
            var rawObject = {
                options: this.options,
                expireAt: expireAt
            };

            window.localStorage[this.id] = JSON.stringify(rawObject);
        }
    }
}

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
    userStore: UserStore;
    constructor () {
        this.userStore = new UserStore('userStore', 12 * 60 * 60);
    }
    getUserStore(): UserStore {
        return this.userStore;
    }
}
