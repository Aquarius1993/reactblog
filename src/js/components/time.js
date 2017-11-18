import React from 'react'
import {
  Icon
} from 'antd'
import {getTime} from '../action'
import PropTypes from 'prop-types'
class Time extends React.Component{
  render() {
    return (
      <span>
        <Icon type="calendar"/>&nbsp;<span>{getTime(this.props.created_at)}</span>
      </span>
    )
  }
}
Time.defaultProps = {
  created_at: ''
}
Time.propTypes = {
  created_at: PropTypes.string
}
export default Time
