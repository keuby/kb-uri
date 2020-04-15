import { isDef } from './util'
import { Query } from './query'
import { URIRegExp } from './reg-exp'

export default class URI {

  public protocol: string

  public userinfo: string

  public hostname: string

  public port: string

  public path: string

  public query: Query = new Query()

  public hash: string

  get queryString () {
    return this.query.toString()
  }

  get host () {
    return this.port ? `${this.host}:${this.port}` : this.host
  }

  set host (host: string) {
    host = String(host)
    const splited = host.split(':')
    this.hostname = splited[0]
    this.port = splited[1] || ''
  }

  get href () {
    let href = `${this.protocol}:`
    let authority = ''
    if (this.hostname) {
      authority = this.hostname
      if (this.port) {
        authority = `${authority}:${this.port}`
      }
      if (this.userinfo) {
        authority = `${this.userinfo}@${authority}`
      }
      href += `//${authority}`
    }

    return href + this.path + this.queryString + this.hash
  }

  constructor (url?: string) {
    if (!isDef(url) && typeof location !== 'undefined') {
      url = location.href
    }
    this.resolve(url)
  }

  public resolve (url: string) {
    if (URIRegExp.test(url)) {
      this._resolveURIPath(url)
    } else {
      throw new TypeError('Invalid URL')
    }
    return this
  }

  private _resolveURIPath (url: string) {
    const matched = URIRegExp.exec(url)
    this.protocol = matched[1] || ''
    this.userinfo = matched[2] || ''
    this.hostname = matched[3] || ''
    this.port = matched[4] || ''
    this.path = matched[5] || matched[6] || ''
    this.query = new Query(matched[8] || '')
    this.hash = matched[9] || ''
  }
}
