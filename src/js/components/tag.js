import React from 'react'
import {Icon} from 'antd'
import {getTags} from '../action'
import PropTypes from 'prop-types'

class Tags extends React.Component{
  render() {
    return (
      <span>
        <Icon style={{display: this.props.labels.length > 0 ? 'inline-block' : 'none' }} type="tag-o"/><span> {getTags(this.props.labels).join('、')}</span>
      </span>
    )
  }
}

Tags.defaultProps = {
  labels: []
}
Tags.propTypes = {
  labels: PropTypes.array
}
export default Tags
