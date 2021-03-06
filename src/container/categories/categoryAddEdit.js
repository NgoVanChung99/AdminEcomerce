/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Header } from '../../components'
import { Container } from '../../components/style'
import { Form, Icon, Input, Row, Col, Modal } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/action'
import './category.css'

const CategoryAddEdit = (props) => {
    //const [categoryDescription, setCategoryDescription] = useState("")
    //const [setValidate] = useState(true)
    const [initData, setInit] = useState(false)
    const idParam = props.match.params.id
    const { 
        save, 
        loading,
        categoryEditGet,
        loadingEdit,
        categoryEdit
    } = props
    const { getFieldDecorator } = props.form;
    
    const handleSubmit = e => {

        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            

            if (!err ) {
                //alert("edit")
                if(idParam){
                    
                    try {
                        //const saveData =  await categoryEdit(formData,idParam)
                        var objectData = {
                                "name": values.name,
                                "metaTitle": "metaTitle",
                                "parentID": 0,
                                "displayOrder": values.displayOrder,
                                "seoTitle": "string",
                                "metaKeywords": "string",
                                "metaDescriptions": "string",
                                "status": true,
                                "showOnHome": true,
                                "language": "nipon"
                        };

                        const saveData =  await categoryEdit(objectData,idParam)

                        console.log("formDatas"+objectData)
                        if(saveData) {

                            alert("create 242")

                            Modal.success({
                                content: 'Successfully',
                                onOk() {
                                    props.history.push('/categories/categoryList')
                                },
                                onCancel() { },
                            });
                        } else{
                            props.history.push('/categories/categoryList')
                            //alert("lo3")

                            // Modal.error({
                            //     content: 'please check CategoryForm duplicate',
                            // });
                        }
                    } catch (error) {
                        throw error
    
                    }
                }else{ 

                    
                    try {
                        
                        var objectDataCreate =   
                        {                                                          
                                  "name": values.name,
                                  "metaTitle": "string",
                                  "parentID": 0,
                                  "displayOrder": values.displayOrder,
                                  "seoTitle": "string",
                                  "metaKeywords": "string",
                                  "metaDescriptions": "string",
                                  "status": true,
                                  "showOnHome": true,
                                  "language": "string"
                        };
                        
                                                        
                        const saveData =  await save(objectDataCreate)

                        //console.log("objectData"+objectData)
                        if(saveData) {
                            //alert("create2")
                            Modal.success({
                                content: 'Successfully',
                                onOk() {
                                    props.history.push('/categories/categoryList')
                                },
                                onCancel() { },
                            });
                        } else{
                            props.history.push('/categories/categoryList')
                            //alert("loi 2")
                            //Modal.error({
                                //content: 'please check CategoryForm duplicate',
                            //});
                        }
                    } catch (error) {
                        //alert("loi submit")
                        throw error
                    }
                }
            }else{
                //console.log(err+"dess"+categoryDescription)
                //setValidate(false)
                //alert("loi 1")
            }
        });
    };

    useEffect(() => {
        if(idParam && initData === false){
            categoryEditGet(idParam).then(val => {
                setInit(val)
                //console.log("val"+val.id)
                //setCategoryDescription(val.id)
            })
            //setValidate(true)
        }
    }, [initData]);

    return (
        <Container>
            {loadingEdit && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {
                !loadingEdit &&  <Form className="category-form" onSubmit={handleSubmit}>
                <Header title={initData ? "CategoryEdit " + initData.name : "CategoryCreate"} text="BACK" link="/categories/categoryList" create={true} loading={loading}/>
                <Row>   
                    <Col span={1}> </Col>                
                    <Col span={15} style={{ position: "relative", top: 15 ,left: 100 }}>   
                        <Form.Item>
                            <label>Name</label>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your name!' }],
                                initialValue: initData ? initData.name: null
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="CategoryName"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>
                        
                        <Form.Item>
                            <label>DisplayOrder</label>
                            {getFieldDecorator('displayOrder', {
                                rules: [{ required: true, message: 'Please input your displayOrder!' }],
                                initialValue: initData ? initData.displayOrder: null
                            })(
                                <Input
                                    prefix={<Icon type="shopping" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="number"
                                    placeholder="DisplayOrder"
                                    maxLength={10}
                                />,
                            )}
                        </Form.Item>

                        
                        
                        
                        
                        <input type="submit" value="Submit" onSubmit={handleSubmit}/>

                    </Col>
                </Row>
            </Form>
            }

        </Container>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.category.loading,
        loadingEdit: state.category.loadingEdit,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: (params) => dispatch(actions.categoryAddAsync(params)),
        categoryEditGet: (params) => dispatch(actions.getCategoryEditData(params)),
        categoryEdit: (params,id) => dispatch(actions.categoryEditAsync(params,id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'categoryAdd' })(withRouter(CategoryAddEdit)))


// <Form.Item>
                        //     <label >Show On Home</label>
                        //     {getFieldDecorator('showOnHome', {
                        //         rules: [{ required: true, message: 'Please input your Show On Home!' }],
                        //         initialValue: initData ? initData.showOnHome: null
                        //     })(
                        //         <select >
                        //             <option selected value="true">True</option>
                        //             <option value="false">False</option>
                        //         </select>,
                        //     )}
                        // </Form.Item>

                        // <Form.Item>
                        //     <label>Seo Title</label>
                        //     {getFieldDecorator('seoTitle', {
                        //         rules: [{ required: true, message: 'Please input your seoTitle!' }],
                        //         initialValue: initData ? initData.seoTitle: null
                        //     })(
                        //         <Input
                        //             prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        //             placeholder="SEO Title"
                        //             maxLength={100}
                        //         />,
                        //     )}
                        // </Form.Item>

                        

                        // 
                        // <Form.Item>
                        //     <label>Title</label>
                        //     {getFieldDecorator('metaTitle', {
                        //         rules: [{ required: true, message: 'Please input your metaTitle!' }],
                        //         initialValue: initData ? initData.metaTitle: null
                        //     })(
                        //         <Input
                        //             prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        //             placeholder="Meta Title"
                        //             maxLength={100}
                        //         />,
                        //     )}
                        // </Form.Item>