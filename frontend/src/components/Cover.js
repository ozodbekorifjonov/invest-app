import React from 'react';
import bgHeader from '../assets/images/bg-header.jpg';
import styled from 'styled-components';

const ImageBox = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    width: inherit;
  }
`;

function Cover() {
  return (
    <ImageBox>
      <img src={bgHeader} alt="invest-app" />
    </ImageBox>
  );
}

export default Cover;
