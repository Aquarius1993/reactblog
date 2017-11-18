import React from 'react'
import {Spin, Pagination} from 'antd'
import '../../style/pigeonhole.scss'
import {
  Link
} from 'react-router'
import {getBlogs, getTime, getCurrentShowLists} from '../action'
class Pigeonhole extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			Dom: [],
      showLoading: true,
      files: []
		}
	}
	pushArr(filesObj, str, item) {
		let obj = {}
		obj.categray = str
		obj.data = []
		obj.data.push(item)
		filesObj.push(obj)
	}
	getPigeOnhode(files) {
		let filesObj = []
		files.map(item => {
      let time = getTime(item.created_at)
			let str = time.slice(0, time.lastIndexOf('-'))
			if (filesObj.length === 0) {
					this.pushArr(filesObj, str, item)
			} else {
				filesObj.map((i, index) => {
					if (i.categray === str) {
						i.data.push(item)
					} else if (index === filesObj.length - 1){
						this.pushArr(filesObj, str, item)
					}
				})
			}
		})
		return filesObj
	}
  getDom(lists) {
    let Dom = []
    lists.map((item, index) => {
      let d = []
      item.data.map((i, index) => {
        d.push(<div className='artilceItem' key={index}>
            <Link to={`/blog/${i.number}`}><p><span className="title">{i.title}</span><span className="time">{getTime(i.created_at)}</span></p></Link>
          </div>)
      })
      Dom.push(<div className="item" key={index}>
        <h2>{item.categray}&nbsp;({item.data.length})</h2>
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
      this.setState({
        files: this.getPigeOnhode(data)
      }, () => {
        this.setCurrentShowLists(1)
      })
    })
	}

	render() {

		return (
			<div className="pigeonhole">
				<Spin size="large" tip="loading..." style={{display: !this.state.showLoading ? 'none' : 'block'}} />
        {this.state.Dom}
        <Pagination style={{display: this.state.showLoading ? 'none' : 'block'}} onChange={this.changePage.bind(this)} total={this.state.files.length} />
			</div>
		);
	}
}

export default Pigeonhole;
