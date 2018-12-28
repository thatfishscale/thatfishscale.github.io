export class Main {

  getDomain () {
    return 'bathroomatahouseparty.com'
  }

  getVideoDomain () {
    return `//videos.${this.getDomain()}`
  }

  paginator (items, page = 1, perPage = 32) {
    let offset = (page - 1) * perPage
    let paginatedItems = items.slice(offset).slice(0, perPage)
    let totalPages = Math.ceil(items.length / perPage)

    return {
      page: page,
      perPage: perPage,
      prePage: page - 1 ? page - 1 : null,
      nextPage: (totalPages > page) ? page + 1 : null,
      total: items.length,
      totalPages: totalPages,
      data: paginatedItems
    }
  }

  getKeywords (data) {
    let keywords = []
    for (let key in data) {
      if (data.hasOwnProperty(key) && data[key].keywords) {
        let keys = data[key].keywords.split(',')
        for (let i = 0; i < keys.length; i++) {
          let key = this.ucWords(keys[i].trim().toLowerCase())
          if (keywords.indexOf(key) === -1 && key !== '') keywords.push(key)
        }
      }
    }

    return keywords.sort()
  }

  filterKeyword (videos, keyword) {
    return videos.filter(key => {
      if (!key.keywords) return false

      return key.keywords.indexOf(keyword) !== -1
    })
  }

  filterSearch (videos, keyword) {
    let toMatch = keyword.split(' ').length > 1 ? '(?=.*?\\b' + keyword.split(' ').join(')(?=.*?\\b') + ').*' : keyword

    return videos.filter(key => {
      if (!key.title) return false

      return key.title.toLowerCase().match(new RegExp(toMatch, 'g'))
    })
  }

  ucWords (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  refToArray (data) {
    let videosArray = []
    for (let key in data) {
      if (data.hasOwnProperty(key) && data[key].timestamp) {
        videosArray.push(data[key])
      }
    }

    return this.sortBy(videosArray, 'timestamp')
  }

  sortBy (data, type) {
    data.sort((a, b) => {
      if (a[type] && b[type]) {
        if (b[type] < a[type]) return -1
        if (b[type] > a[type]) return 1
      }

      return 0
    })
    return data
  }

  /**
   * @param href
   * @returns {HTMLElement}
   */
  getLocation (href) {
    const l = document.createElement('a')
    l.href = href
    return l
  }

  isLocal (uri) {
    let hostname = main.getLocation(uri).hostname

    if (hostname === 'videos.bathroomatahouseparty.com') return true

    return ['localhost', '127.0.0.1', 'bathroomatahouseparty.com'].indexOf(hostname) !== -1
  }

  resetVideos() {
    let time = localStorage.getItem('tbaahp_time')
    if (!time) {
      localStorage.setItem('tbaahp_time', new Date().getTime().toString())
    } else {
      if (new Date().getTime() - parseInt(time) > 60000) {
        localStorage.removeItem('tbaahp_videos')
        localStorage.setItem('tbaahp_time', new Date().getTime().toString())
      }
    }
  }
}

export const main = new Main()
