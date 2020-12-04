import React, { useEffect } from 'react';
import { Header } from '../../components'
import { Container, NewInput, Flex } from '../../components/style'
import { Icon } from 'antd';
import { connect } from 'react-redux'
import * as actions from '../../store/action'
import { MarginLeft, AlertStyle } from '../../components/style'
import '../products/products.scss'
import Product from '../products/Product.js'
import { withRouter } from 'react-router-dom'


const ProductListCategory = (props) => {
    const idParam = props.match.params.id
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

    const handleDelete = async (_id) => {
        const list = await dataList.list.filter(val => val._id !== _id)
        listDelete(_id, list)
    }

 
    useEffect(() => {
        list(idParam)
    }, [list]);



    return (
        <Container>
            <Header title="ProductList" text="CREATE" link="/products/productAddEdit" />
            <Flex style={{ justifyContent: !loading && dataList.list.length <= 0 ? "center" : "space-between" }}>
                <MarginLeft/>
                {status && <AlertStyle message={status ? "Successfully" : "Fail"} type={status ? "success" : "error"} />}        
                {dataList.list.length > 0 && <NewInput style={{ marginRight: 10 }} placeholder="Search productName" suffix={<Icon type="search" className="certain-category-icon" />} onChange={handleSearch} />}
                
            </Flex>
            {loading && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {(!loading && dataList.list.length > 0 ) ?
                <div className="products">
                    <div className="wrapper">
                            <div className="card">
                                { 
                                    dataList.list.map( product => <Product key={product.id} product={product} /> )
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
        list: (params) => dispatch(actions.productFetchCategory(params)),
        listDelete: (params, list) => dispatch(actions.productDelete(params, list)),
        listSearch: (text) => dispatch(actions.productSearch(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductListCategory))



   