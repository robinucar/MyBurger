import React, { Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder'


class App extends Component{


  render(){
    return(
      <div>

      <Layout>
        <BurgerBuilder />
      </Layout>

      </div>
    )
  }
}
export default App;