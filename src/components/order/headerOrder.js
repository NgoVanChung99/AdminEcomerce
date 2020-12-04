import React from 'react';
import { Row, Typography } from 'antd'

const { Title } = Typography;

const Header = ({ title, link, text, create, loading }) => (
    <div>
        {create}
        <Row justify="space-between" type="flex">
            <Title level={2}>{title}</Title>
        </Row>
        <hr />
    </div>
)

export default Header