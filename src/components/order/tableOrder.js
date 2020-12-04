import React from 'react'
import { Table, Avatar } from 'antd';
import { ModalOrder,ActionOrder } from '../../components'
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
            title: 'Image',
            dataIndex: 'imagePath',
            key: 'imagePath',
        },
        {
            title: 'Total',
            dataIndex: 'Total',
            key: 'Total',
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
        },
    ];

    const data = props.data.map((val, i) => {
        let is_order=""
        if(val.status === 1)
        {
            is_order = "Accept"
        }
        else {
            if(val.status === 2 ){
                is_order = "Refuse"
            }
            else{
                is_order = "Check ?"
            }
        }
        
        return {
            key: val.id,
            //ID: i + 1,
            ID: val.id,
            Name: val.shipName,
            Total: val.totalPrice ,
            Status: is_order ,
            Date: moment(val.approvalDate).format('DD/MM/YYYY HH:mm:ss'),
            imagePath: <Avatar src={ val.imagePath ? val.imagePath : null} icon="shop" />,
            Action: <ActionOrder icon="edit" funcs={() =>{val.status === 1 ? func.Refuse(val.id) : func.Accept(val.id)}} />,
            delete: <ModalOrder icon="delete" funcs={() =>func.delete(val.id)} />
        }

    })
    return <Table columns={columns} dataSource={data} />
}

export default TableList