import React from 'react';
import { Row, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
import { ModalUser } from '../../components';

const { Title } = Typography;

const Header = ({ title, link, text, path ,func}) => (
    <div>
        
        <Row justify="space-between" type="flex">
            <Title level={2}>{title}</Title>
            <div>
                <Button type="primary" style={{ marginTop: 7, marginRight: 10 }} id="button-direct">
                    <Link to={link}>{text}</Link>
                </Button>
                <Button type="primary" style={{ marginTop: 7, marginLeft: 20 }} >
                    <ModalUser funcs={() => func.delete(path)}/>
                </Button>
                <Button type="primary" style={{ marginTop: 7, marginLeft: 20 }} >
                    <Link to={`/users/userAddEdit/${path}`}>EDIT</Link>
                </Button>
                
            </div>
        </Row>
        <hr />
    </div>
)

export default Header