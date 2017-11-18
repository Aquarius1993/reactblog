import React from 'react'
import {
	Pagination,
	Icon,
  Spin
} from 'antd';
import {
  Link
} from 'react-router'
import '../../style/blog.scss'
import '../../style/artilceItem.scss'
import {getBlogs, getCurrentShowLists} from '../action'
import {splitStr} from '../constants'
import Time from '../components/time'
import Tgas from '../components/tag'
let files = []
class Blog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentLists: [],
      showLoading: true
		}
	}

	setCurrentShowLists(page) {
		let  filesList = []
		getCurrentShowLists(files, page).map((item, index) => {
			filesList.push(<div className='artilceItem' key={index}>
				<Link to={`/blog/${item.number}`}><h2>{item.title}</h2></Link>
        	<Time created_at={item.created_at}/>&nbsp;&nbsp;<Tgas labels={item.labels}/>
        	<Link to={`/blog/${item.number}`}><p className="articel-des">{item.body.split(splitStr)[0]}</p></Link>
				</div>)
      return true
		})
		this.setState (
			{
				currentLists: filesList
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
    getBlogs().then(item => {
      files = item
      this.setCurrentShowLists(1)
    })
	}
	render() {

		return (
			<div className='blog'>
        <Spin size="large" tip="loading..." style={{display: this.state.showLoading ? 'block' : 'none'}} />
				{this.state.currentLists}
				<Pagination style={{display: this.state.showLoading ? 'none' : 'block'}} onChange={this.changePage.bind(this)} total={files.length} />
			</div>
		);
	}
}
export default Blog;
