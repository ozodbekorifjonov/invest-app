import React from 'react';
import styled from 'styled-components';

const FooterBox = styled.div`
  background-color: black;
  padding: 0 0 50px 0;
  color: white;
`;

function Footer() {
  return (
    <FooterBox>
      <div className="container pt-3">
        <div className="text-end">
          <h3>Contact me</h3>
          <a href="">davlatbek@gmail.com</a>
        </div>
      </div>
    </FooterBox>
  );
}

export default Footer;
