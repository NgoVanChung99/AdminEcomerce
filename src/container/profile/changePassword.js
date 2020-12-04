/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Header, ImageUpload, TextEditor,TextValidate } from '../../components'
import { Container } from '../../components/style'
import { Form, Icon, Input, Row, Col, Modal } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/action'

const ChangePassWord = (props) => {
    const [imageFile, setImageFile] = useState(null)
    const [userDescription, setUserDescription] = useState("")
    const [validate, setValidate] = useState(true)
    const [initData, setInit] = useState(false)
    const idParam = props.match.params.id
    const { 
        save, 
        loading,
        uploadImage,
        userEditGet,
        loadingEdit,
        userEdit
    } = props
    const { getFieldDecorator } = props.form;

    const func = {
        imageFile: (val) => setImageFile(val)
    }

    const handleUpload = async (_id) => {
        let formData = new FormData()
        formData.append('imagePath', imageFile)
        formData.append('_id', _id)
        try {
            const saveData = await uploadImage(formData)
            if(saveData) {
                return true
            } else{
                Modal.error({
                    content: 'please check imageFile',
                });
            }
        } catch (error) {
            throw error
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if(userDescription.match('<p></p>')){
                setValidate(false)
                return
            }

            if (!err && userDescription !== "") {
                if(idParam){
                    let formData = new FormData()
                    formData.append('productNames', values.productName)
                    formData.append('productQuantitys', values.productQuantity)
                    formData.append('productDescriptions', userDescription)
                    formData.append('imagePath', initData.imagePath)
                    formData.append('_id', props.match.params.id)
                    try {
                        const saveData =  await userEdit(formData)
                        if (imageFile !== null && !!saveData.id) {
                            await handleUpload(saveData.id)
                        }
                        if(saveData) {
                            Modal.success({
                                content: 'Successfully',
                                onOk() {
                                    props.history.push('/products/productList')
                                },
                                onCancel() { },
                            });
                        } else{
                            Modal.error({
                                content: 'please check productName duplicate',
                            });
                        }
                    } catch (error) {
                        throw error
    
                    }
                }else{
                    let formData = new FormData()
                    formData.append('productNames', values.productName)
                    formData.append('productQuantitys', values.productQuantity)
                    formData.append('productDescriptions', userDescription)
                    try {
                        const saveData =  await save(formData)
                        if (imageFile !== null && !!saveData.id) {
                            handleUpload(saveData.id)
                        }
                        if(saveData) {
                            Modal.success({
                                content: 'Successfully',
                                onOk() {
                                    props.history.push('/products/productList')
                                },
                                onCancel() { },
                            });
                        } else{
                            Modal.error({
                                content: 'please check productName duplicate',
                            });
                        }
                    } catch (error) {
                        throw error
                    }
                }
            }else{
                setValidate(false)
            }
        });
    };

    useEffect(() => {
        if(idParam && initData === false){
            userEditGet(idParam).then(val => {
                setInit(val)
                setUserDescription(val.userDescription)
            })
            setValidate(true)
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
        save: (params) => dispatch(actions.userAddAsync(params)),
        uploadImage: (params) => dispatch(actions.userAddImage(params)),
        userEditGet: (params) => dispatch(actions.getUserEditData(params)),
        userEdit: (params) => dispatch(actions.userEditAsync(params))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'userAdd' })(withRouter(ChangePassWord)))