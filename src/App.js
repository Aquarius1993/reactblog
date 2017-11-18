import React from 'react';

import {
  Router,
  Route,
  hashHistory,
  IndexRoute
} from 'react-router';

import './App.css';
import Layout from './js/container/layout'
import Pigeonhole from './js/container/pigeonhole'
import Blog from './js/container/blog'
import Tags from './js/container/tags'
import ArticleDetail from './js/container/aticleDetail.js'


class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
          <Route path='/' component={Layout}>
            <IndexRoute component={Blog} />
            <Route path='home' component={Blog}></Route>
            <Route path='pigeonhole' component={Pigeonhole}></Route>
            <Route path={`blog/:name`} component={ArticleDetail}></Route>
            <Route path='tags' component={Tags}></Route>
          </Route>
      </Router>
    );
  }
}

export default App;
