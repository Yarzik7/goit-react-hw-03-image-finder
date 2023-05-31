import PropTypes from 'prop-types';
import { ErrorMessage } from "./Error.styled";

const Error = ({message}) => {
    return (<ErrorMessage>{message}</ErrorMessage>)
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export {Error};