import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalImageBox} from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

static propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseByEsc);
  }

  handleCloseByEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalImageBox>{this.props.children}</ModalImageBox>
      </Overlay>,
      modalRoot
    );
  }
}

export { Modal };
