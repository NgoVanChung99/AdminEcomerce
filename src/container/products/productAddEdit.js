/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Header, ImageUpload, TextEditor,TextValidate } from '../../components'
import { Container } from '../../components/style'
import { Form, Icon, Input, Row, Col, Modal } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/action'
import './productView.css'

const ProductAddEdit = (props) => {
    const [imageFile, setImageFile] = useState(null)
    const [productDescription, setProductDescription] = useState("")
    const [validate, setValidate] = useState(true)
    const [initData, setInit] = useState(false)
    const idParam = props.match.params.id
    const { 
        save, 
        loading,
        uploadImage,
        productEditGet,
        loadingEdit,
        productEdit
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
    var d = new Date();
    var objectArray = []

        if(initData.media != null){
            objectArray = Object.values(initData.media);
            // console.log(objectArray[0]); 
            // console.log(objectArray[1]); 
            // console.log(objectArray[2]); 
        }
        else{

        }
        var priceProduct =0
        if(initData.price != null)
        {
            priceProduct= (initData.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        }
        else{
            
        }


    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            //alert("1")
            // if(productDescription.match('<p></p>')){

            //     alert("2")

            //     setValidate(false)
            //     return
            // }

            if (!err ) {
                //alert("3")

                if(idParam){

                    //alert("4")

                    let formData = new FormData()
                    // formData.append('productNames', values.productName)
                    // formData.append('productQuantitys', values.productQuantity)
                    // //formData.append('productDescriptions', productDescription)
                    // formData.append('imagePath', initData.imagePath)
                    // formData.append('id', props.match.params.id)


                     var productDataEdit =   {
                          "categoryID": values.categoryID,
                          "name": values.name,
                          "description": values.description,
                          "price": values.price,
                          "detail": values.detail,
                          "status": true,
                          "topHot": null,
                          "viewCount": 0,
                          "productDetail": [
                            {
                              "size": values.size,
                              "quantity": values.quantity,
                              "currentQuantity": 0,
                              "originQuantity": 0
                            }
                          ]
                        }
                    //var myJSON = JSON.stringify(productDataEdit);

                    try {
                        const saveData =  await productEdit(productDataEdit,idParam)
                        // if (imageFile !== null && !!saveData.id) {
                        //     await handleUpload(saveData.id)
                        // }
                        if(saveData) {
                            Modal.success({
                                content: 'Successfully',
                                onOk() {
                                    props.history.push('/products/productList')
                                },
                                onCancel() { },
                            });
                        } else{
                            //Modal.error({
                                //content: 'please check productName duplicate',
                            //});
                            props.history.push('/products/productList')
                        }
                    } catch (error) {

                        //alert("5")
                        throw error
    
                    }
                }else{

                    //alert("6")
                    // let formData = new FormData()
                    // formData.append('productNames', values.productName)
                    // formData.append('productQuantitys', values.productQuantity)
                    // formData.append('productDescriptions', productDescription)

                    var productDataCreate =   {
                          "categoryID": values.categoryID,
                          "name": values.name,
                          "description": values.description,
                          "price": values.price,
                          "detail": values.detail,
                          "status": true,
                          "topHot": null,
                          "viewCount": 0,
                          "productDetail": [
                            {
                              "size": values.size,
                              "quantity": values.quantity,
                              "currentQuantity": 0,
                              "originQuantity": 0
                            }
                          ]
                        };
                    //var myJSON = JSON.stringify(productDataCreate);
                    try {
                        const saveData =  await save(productDataCreate)
                        // if (imageFile !== null && !!saveData.id) {
                        //     handleUpload(saveData.id)
                        // }
                        if(saveData) {

                            //alert("7")
                            Modal.success({
                                content: 'Successfully',
                                onOk() {
                                    props.history.push('/products/productList')
                                },
                                onCancel() { },
                            });
                        } else{
                            //Modal.error({
                               // content: 'please check productName duplicate',
                            //});
                            props.history.push('/products/productList')
                        }
                    } catch (error) {

                        //alert("8")
                        throw error
                    }
                }
            }else{

                //alert("9")
                //setValidate(false)
                props.history.push('/products/productList')
            }
        });
    };

    useEffect(() => {
        if(idParam && initData === false){
            productEditGet(idParam).then(val => {
                setInit(val)
                setProductDescription(val.id)
            })
            //setValidate(true)
        }
    }, [initData])
    //console.log("idParam"+idParam)
    return (
        <Container>
            {loadingEdit && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {
                !loadingEdit &&  <Form className="product-form" onSubmit={handleSubmit}>
                <Header title={initData ? "ProductEdit " + initData.name : "ProductCreate"} text="BACK" link="/products/productList" create={true} loading={loading}/>
                <Row>
                    <Col span={8} style={{ position: "relative", top: 12 }}>
                      <ImageUpload func={func} imagePath={initData ? imageFile ? null: objectArray[1] : null }/>
                    </Col>
                    <Col span={1} />

                    <Col span={15} style={{ position: "relative", top: 15 }}>
                        <Col span={15} style={{ position: "relative", top: 15 }}>
                        <Form.Item>
                            <label>Name</label>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your prodcutName!' }],
                                initialValue: initData ? initData.name: null
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="ProductName"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={15}>
                            <Form.Item>
                                <label>Category ID</label>
                                {getFieldDecorator('categoryID', {
                                    rules: [{ required: true, message: 'Please input your category ID!' }],
                                    initialValue: initData ? initData.categoryID: null
                                })(
                                    <Input
                                        prefix={<Icon type="shopping" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="number"
                                        placeholder="Category ID"
                                        maxLength={10}
                                    />,
                                )}
                            </Form.Item>

                        </Col>
                        <Col span={15}>
                            <Form.Item>
                                <label>Price</label>
                                {getFieldDecorator('price', {
                                    rules: [{ required: true, message: 'Please input your price !' }],
                                    initialValue: initData ? initData.price: null
                                })(
                                    <Input
                                        prefix={<Icon type="shopping" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="number"
                                        placeholder="price VND"
                                        maxLength={10}
                                    />,
                                )}
                            </Form.Item>

                        </Col>
                        <Col span={15}>
                            <Form.Item>
                                <label>Size</label>
                                {getFieldDecorator('size', {
                                    rules: [{ required: true, message: 'Please input your size !' }],
                                    initialValue: initData ? initData.size: null
                                })(
                                    <Input
                                        prefix={<Icon type="shopping" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="number"
                                        placeholder="size"
                                        maxLength={10}
                                    />,
                                )}
                            </Form.Item>

                        </Col>
                        <Col span={15}>
                            <Form.Item>
                                <label>Quantity</label>
                                {getFieldDecorator('quantity', {
                                    rules: [{ required: true, message: 'Please input your quantity!' }],
                                    initialValue: initData ? initData.quantity: null
                                })(
                                    <Input
                                        prefix={<Icon type="shopping" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="number"
                                        placeholder="Quantity"
                                        maxLength={10}
                                    />,
                                )}
                            </Form.Item>

                        </Col>
                        <Col span={15} style={{ position: "relative", top: 15 }}>
                        <Form.Item>
                            <label>Description</label>
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: 'Please input your Description!' }],
                                initialValue: initData ? initData.description: null
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Description"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>

                        <Form.Item>
                            <label>Detail</label>
                            {getFieldDecorator('detail', {
                                rules: [{ required: true, message: 'Please input your detail!' }],
                                initialValue: initData ? initData.detail: null
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="detail"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>
                        <input type="submit" value="Submit" onSubmit={handleSubmit}/>
                        </Col>
                        
                    </Col>
                </Row>
            </Form>
            }
           
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.product.loading,
        loadingEdit: state.product.loadingEdit,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: (params) => dispatch(actions.productAddAsync(params)),
        uploadImage: (params) => dispatch(actions.productAddImage(params)),
        productEditGet: (params) => dispatch(actions.getProductEditData(params)),
        productEdit: (params,id) => dispatch(actions.productEditAsync(params,id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'productAdd' })(withRouter(ProductAddEdit)))