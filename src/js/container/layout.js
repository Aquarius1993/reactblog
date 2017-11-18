import {
  Layout,
  Menu,
  Icon
} from 'antd';
import React from 'react';
import '../../style/layout.scss'
import {
  Link
} from 'react-router';
const {
  Header, Footer, Content
} = Layout;

class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      index: ['1']
    }
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  // 确定菜单的active项
  componentWillMount() {
    let path = window.location.hash.substring(2);
    if (path.startsWith('home')) {
      this.setState({
        index: ['1']
      })
    } else if (path.startsWith('pigeonhole')) {
      this.setState({
        index: ['2']
      })
    } else if (path.startsWith('tags')) {
      this.setState({
        index: ['3']
      })
    } else {
      this.setState({
        index: ['1']
      })
    }
  }
  render() {
    return (
       <Layout className="layout">
        <Header>
          <div className="name">Aquarius1993</div>
          <Menu theme="dark"  mode="horizontal" defaultSelectedKeys={this.state.index}>
            <Menu.Item key="3">
              <Link to='/tags'>
                <Icon type="tags" />
                <span className="nav-text">标签</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/pigeonhole'>
                <Icon type="laptop" />
                <span className="nav-text">归档</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to='/home'>
                <Icon type="home" />
                <span className="nav-text">主页</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
      {this.props.children}
          </Content>
        </Layout>
        <Footer>
          <p className="author">Aquarius1993</p>
        </Footer>
      </Layout>
    );
  }
}

export default SiderDemo;
