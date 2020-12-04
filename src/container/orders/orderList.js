import React, { useEffect } from 'react';
import { HeaderOrder, TableOrder } from '../../components'
import { Container, NewInput, Flex } from '../../components/style'
import { Icon } from 'antd';
import { connect } from 'react-redux'
import * as actions from '../../store/action'
import { MarginLeft, AlertStyle } from '../../components/style'

const OrderList = (props) => {
    const { 
        list, 
        dataList,
        listDelete,
        listAccept,
        listRefuse,
        listSearch
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
    const handleAccept = async (id) => {
        //const list = await dataList.list.filter(val => val.id !== id)
        //console.log(list+"id "+id);
        console.log("id "+id);
        listAccept(id)
        // alert(id+"accept")
        window.location.reload(true);
    }

    const handleRefuse = async (id) => {
        //const list = await dataList.list.filter(val => val.id !== id)
        //console.log(list+"id "+id);
        console.log("id "+id);
        listRefuse(id)
        // alert(id+"refuse")
        window.location.reload(true);
    }

    useEffect(() => {
        list()
    }, [list]);

    return (
        <Container>
            <HeaderOrder title="Order" />
            <Flex style={{ justifyContent: !loading && dataList.list.length <= 0 ? "center" : "space-between" }}>
                <MarginLeft/>
                {status && <AlertStyle message={status ? "Successfully" : "Fail"} type={status ? "success" : "error"} />}
                {dataList.list.length > 0 && <NewInput style={{ marginRight: 10 }} placeholder="Search OrderName" suffix={<Icon type="search" className="certain-category-icon" />} onChange={handleSearch} />}
            </Flex>
            {loading && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {(!loading && dataList.list.length > 0 ) ?
                <TableOrder className="listProduct" data={dataList.list} func={{
                    delete: (id) => handleDelete(id),
                    Accept: (id) =>handleAccept(id),
                    Refuse: (id) =>handleRefuse(id),
                }} /> : !loading && 'No data'
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
        list: () => dispatch(actions.orderFetch()),
        listDelete: (params, list) => dispatch(actions.productDelete(params, list)),
        listAccept : (params, list) => dispatch(actions.orderActionAccept(params, list)),
        listRefuse : (params, list) => dispatch(actions.orderActionRefuse(params, list)),
        listSearch: (text) => dispatch(actions.productSearch(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)