import React, { Component  } from 'react';
//import { Link } from 'react-router-dom'
// import { Lazy } from 'react-lazy'
// import { price } from '../../config'

class ProductDetail extends Component {
    
    render() {
        //const { productMedias } = this.props
        const { productDetail } = this.props
        // var objectArray = []

        // if(productMedias.media != null){
        //     objectArray = Object.values(productMedias.media);
        //     // console.log(objectArray[0]); 
        //     // console.log(objectArray[1]); 
        //     // console.log(objectArray[2]); 
        // }
        // else{

        // }
        
        return (
            
            <div className="detail" key ={productDetail.id}>
                {/* <div className="size">
                    <span>Size {productDetail.size}</span>
                </div> */}
                <div><span>{productDetail.size}</span></div>
                <div><span>{productDetail.currentQuantity}</span></div>
                
                {/* <div className="mediaID">
                    <span>ID media {productDetail.mediaID}</span>
                </div>
                <div className="productID" >
                    <span>product ID {productDetail.productID}</span>     
                </div> */}

            </div>
            
        );
    }
}

export default ProductDetail;