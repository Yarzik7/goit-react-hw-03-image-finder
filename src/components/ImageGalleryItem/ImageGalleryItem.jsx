import { Component } from 'react';
import { GalleryItem, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { ModalImage } from 'components/Modal/Modal.styled';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => this.setState(({ showModal }) => ({ showModal: !showModal }));

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;

    return (
      <GalleryItem>
        <Image src={webformatURL} alt={tags} loading="lazy" onClick={this.toggleModal} />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <ModalImage src={`${largeImageURL}`} alt={`${tags}`} />
          </Modal>
        )}
      </GalleryItem>
    );
  }
}

export { ImageGalleryItem };
