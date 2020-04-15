import { Query } from './query';
export default class URI {
    protocol: string;
    userinfo: string;
    hostname: string;
    port: string;
    path: string;
    query: Query;
    hash: string;
    get queryString(): string;
    get host(): string;
    set host(host: string);
    get href(): string;
    constructor(url?: string);
    resolve(url: string): this;
    private _resolveURIPath;
}
