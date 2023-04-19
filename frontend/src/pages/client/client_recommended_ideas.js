import React from 'react';
import useAsyncLoader from '../../hooks/useAsyncLoader';
import { ideasRecommendedByRMAPI } from '../../api/investApi';
import { PATH_CLIENT_IDEA_DETAILS, USER_ID } from '../../consts';
import Loader from '../../UI/Loader';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardStyle = styled.div`
  box-shadow: rgb(255, 222, 3) 0 1px 4px, rgb(84, 84, 15) 0 0 0 3px;
  padding: 30px 15px;
  margin-bottom: 15px;

  .flag-img {
    width: 24px;
    object-fit: contain;
  }
`;

function ClientRecommendedIdeas() {
  const id = localStorage.getItem(USER_ID);
  const { isLoading, data } = useAsyncLoader(ideasRecommendedByRMAPI, id);
  const recommendedIdeas = data?.data?.data;

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>Ideas recommended by RM</h5>
        {isLoading && <Loader />}
        {!isLoading && recommendedIdeas?.length === 0 && (
          <>
            <h4>You have an empty recommended ideas list 💰</h4>
            <p>Contact an RM who can recommend a suitable Idea for you.</p>
          </>
        )}
        {!isLoading &&
          recommendedIdeas?.map((item, id) => (
            <CardStyle key={id}>
              <h4>{item.title}</h4>
              <hr />
              <p>{item.abstract}</p>
              <div className="row">
                {item?.rms.length !== 0 && (
                  <div>
                    <b>List of RMs attached to this Idea:</b>
                  </div>
                )}
                {item?.rms.length !== 0 &&
                  item?.rms.map((item, i) => (
                    <div className="col-12 mb-3" key={i}>
                      <div className="row">
                        <div className="col">
                          {item.firstname} {item.lastname}
                        </div>
                        <div className="col">
                          <a href={`mailto:${item.email}`}>{item.email}</a>
                        </div>
                        <div className="col">
                          <a
                            className="app-form-button-sm app-button-success mx-1 text-decoration-none text-white"
                            href={`tel:${item.telephone}`}
                          >
                            {item.telephone}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                <span>
                  <b>Author:</b> {item.user.firstname} {item.user.lastname}
                </span>
              </div>
              <div className="row">
                <div className="col-3 offset-9">
                  <Link
                    to={`${PATH_CLIENT_IDEA_DETAILS}?id=${item.id}`}
                    className="app-form-button app-button-primary w-100 text-decoration-none d-block text-white"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </CardStyle>
          ))}
      </div>
    </div>
  );
}

export default ClientRecommendedIdeas;
