import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  width: 32px;
  height: 32px;
  clear: both;
  margin: 20px auto;

  border: 4px rgba(${(prop) => prop.theme.color.secondaryRGB}, 0.25) solid;
  border-top: 4px ${(prop) => prop.theme.color.accent} solid;
  border-radius: 50%;
  -webkit-animation: spCircRot 0.6s infinite linear;
  animation: spCircRot 0.6s infinite linear;

  @-webkit-keyframes spCircRot {
    from { -webkit-transform: rotate(0deg); }
    to { -webkit-transform: rotate(359deg); }
  }
  @keyframes spCircRot {
    from { transform: rotate(0deg); }
    to { transform: rotate(359deg); }
  }
`;

function Spinner() {
  return (
    <Circle />
  );
}

export default Spinner;
