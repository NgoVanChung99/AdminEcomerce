/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { HeaderProduct, ImageUpload,TextValidate } from '../../components'
import { Container } from '../../components/style'
import { Form, Icon } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/action'
//import './productView.css'
import ProductDetail from './productDetail'
import './productview.scss'
import { price } from '../../components/convertPrice.js'


const ProductView = (props) => {
    
    const [productDescription, setProductDescription] = useState("")
    
    const [initData, setInit] = useState(false)
    const idParam = props.match.params.id
    const { 
        productEditGet,
        loadingEdit,
        productEdit,
        listDelete
    } = props
    


    const handleDelete = async (id) => {
        

        listDelete(id);
        props.history.push('/products/productList')
        
        window.location.reload(true);
       
    }


    var priceProduct =0
        if(initData.price != null)
        {
            priceProduct= (initData.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        }
        else{
            
        }
    var dateCreate =' '
    if(initData.createdDate !=null){   
        var dateCreatetmp = new Date(initData.createdDate) 
        dateCreate =dateCreatetmp.toString()
    }
    else{
        
    }

    useEffect(() => {
        if(idParam && initData === false){
            productEditGet(idParam).then(val => {
                setInit(val);
                setProductDescription(val.productDescription)
            })
        }
    }, [initData])


    var objectArray = []

        if(initData.media != null){
            objectArray = Object.values(initData.media);
             
        }
        else{

        }

    
    var objectArrayMediaDetail = []
    
        if(initData != null){

            if(initData.price != null){
                  var objectArrayMediaDetail=initData.productMedias;
                 for(let b=0; b<objectArrayMediaDetail.length;b++)
                 {
                    console.log( objectArrayMediaDetail[b].media.url)
                 }
        }

          
          
         }

   

    return (
        <Container>
            {loadingEdit && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {
                !loadingEdit &&  <Form className="product-form" >
                <HeaderProduct title={initData ? "Product " + initData.name : "ProductCreate"} text="BACK" link="/products/productList" path ={initData.id} func={{
                    delete: (id) => handleDelete(initData.id),
                }} />
                <div className="product-product" key ={initData.id}>
                    <div className= "left-info-product">
                        <div className="photo">
                            <img src={objectArray[1]} alt={objectArray[2]}/>  
                        </div>
                    </div>
                    <div className= "right-info">
                        <div className="info">
                            <div className="name-product">
                                <h3 className="name-info">{initData.name}</h3>
                            </div>
                            <div className="price">
                                <h3 className="price-info">Giá: { price(initData.price)} VNĐ</h3>
                            </div>
                            <div className="title-product">
                                <h3 className="title-info"> Mô Tả Sản Phẩm: {initData.description}</h3>
                            </div>
                            {/* <div className="product-details">
                                <h3 >CreatedDate </h3>   
                                <h3 className="CreatedDate">{initData.createdDate}</h3> 
                            </div> */}
                            <div className="detail-id">
                            <h1>Size và số lượng hiện tại:</h1>
                            {
                                objectArrayMediaDetail.map( productDetail => <ProductDetail key={productDetail.id} productDetail={productDetail} /> )
                            }
                            </div>
                        </div>            
                    </div>
                </div>
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
        productEditGet: (params) => dispatch(actions.getProductEditData(params)),
        listDelete: (params) => dispatch(actions.productDelete(params)),    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'productAdd' })(withRouter(ProductView)))
// <div className="detail-id-first">
//                                     <h4 >ID <h4 className="ID">{objectArrayDetail[0]}</h4></h4>
//                                     <h4 >Size <h4 className="size">{objectArrayDetail[2]}</h4></h4>
//                                     <h4 >CurrentQuantity <h4 className="size">{objectArrayDetail[4]}</h4></h4>
//                                 </div>


////////////////////
// <div className="detail-id">
                               
//                                 <div className="detail-id-second">
//                                     <div className="ID"> 
//                                         <h4 className="lable">ID </h4>
//                                         <h4 className="value">{objectArrayDetail_view[0]}</h4>
//                                     </div>
//                                     <div className="Size"> 
//                                         <h4 className="lable">Size </h4>
//                                         <h4 className="value">{objectArrayDetail_view[2]}</h4>
//                                     </div>
//                                     <div className="CurrentQuantity"> 
//                                         <h4 className="lable">CurrentQuantity </h4>
//                                         <h4 className="value">{objectArrayDetail_view[4]}</h4>
//                                     </div>
//                                 </div> 

//                             </div>
 
// <div className="detail-id">
//                             {
//                                 objectArrayMediaDetail.map( productMedias => <ProductDetail key={productMedias.id} productMedias={productMedias} /> )
//                             }
//                             </div>