import React from 'react';
import {Spin, Pagination} from 'antd';
import '../../style/tags.scss'
import { Link } from 'react-router'
import {getBlogs, getTags, getCurrentShowLists} from '../action'
class Tags extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Dom: [],
      showLoading: true,
      files: []
    }
  }
  delSameLabel(files) {
    files.map(item => {
      let arr =Array.from(new Set(item.tags))
      item.tags = arr
    })
    return files
  }
  getListsByTags(files) {
    let arr = []
    files.map((item , index) => {
      let tags = getTags(item.labels)
      if (arr.length === 0) {
        if (tags.length) {
          tags.map(i => {
            let obj = {}
            obj.data = []
            obj.tag = i
            obj.data.push(item)
            arr.push(obj)
          })
        }
      } else {
        tags.map(i => {
          for(let j = 0; j < arr.length; j++) {
            if (arr[j].tag === i) {
              arr[j].data.push(item)
              break
            } else if (j === arr.length -1) {
              let obj = {}
              obj.data = []
              obj.tag = i
              obj.data.push(item)
              arr.push(obj)
              break
            }
          }
        })
      }
    })
    return arr
  }
  getDom(arr) {
    let Dom = []
    arr.map((item, index) => {
      let d = []
      item.data.map((i, index) => {
        d.push(<div className='artilceItem' key={index}>
            <Link to={`/blog/${i.number}`}><p><span className="title">{i.title}</span><span className="tag">{getTags(i.labels).join('、')}</span></p></Link>
          </div>)
      })
      Dom.push(<div className="item" key={index}>
        <h2>{item.tag}&nbsp;({item.data.length})</h2>
        {d}
      </div>)
    })
    return Dom
  }
  setCurrentShowLists(page) {
    let filesList = [], files = this.state.files
    filesList = this.getDom(getCurrentShowLists(files, page))
    this.setState (
      {
        Dom: filesList
      }, () => {
        this.setState({
          showLoading: false
        })
      }
    )
  }
  changePage(page, pageSize) {
    this.setCurrentShowLists(page)
  }
  componentWillMount() {
    getBlogs().then(data => {
      let arr = this.getListsByTags(this.delSameLabel(data))
      this.setState({
        files: arr
      }, () => {
        this.setCurrentShowLists(1)
      })
    })
  }
	render() {
		return (
			<div className='tags'>
        <Spin size="large" tip="loading..." style={{display: !this.state.showLoading ? 'none' : 'block'}} />
        {this.state.Dom}
        <Pagination style={{display: this.state.showLoading ? 'none' : 'block'}} onChange={this.changePage.bind(this)} total={this.state.files.length} />
			</div>
		)
	}
}

export default Tags;
