import React from 'react'
import { Table } from 'antd';
import { ModalCategory } from '../../components'
import { Link } from 'react-router-dom'
import moment from 'moment';

const TableList = (props) => {
    const { func } = props
    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'DisplayOrder',
            dataIndex: 'DisplayOrder',
            key: 'DisplayOrder',
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
        },
        {
            title: 'Product',
            dataIndex: 'Product',
            key: 'Product',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
        },
    ];

    const data = props.data.map((val, i) => {
        
        return {
            key: i + '_' + val.name,
            //ID: i + 1,
            ID: val.id,
            Name: val.name,
            DisplayOrder: val.displayOrder,
            Date: moment(val.createdDate).format('DD/MM/YYYY HH:mm:ss'),
            Product: <Link to={`/categories/${val.id}/product`} >View</Link>,
            Action: <div><Link to={`/categories/categoryAddEdit/${val.id}`}><ModalCategory icon="edit" /></Link><ModalCategory icon="delete" funcs={() =>
                func.delete(val.id)}
            /></div>, 
        }

    })

    return <Table columns={columns} dataSource={data} />
}

export default TableList