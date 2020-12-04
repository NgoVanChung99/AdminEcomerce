import React, { Component  } from 'react';
import { Link } from 'react-router-dom'
import { Lazy } from 'react-lazy'
// import { price } from '../../config'

class Product extends Component {
    
    render() {
        const { product } = this.props
        var objectArray = []

        if(product.media != null){
            objectArray = Object.values(product.media);
            // console.log(objectArray[0]); 
            // console.log(objectArray[1]); 
            // console.log(objectArray[2]); 
        }
        else{

        }
        var priceProduct =0
        if(product.price != null)
        {
            priceProduct= (product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        }
        else{
            
        }
        return (
            <Link style={{textDecoration: 'none'}} to={{ pathname: `product/${product.id}` , state: product }}>
            <div className="product" key ={product.id}>
                <div className="photo">
                    <Lazy>
                        <img id={objectArray[0] } style={{width:150}} src={objectArray[1]} alt={objectArray[2]}/>
                    </Lazy>
                </div>
                <div className="name">
                    <span>{product.name}</span>
                </div>
                <div className="description">
                    <span>{product.description}</span>
                </div>
                <div className="price" >
                    <span>{priceProduct } VND</span>     
                </div>

            </div>
            </Link>
        );
    }
}

export default Product;