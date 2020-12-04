import React from 'react'
import { Modal } from 'antd';
import { NewAvatar } from './../style'

const ModalShow = (props) => {
  const { funcs } = props
  const showModal = () => {
    if (props.icon === "edit") {
      return (
        Modal.confirm({
          title: 'Do you edit status order?',
          content: 'Order',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              funcs()
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() { },
        })
      )
    }
  };

  return (
    <div id="modalDelete">
      <NewAvatar icon={props.icon} onClick={showModal}>
        Open Modal
      </NewAvatar>
    </div>
  );
}

export default ModalShow