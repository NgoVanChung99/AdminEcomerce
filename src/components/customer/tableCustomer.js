import React from 'react'
import { Table, Avatar } from 'antd';
import { ModalCategory } from '../../components'
import { Link } from 'react-router-dom'
//import moment from 'moment';

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
            title: 'Avatar',
            dataIndex: 'imagePath',
            key: 'imagePath',
        },
        {
            title: 'Gender',
            dataIndex: 'Gender',
            key: 'Gender',
        },
        {
            title: 'Phone',
            dataIndex: 'Phone',
            key: 'Phone',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
        },
    ];

    const data = props.data.map((val, i) => {
        return {
            key: i + '_' + val.productName,
            ID: i + 1,
            Name: val.productName,
            Gender: val.Gender,
            Phone: val.Phone,
            imagePath: <Avatar src={ val.imagePath ? val.imagePath : null} icon="shop" />,
            edit: <Link to={`/categories/categoryAddEdit/${val._id}`}><ModalCategory icon="edit" /></Link>,
            delete: <ModalCategory icon="delete" funcs={() =>
                func.delete(val._id)}
            />
        }

    })
    return <Table columns={columns} dataSource={data} />
}

export default TableList