import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecommends } from '../store/recommend-provider';

const ContentBox = styled.div`
  background-color: black;
  padding: 100px 0;
  color: white;

  .col-6 {
    p {
      font-size: 20px;
    }
  }
`;

function AboutUsUser() {
  const { isLoading, aboutUsList, getAboutUsList } = useRecommends();

  useEffect(() => {
    getAboutUsList();
  }, [getAboutUsList]);

  return (
    <ContentBox id={'about-us'}>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h1>ABOUT US</h1>
          </div>
          <div className="col-6">
            {!isLoading && aboutUsList?.length !== 0 && <p>{aboutUsList[0].content}</p>}
          </div>
        </div>
      </div>
    </ContentBox>
  );
}

export default AboutUsUser;
