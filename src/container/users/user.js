import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Lazy } from 'react-lazy'
import {Icon} from  'antd'
// import { price } from '../../config'

class User extends Component {

    render() {
        
        const { user } = this.props

        var objectArray = []

        if(user.avatar != null){
            objectArray = Object.values(user.avatar);
            // console.log(objectArray[0]); 
            // console.log(objectArray[1]); 
            // console.log(objectArray[2]); 
        }
        else{

        }
        return (
            <Link style={{textDecoration: 'none'}} to={{ pathname: `/users/profile/${user.id}` , state: user }}>
            <div className="user" key ={user.id}>
                <div className="photo">
                    <Lazy>
                        <img id={objectArray[0] } style={{width:100}} src={objectArray[1]} alt={objectArray[2]}/>
                        
                    </Lazy>
                </div>
                <div className="name">
                    <span>{user.name}</span>
                </div>

            </div>
            </Link>
        );
    }
}

export default User;

// <div className="action-icon">
//     <Icon type="more" onClick ={console.log("ok")}/>  
// </div>