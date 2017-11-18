import React from 'react'
import axios from 'axios'
import marked from 'marked'
import {getTime} from '../action'
import PropTypes from 'prop-types'
import '../../style/comments.scss'
 class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentsDom: [],
      show: false
    }
  }
  getComents() {
    axios.get(this.props.url).then(res => {
      let data = res.data
      if( data.length === 0) {
        return false
      }
      this.setState({
        commentsDom: this.getCommentsDom(data)
      }, () => {
        this.setState({
          show: true
        })
      })
    })
  }
  getCommentsDom(commentsLists) {
    let dom = []
    commentsLists.map((item, index) => {
      dom.push(<div className="comments-item" key={index}>
        <div className="pull-left">
          <a target="_blank" href={item.user.html_url}>
            <img className="avatar-32" src={item.user.avatar_url} />
          </a>
        </div>
        <div className="comments-content">
          <div className="comment-trigger">
            <strong><a target="_blank" href={item.user.html_url}>{item.user.login}</a></strong>
            <span>  ·  {getTime(item.created_at)}</span>
          </div>
          <div className="fmt mb10">
            <p dangerouslySetInnerHTML={{ __html: marked(item.body) }}></p>
          </div>
        </div>
      </div>)
    })
    return dom
  }
  componentWillReceiveProps () {
    if (this.props.url === '') {
      return false
    }
    this.getComents()
  }
  componentWillMount() {
    marked.setOptions({
      highlight: code => require('highlight.js').highlightAuto(code).value
    })
  }
	render() {

		return (
			<div className='comments'>
        <div style={{display: this.state.show ? 'block' : 'none'}}>
          <h4 className="post-comment-title"></h4>
          <div className="comments-title">
             <strong className="comments-stat">{this.props.number} 条评论</strong>
          </div>
          <div>
            {this.state.commentsDom}
          </div>
        </div>
			</div>
		)
	}
}
Comments.defaultProps = {
  url: '',
  number: 0,
};
Comments.propTypes = {
  url: PropTypes.string,
  number: PropTypes.number
};
export default Comments
