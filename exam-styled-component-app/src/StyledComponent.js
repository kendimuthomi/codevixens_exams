import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: ${props => {
    switch (props.status) {
      case 'success':
        return 'green';
      case 'warning':
        return 'yellow';
      case 'error':
        return 'red';
      case 'default':
      default:
        return 'white';
    }
  }};
`;

const MyComponent = ({ status }) => {
  return (
    <StyledDiv status={status}>
      {status === 'success' && (
        <p>Congratulations! Your operation was successful.</p>
      )}
      {status === 'warning' && (
        <p>Warning: There may be issues you need to address.</p>
      )}
      {status === 'error' && (
        <p>Sorry, an error occurred. Please try again later.</p>
      )}
      {status === 'default' && (
        <p>Welcome to our site. Please take a look around.</p>
      )}
    </StyledDiv>
  );
};

export default MyComponent;