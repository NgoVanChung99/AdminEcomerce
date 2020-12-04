import React, { useEffect } from 'react';
import { Header, TableCustomer } from '../../components'
import { Container, NewInput, Flex } from '../../components/style'
import { Icon } from 'antd';
import { connect } from 'react-redux'
import * as actions from '../../store/action'
import { MarginLeft, AlertStyle } from '../../components/style'
import User from './user.js'
import './user.scss'

const UserList = (props) => {
    const { 
        list, 
        dataList,
        listDelete,
        listSearch,
    } = props
    const { loading, status } = dataList
    let timeout;

    const handleSearch = (e) => {
        const text = e.target.value

        if (timeout !== null) {
            clearTimeout(timeout)
        }
        if (e.target.value) {
            timeout = setTimeout(() => {
                listSearch(text)
            }, 500)
        } else {
            list()
        }
    }

    const handleDelete = async (id) => {
        const list = await dataList.list.filter(val => val.id !== id)
        listDelete(id, list)
    }

 
    useEffect(() => {
        list()
    }, [list]);

    

    /*window.addEventListener('scroll', ()=>{
            let scroll =  window.scrollY
            if( scroll>0 ) {
                this.setState({ top: '65px' })
            } else {
                this.setState({ top: '100px' })
            }
        })*/
    //const [products ] = useState(dataList.list)
    console.log("product abc"+dataList.list)


    return (
        <Container>
            <Header title="User" text="CREATE" link="/users/userAddEdit" />
            <Flex style={{ justifyContent: !loading && dataList.list.length <= 0 ? "center" : "space-between" }}>
                <MarginLeft/>
                {status && <AlertStyle message={status ? "Successfully" : "Fail"} type={status ? "success" : "error"} />}        
                {dataList.list.length > 0 && <NewInput style={{ marginRight: 10 }} placeholder="Search UserName" suffix={<Icon type="search" className="certain-category-icon" />} onChange={handleSearch} />}
                
            </Flex>
            {loading && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {(!loading && dataList.list.length > 0 ) ?
                <div className="users">
                    <div className="wrapper-user">
                            <div className="card-user">
                                { 
                                    dataList.list.map( user => <User key={user.id} user={user} /> )
                                } 
                                  
                            </div>              
                        
                    </div>

                </div> : !loading && 'No data'
            }
        </Container>     
    )
}

const mapStateToProps = state => {
    return {
        dataList: state.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        list: () => dispatch(actions.userFetch()),
        listDelete: (params, list) => dispatch(actions.userDelete(params, list)),
        listSearch: (text) => dispatch(actions.userSearch(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)