export class Query {

  private _query: object = Object.create(null)

  constructor (qs?: string) {
    const decodedQs = decodeURIComponent(qs || '')
    decodedQs.split('&').forEach(item => {
      const [k, v] = item.split('=')
      k && (this._query[k] = v)
    })
  }

  get (key: string) {
    return this._query[key]
  }

  getAll () {
    return Object.assign({}, this._query)
  }

  set (key:string, value: string) {
    this._query[key] = value
  }

  remove (key: string) {
    delete this._query[key]
  }

  toString (encode: boolean = true) {
    const convert = encode
      ? (key: string) => `${key}=${encodeURIComponent(this._query[key])}`
      : (key: string) => `${key}=${this._query[key]}`
    const qs = Object.keys(this._query).map(convert).join('&')
    return qs && '?' + qs
  }
}
