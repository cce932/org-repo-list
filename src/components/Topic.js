import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-right: 10px;
  margin-top: 20px;
  border: 2px solid ${(props) => props.theme.color.primary};
  // color: ${(props) => props.theme.color.primary};
  padding: 2px 5px;
`;

function Topic({ topic }) {
  return (<Wrapper>{topic}</Wrapper>);
}

Topic.propTypes = {
  topic: PropTypes.string.isRequired,
};

export default Topic;
