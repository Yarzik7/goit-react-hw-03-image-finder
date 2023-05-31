import PropTypes from 'prop-types';
import { ButtonLoadMore } from "./Button.styled";

const Button = ({ handleLoadMore }) => {
    return <ButtonLoadMore onClick={handleLoadMore}>Load more</ButtonLoadMore>;
}

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};

export {Button}