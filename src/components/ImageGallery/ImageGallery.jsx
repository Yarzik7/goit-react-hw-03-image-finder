import { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchImages } from 'api/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Error } from 'components/Error/Error';
import { Greeting, ImageGalleryBox } from './ImageGallery.styled';
import { Section } from 'components/Section/Section';
import { Button } from 'components/Button/Button';

const finiteStates = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: finiteStates.IDLE,
    responseLength: 0,
  };

  static propTypes = {
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    handleLoadMore: PropTypes.func.isRequired,
  };

  perPage = 12;

  componentDidUpdate(prevProps, _) {
    const { query: prevQuery, page: prevPage } = prevProps;
    const { query: nextQuery, page: nextPage } = this.props;

    if (prevQuery !== nextQuery || prevPage < nextPage) {
      const newState = nextPage === 1
        ? { status: finiteStates.PENDING, images: [] }
        : { status: finiteStates.PENDING };

      this.setState({ ...newState });

      fetchImages(nextQuery, nextPage, this.perPage)
        .then(newImages =>
          this.setState(({ images }) => ({
            images: [...images, ...newImages],
            status: finiteStates.RESOLVED,
            responseLength: newImages.length,
          }))
        )
        .catch(error => this.setState({ error, status: finiteStates.REJECTED }));
    }
  }

  mapImages = ({ id, webformatURL, largeImageURL, tags }) => (
    <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} tags={tags} />
  );

  render() {
    const { images, error, status, responseLength } = this.state;

    return (
      <Section>
        {status === 'idle' && <Greeting>Hello! Please enter the topic you would like to search images for</Greeting>}

        {status !== 'idle' && !!images.length && <ImageGalleryBox>{images.map(this.mapImages)}</ImageGalleryBox>}

        {status === 'pending' && <Loader />}

        {status === 'rejected' && <Error message={error.message} />}

        {responseLength === this.perPage && !!images.length && <Button handleLoadMore={this.props.handleLoadMore} />}
      </Section>
    );
  }
}

export { ImageGallery };
