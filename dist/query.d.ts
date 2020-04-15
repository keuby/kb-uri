export declare class Query {
    private _query;
    constructor(qs?: string);
    get(key: string): any;
    getAll(): {} & object;
    set(key: string, value: string): void;
    remove(key: string): void;
    toString(encode?: boolean): string;
}
