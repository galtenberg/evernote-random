const NodeCache = require('node-cache')

module.exports = class Cache {
  constructor(ttlSeconds) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false
    })
  }

  get(key, storeFunction) {
    const value = this.cache.get(key)
    if (value) {
      return Promise.resolve(value)
    }

    return storeFunction().then(result => {
      this.cache.set(key, result)
      return result
    })
  }

  del(keys) {
    this.cache.del(keys)
  }

  delStartWith(startStr = '') {
    if (!startStr) {
      return
    }

    const keys = this.cache.keys()
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key)
      }
    }
  }

  flush() {
    this.cache.flushAll()
  }
}
