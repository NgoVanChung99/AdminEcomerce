import React, { useState } from 'react';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { Title } from '../components'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import * as actions from '../store/action'
import { connect } from 'react-redux'
import { NewInput_au } from '../components/style.js'


const { Header, Sider, Content } = Layout;

const Admin = ({ children, onLogout, history }) => {

    const handleLogout = () => {
        onLogout(() => history.push('/login'))
    }
    const [collapsed, setCollapsed] = useState(false);

    
    const handleSearch = (e) => {
       return;
    }
    
///users/profile/1
    const menu = (
          <Menu>
            <Menu.Item>
                <Link to="/admin/profile">
                    <Icon type="user" />
                    <span>Profile</span>           
                </Link>
            </Menu.Item>
            <Menu.Item>
              
            </Menu.Item>
            <Menu.Item key="logout" onClick={() => handleLogout()}>
                        <Icon type="logout" />
                        <span>Logout</span>
                    </Menu.Item>
          </Menu>
        );
    return (
        <Layout style={{ height: '100%' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu mode="inline" defaultSelectedKeys={['0']} theme="dark" >
                    <Menu.Item key="0" style={{ marginBottom: '3rem', marginTop: '1rem' }}>
                        <Icon type="shopping-cart" style={{ fontSize: 18 }} />
                        <Title>Web admin</Title>
                    </Menu.Item>

                    <Menu.Item key="1" >
                        <Link to="/dashboard">
                            <Icon type="home" />
                            <span>Dashboard</span>                         
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="2" >
                        <Link to="/products/productList">
                            <Icon type="shop" />
                            <span>Product</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="3">
                        <Link to="/categories/categoryList">
                            <Icon type="tags" />
                            <span>Category</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="4">
                        <Link to="/orders/orderList">
                            <Icon type="shopping-cart" />
                            <span>Order</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="5">
                        <Link to="/users/userList">
                            <Icon type="user" />
                            <span>Customer</span>
                        </Link>
                    </Menu.Item>

                    
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div className="Header-header">
                    <Icon
                        className="trigger"
                        style={{ marginLeft: "1rem" }}
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                    <span>
                        <NewInput_au placeholder="Search " suffix={<Icon type="search" className="certain-category-icon" />} onChange={handleSearch} />
                    </span>  
                    <span className="icon-icon" style={{ marginLeft: "27rem" }}>                           
                            <Icon type="bell"  style={{ marginLeft: "1rem" }}/>
                            <Dropdown overlay={menu} placement="bottomRight">
                              <Icon type="setting" style={{ marginLeft: "1rem" }}/> 
                            </Dropdown>       
                    </span>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Admin))



