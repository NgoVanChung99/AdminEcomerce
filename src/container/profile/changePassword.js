/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Header } from '../../components'
import { Container } from '../../components/style'
import { Form, Icon, Input,  Col  } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/action'

const ChangePassWord = (props) => {
    //const [userDescription, setUserDescription] = useState("")
    //const [validate, setValidate] = useState(true)
    const [initData, setInit] = useState(false)
    const idParam = props.match.params.id
    const { 
        save, 
        loading,
        userEditGet,
        loadingEdit,
        userEdit
    } = props
    const { getFieldDecorator } = props.form;

    
    

    const handleSubmit = e => {
        e.preventDefault();
        // props.form.validateFields(async (err, values) => {
        //     var dataUser = 
        //     {
        //       "email": "string",
        //       "password": values.NewPassWord,
        //       "name": "string",
        //       "gender": true,
        //       "phone": "string"
        //     }
    
            
        // }
    };

    useEffect(() => {
        if(idParam && initData === false){
            userEditGet(idParam).then(val => {
                setInit(val)
                //setUserDescription(val.userDescription)
            })
            //setValidate(true)
        }
    }, [initData])

    return (
        <Container>
            {loadingEdit && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {
                !loadingEdit &&  <Form className="login-form" onSubmit={handleSubmit}>
                <Header title={initData ? "ChangePassWord " + initData.name : "ChangePassWord"} text="BACK" link="/admin/profile" create={true} loading={loading}/>
                    <Col span={1} />
                    <Col span={15} style={{ position: "relative", top: 15 }}>
                        <Form.Item>
                            {getFieldDecorator('oldPassWord', {
                                rules: [{ required: true, message: 'Please input your OldPassWord!' }],
                                initialValue: initData ? initData.oldPassWord: null
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="OldPassWord"
                                    type="password"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('NewPassWord', {
                                rules: [{ required: true, message: 'Please input your name!' }],
                                initialValue: initData ? initData.NewPassWord: null
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="NewPassWord"
                                    type="password"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('RePassWord', {
                                rules: [{ required: true, message: 'Please input your RePassWord!' }],
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Enter the password"
                                    type="password"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>
                        <input type="submit" value="Submit" onSubmit={handleSubmit}/>
                </Col>
            </Form>
            }
           
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.customer.loading,
        loadingEdit: state.customer.loadingEdit,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: (params) => dispatch(actions.userEditAsync(params)),
        userEditGet: (params) => dispatch(actions.getUserEditData(params)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'userAdd' })(withRouter(ChangePassWord)))