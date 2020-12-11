import React, { Component  } from 'react';
//import { Link } from 'react-router-dom'
// import { Lazy } from 'react-lazy'
// import { price } from '../../config'

class ProductDetail extends Component {
    
    render() {
        const { productMedias } = this.props
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
            
            <div className="detail" key ={productMedias.id}>
                <div className="id">
                    <span>ID {productMedias.id}</span>
                </div>
                <div className="mediaID">
                    <span>ID media {productMedias.mediaID}</span>
                </div>
                <div className="productID" >
                    <span>product ID {productMedias.productID}</span>     
                </div>

            </div>
            
        );
    }
}

export default ProductDetail;