import React from 'react'
import { Modal } from 'antd';


const ModalShow = (props) => {
  const { funcs } = props
  const showModal = () => {
    
      return (
        Modal.confirm({
          title: 'Are you sure delete this user?',
          content: 'User',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              alert("123")
              funcs()
              console.log("23")
              //props.history.push('/users/userList')
              console.log("32")
              window.location.reload(true);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() { },
        })
      )
  };

  return (
    <div id="modalDelete" onClick={showModal}>
      DELETE
    </div>
  );
}

export default ModalShow