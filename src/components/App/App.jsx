import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  handleFormSubmit = query => this.setState({ query, page: 1 });

  animatedScroll = () => {
    scroll.scrollMore(window.innerHeight * 0.8);
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    this.animatedScroll();
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery query={this.state.query} page={this.state.page} handleLoadMore={this.handleLoadMore} />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          theme="colored"
          closeOnClick
          hideProgressBar
          pauseOnHover
        />
      </>
    );
  }
}

export { App };
