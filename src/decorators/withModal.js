import React from 'react'
import ModalContext from '../components/Provider/Modal/Context'

export default function(ComposedComponent) {
  return class WithModal extends React.Component {
    render() {
      return (
        <ModalContext.Consumer>
          {showModal => <ComposedComponent {...this.props} showModal={showModal} />}
        </ModalContext.Consumer>
      )
    }
  }
}
