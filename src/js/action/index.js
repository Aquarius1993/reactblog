import axios from 'axios'
import {url, label, creator} from '../constants'

export function getBlogs() {
  return axios.get(url, {
      params: {
        creator: creator,
        labels: label,
      },
    }).then(response => {
      console.log(response)
      return response.data
    })
}
export function getTags(labels) {
  let arr = []
  labels.map((item, index) => {
    if (item.name !== label) {
      arr.push(item.name)
    }
    return true
  })
  return arr
}
export function getTime(time) {
  return time.substring(0, time.indexOf('T'))
}

export function getCurrentShowLists(files, page) {
  let p = page -1
  let lists = (p + 1) * 10 > files.length ? files.slice(p * 10) : files.slice(p * 10, (p + 1) * 10)
  return lists
}
