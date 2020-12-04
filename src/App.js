import React from 'react';
import 'antd/dist/antd.css';
import { Admin } from './layout'
import { Login, ProductList, ProductAddEdit, ProductView,
         CategoryList, CategoryAddEdit, OrderList, UserProfile,
         UserList, UserAddEdit, CategoryProduct, Dashboard,
         Profile, ProfileEdit, ChangePassword } from './container'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/action/index'

const App = (props) => {
  if (!props.isAuthenticated) {
    props.onTryAutoSignup()
  }

  let auth = (
    <Switch>
      <Route path="/login" component={() => props.isAuthenticated ? null : AuthenRoute(Login)} />
      <Route exact path="/" component={() => AuthenRoute(<ProductList/>)} />
      <Route exact path="/" component={() => AuthenRoute(<CategoryList/>)} />
      <Route exact path="/" component={() => AuthenRoute(<OrderList/>)} />
      <Route exact path="/" component={() => AuthenRoute(<UserList/>)} />

      <Route path="/products/productList" component={() => AuthenRoute(<ProductList/>)} />
      <Route path="/categories/categoryList" component={() => AuthenRoute(<CategoryList/>)} />
      <Route path="/orders/orderList" component={() => AuthenRoute(<OrderList/>)} />
      <Route path="/users/userList" component={() => AuthenRoute(<UserList/>)} />
      <Route path="/dashboard" component={() => AuthenRoute(<Dashboard/>)} />

      <Route path="/products/productAddEdit/:id" component={() => AuthenRoute(<ProductAddEdit/>)} exact/>
      <Route path="/categories/categoryAddEdit/:id" component={() => AuthenRoute(<CategoryAddEdit/>)} exact/>
      <Route path="/users/userAddEdit/:id" component={() => AuthenRoute(<UserAddEdit/>)} exact/>

      <Route path="/products/productAddEdit" component={() => AuthenRoute(<ProductAddEdit/>)} />
      <Route path="/categories/categoryAddEdit" component={() => AuthenRoute(<CategoryAddEdit/>)} />
      <Route path="/users/userAddEdit" component={() => AuthenRoute(<UserAddEdit/>)} />   
      <Route path="/users/profile/:id" component={() => AuthenRoute(<UserProfile/>)} exact />


      <Route path="/admin/profile" component={() => AuthenRoute(<Profile/>)} />
      <Route path="/admin/editProfile/:id" component={() => AuthenRoute(<ProfileEdit/>)} exact />
      <Route path="/user/changePassword/:id" component={() => AuthenRoute(<ChangePassword/>)} exact />

      <Route path="/products/product/:id" component={() => AuthenRoute(<ProductView/>)} exact/>
      <Route path="/categories/:id/product/:id" component={() => AuthenRoute(<ProductView/>)} exact/>


      <Route path="/categories/:id/product" component={() => AuthenRoute(<CategoryProduct/>)} exact/>
    </Switch>
  )

  const AuthenRoute = Component => {
    let ComponentAuthen = null

    //authen
    if (props.isAuthenticated) {
      ComponentAuthen = (
        <Admin>
          {Component}
        </Admin>
      )
    }
    //not authen
    if (!props.isAuthenticated) {
      ComponentAuthen = (
        <Login />
      )
    }
    return ComponentAuthen
  }
  return auth
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null // token from authen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));