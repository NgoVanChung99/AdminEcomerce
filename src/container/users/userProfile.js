/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { HeaderCustomer, ImageUpload, TextEditor,TextValidate } from '../../components'
import { Container } from '../../components/style'
import { Form, Icon, Input, Row, Col, Modal } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/action'
import './user.css'
import avartar from '../profile/3.jpg'


const UserProfileView = (props) => {
    // const [imageFile, setImageFile] = useState(null)
    const [userDescription, setUserDescription] = useState("")
    // const [validate, setValidate] = useState(true)
    const [initData, setInit] = useState(false)
    const idParam = props.match.params.id
    const { 
        userEditGet,
        loadingEdit,
        userEdit,
        listDelete
    } = props
    

    const handleDelete = async (id) => {
        //const list = await initData.filter(val => val.id !== id)
        listDelete(id);
        
        
        //window.location.reload(true);
       
    }
    useEffect(() => {
        if(idParam && initData === false){
            userEditGet(idParam).then(val => {
                setInit(val)
                setUserDescription(val.userDescription)
            })
        }
    }, [initData])

    var objectArray = []

        if(initData.avatar != null){
            objectArray = Object.values(initData.avatar);
             
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
            <HeaderCustomer title={"Profile "+initData.name} text="BACK" link="/users/userList" path ={initData.id} func={{
                    delete: (id) => handleDelete(initData.id),
                }} />
            <div className="profile-profile">
                <div className= "left-info">
                    <img id="avatar-img"  src={objectArray[1]} alt={objectArray[2]}/>
                    <h2 className="name">{initData.name}</h2>
                    <h3 className="id">User ID : {initData.id}</h3>
                    <a href={`/user/changePassword/${initData.id}`} >Change password</a>
                </div>
                <div className= "right-info">
                    <div className="info">
                        <div className="phone">
                            <h3 className="lable-info">Phone :  </h3>
                            <h3 className="value-info">{initData.phone}</h3>
                        </div>
                        <div className="email">
                            <h3 className="lable-info">Email :  </h3>
                            <h3 className="value-info">{initData.email}</h3>
                        </div>
                        <div className="BirthDay">
                            <h3 className="lable-info">CreatedDate :  </h3>
                            <h3 className="value-info">{initData.createdDate}</h3>
                        </div>
                        
                        <div className="Gender">
                            <h3 className="lable-info">Gender :  </h3>
                            <h3 className="value-info">{gender_tmp}</h3>
                        </div>
                    </div>
                              
                </div>
            </div>
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
        userEditGet: (params) => dispatch(actions.getUserEditData(params)),   
        listDelete: (params) => dispatch(actions.userDelete(params)),    
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'UserAdd' })(withRouter(UserProfileView)))

// <div className="Address">
//      <h3 className="lable-info">Address :  </h3>
//      <h3 className="value-info">{initData.address}</h3>
// </div>