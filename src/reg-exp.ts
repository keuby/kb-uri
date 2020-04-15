// const genDelims = '[:/?#\\[\\]@]'

const scheme = '[a-zA-Z][a-zA-Z0-9+-.]*'
const subDelims = '[!$&\'()*+,;=]'
const unreserved = '[a-zA-z0-9-._~]'
const pctEncoded = '(?:%[0-9a-fA-F]{2})'
const pchar = `${unreserved}|${pctEncoded}|${subDelims}|:|@`
const segment = `(?:${pchar})*`

const userinfo = `((?:${unreserved}|${pctEncoded}|${subDelims}|:)*)`
const host = `(?:([^/?#:]*))`
const port = `([0-9]*)`
const authority = `(?:${userinfo}@)?${host}(?::${port})?`
const abemptyPath = `((?:/${segment})*)`
// const relativePath = `(${segment}(?:/${segment})*)`
const hierPath = `(?:(?://${authority}${abemptyPath})|${abemptyPath})`

const query = `((?:${pchar}|[/?])*)`
const fragment = `((?:${pchar}|[/?])*)`

export const URIRegExp = new RegExp(`^(?:(${scheme}):)?${hierPath}(\\?${query})?(#${fragment})?$`)
// export const RelURIRegExp = new RegExp(`^${relativePath}(\\?${query})?(#${fragment})?$`)
