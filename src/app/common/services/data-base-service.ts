import {IDBPDatabase, openDB} from 'idb';
import {Injectable} from "@angular/core";

@Injectable()
export class DataBaseService {

    private dataBase: Promise<IDBPDatabase>;

    private DATA_BASE_NAME = "app-data-base";
    public storeName = 'store'

    constructor() {
        this.dataBase = openDB(this.DATA_BASE_NAME, 1, {
            upgrade(db) {
                db.createObjectStore('store');
            },
        });
    }

    get = async <T>(key: string) => {
        return (await this.dataBase).get(this.storeName, key);
    };

    set = async <T>(key: string, value: T) => {
        return (await this.dataBase).put(this.storeName, value, key);
    };
}
