import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';

class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  handleFormSubmit = query => this.setState({ query, page: 1 });

  handleLoadMore = () => this.setState(({ page }) => ({ page: page + 1 }));

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery query={this.state.query} page={this.state.page} handleLoadMore={this.handleLoadMore} />

        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }
}

export { App };
