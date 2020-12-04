/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Header, ImageUpload, TextEditor,TextValidate } from '../../components'
import { Container } from '../../components/style'
import { Form, Icon, Input, Row, Col, Modal } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/action'

const UserAddEdit = (props) => {
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

    const handleUpload = async (id) => {
        let formData = new FormData()
        formData.append('imagePath', imageFile)
        formData.append('id', id)
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
        alert("1")

        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if(userDescription.match('<p></p>')){

                //alert("2")

                setValidate(false)
                return
            }

            if (!err ) {

                //alert("3")
                if(idParam){
                    //alert("4")

                    let formData = new FormData()
                    formData.append('name', values.name)
                    formData.append('productQuantitys', values.productQuantity)
                    formData.append('userDescriptions', userDescription)
                    formData.append('imagePath', initData.imagePath)
                    formData.append('id', props.match.params.id)
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
                    //alert("5")
                    //let formData = new FormData()
                    // formData.append('name', values.name)
                    // formData.append('productQuantitys', values.productQuantity)
                    // formData.append('userDescriptions', userDescription)
                    var userAdd = 
                        {
                          "email": values.email,
                          "password": values.password,
                          "name": values.name,
                          "gender": true,
                          "phone": values.phone
                        };
                    
                    try {
                        const saveData =  await save(userAdd)
                        // if (imageFile !== null && !!saveData.id) {
                        //     handleUpload(saveData.id)
                        // }
                        if(saveData) {

                            //alert("6")
                            Modal.success({
                                content: 'Successfully',
                                onOk() {
                                    props.history.push('/users/userList')
                                },
                                onCancel() { },
                            });
                        } else{

                            //alert("7")
                            Modal.error({
                                content: 'please check user duplicate',
                            });
                        }
                    } catch (error) {

                        //alert("8")
                        throw error
                    }
                }
            }else{

                //alert("9")
                setValidate(false)
            }
        });
    };

    useEffect(() => {
        if(idParam && initData === false){
            userEditGet(idParam).then(val => {
                setInit(val)
                setUserDescription(val.id)
            })
            setValidate(true)
        }
    }, [initData])


    var objectArray = []

        if(initData.avatar != null){
            objectArray = Object.values(initData.avatar);
             //console.log(objectArray[0]); 
             //console.log(objectArray[1]); 
             //console.log(objectArray[2]); 
        }
        else{

        }
        
    var gender_tmp ="";
    {
        if(initData.gender === true)
        {
            gender_tmp = "male";
            
        }
        else 
            {
                if(initData.gender === false)
                {
                    gender_tmp = "female";
                }
            }
    }
    return (
        <Container>
            {loadingEdit && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {
                !loadingEdit &&  <Form className="login-form" onSubmit={handleSubmit}>
                <Header title={initData ? "UserEdit " + initData.name : "UserCreate"} text="BACK" link="/users/userList" create={true} loading={loading}/>
                <Row>
                    <Col span={8} style={{ position: "relative", top: 12 }}>
                      <ImageUpload func={func} imagePath={initData ? imageFile ? null: objectArray[1] : null }/>
                    </Col>
                    <Col span={1} />

                    <Col span={15} style={{ position: "relative", top: 15 }}>
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your name!' }],
                                initialValue: initData ? initData.name: null
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Name"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>

                        
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                                initialValue: initData ? initData.email: null
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password!' }],
                                initialValue: initData ? initData.password: null
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="password"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('Gender', {
                                rules: [{ required: true, message: 'Please input your Gender!' }],
                                initialValue: initData ? gender_tmp: null
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Gender"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: 'Please input your phone!' }],
                                initialValue: initData ? initData.phone: null
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Phone"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>
                        
                    </Col>
                </Row>
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


export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'userAdd' })(withRouter(UserAddEdit)))