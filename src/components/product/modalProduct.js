import React from 'react'
import { Modal } from 'antd';


const ModalShow = (props) => {
  const { funcs } = props
  const showModal = () => {
    
      return (
        Modal.confirm({
          title: 'Are you sure delete this products?',
          content: 'Product',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              funcs()
              //this.props.history.push('/products/productList')

              window.location.reload(true);
              //console.log("12")
            }).catch((err) => console.log('Oops errors!',err));
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