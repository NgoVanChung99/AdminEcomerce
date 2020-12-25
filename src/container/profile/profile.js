import React, { useEffect } from 'react';
import { HeaderAdmin } from '../../components'
import { Container } from '../../components/style'
import { connect } from 'react-redux'
import * as actions from '../../store/action'

import './profile.css'


const Profile = (props) => {
    const {  list ,dataList  } = props
    //const { loading, status } = dataList
    

    useEffect(() => {
        list()
    }, [list]);

    var objectArray = []

        if(dataList.list.avatar != null){
            objectArray = Object.values(dataList.list.avatar);
             
        }
        else{

        }

    var gender_tmp ="";
    {
        if(dataList.list.gender === true)
        {
            gender_tmp = "male";
            
        }
        else 
            {
                if(dataList.list.gender === false)
                {
                    gender_tmp = "female";
                }
            }
    }

   
    console.log("abc abc"+dataList.list.name)
   
    return (
        <Container>
            <HeaderAdmin title="Profile" text="BACK" link="/dashboard" path ={dataList.list.id} />
            <div className="profile-profile">
                <div className= "left-info">
                    <img id={objectArray[0] }  src={objectArray[1]} alt={objectArray[2]}/>
                    <h2 className="name">{dataList.list.name}</h2>
                    <h3 className="id">User ID : {dataList.list.id}</h3>
                    <a href={`/user/changePassword/${dataList.list.id}`} >Change password</a>
                </div>
                <div className= "right-info">
                    <div className="info">
                        <div className="phone">
                            <h3 className="lable-info">Phone :  </h3>
                            <h3 className="value-info">{dataList.list.phone}</h3>
                        </div>
                        <div className="email">
                            <h3 className="lable-info">Email :  </h3>
                            <h3 className="value-info">{dataList.list.email}</h3>
                        </div>
                        <div className="BirthDay">
                            <h3 className="lable-info">CreatedDate :  </h3>
                            <h3 className="value-info">{dataList.list.createdDate}</h3>
                        </div>
                        <div className="Address">
                            <h3 className="lable-info">Address :  </h3>
                            <h3 className="value-info">{dataList.list.address}</h3>
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
        dataList: state.list
    }
}
const mapDispatchToProps = dispatch => {
    return {
        list: () => dispatch(actions.AdminFetch()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
// {
            //     list.map ( profile => <ProfileView key ={profile.id} profile={profile} />)
            // }