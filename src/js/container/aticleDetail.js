import {Spin} from 'antd'
import React from 'react'
import marked from 'marked'
import axios from 'axios'
import {url} from '../constants'
import '../../style/article.scss'
import Comments from '../components/comments'
class ArticleDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: {
        title: '',
        created_at: '',
        body: ''
      },
      showLoading: true,
      commentsNumber: 0,
      url: '',
      issue_url: ''
    }
  }
	componentWillMount() {
    let _self = this
    let id = this.props.params.name
    axios.get(url + '/' + id).then(response => {
      let data = response.data
      _self.setState({
        content: data,
        url: data.comments_url,
        commentsNumber: data.comments,
        issue_url: data.html_url || data.web_url
      }, () => {
        _self.setState({
          showLoading: false
        })
      })
    })
		marked.setOptions({
			highlight: code => require('highlight.js').highlightAuto(code).value
		})
	}
	render() {
		return (
			<div className="article">
        <Spin size="large" tip="loading..." style={{display: this.state.showLoading ? 'block' : 'none'}} />
				<div className="article-title">{this.state.content.title}</div>
				<div className="article-time">{this.state.content.created_at.substring(0, this.state.content.created_at.indexOf('T'))}</div>
				<div className="article-detail" dangerouslySetInnerHTML={{ __html: marked(this.state.content.body) }}></div>
        <Comments url={this.state.url} number={this.state.commentsNumber}/>
			  <a style={{display: !this.state.showLoading ? 'block' : 'none',float: 'right'}} href={this.state.issue_url}>发表评论</a>
      </div>
		)
	}
}

export default ArticleDetail
