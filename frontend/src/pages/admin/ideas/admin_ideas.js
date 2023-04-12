import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PATH_ADMIN_IDEA_CREATE, PATH_ADMIN_IDEA_DETAILS } from '../../../consts';
import { useIdeas } from '../../../store/idea-provider';
import Loader from '../../../UI/Loader';
import FormatDateTime from '../../../helper/formatDateTime';

const CardStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px, rgb(51, 51, 51) 0 0 0 3px;
  padding: 30px 15px;
  margin-bottom: 15px;

  .flag-img {
    width: 24px;
    object-fit: contain;
  }
`;

function AdminIdeas() {
  const { isLoading, ideasList, getIdeasList } = useIdeas();

  useEffect(() => {
    getIdeasList();
  }, [getIdeasList]);

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>Ideas list</h5>
        <Link
          to={PATH_ADMIN_IDEA_CREATE}
          className="app-form-button-sm app-button-success mb-2 text-decoration-none d-inline-block text-black"
        >
          Add new idea
        </Link>
        {isLoading && <Loader />}
        {!isLoading &&
          ideasList?.map((item, id) => (
            <CardStyle key={id}>
              <h4>{item.title}</h4>
              <hr />
              <p>{item.abstract}</p>
              <div>
                <span>
                  <b>Risk rating:</b>{' '}
                  {item.risk_ratings.map((risk, i) => (
                    <span key={i}>{risk.name}</span>
                  ))}
                </span>
              </div>
              <div>
                <span>
                  <b>Instruments:</b>{' '}
                  {item.instruments.map((instrument, i) => (
                    <span key={i}>{instrument.name}, </span>
                  ))}
                </span>
              </div>
              <div>
                <span>
                  <b>Currency:</b>{' '}
                  {item.currencies.map((currency, i) => (
                    <span key={i}>{currency.title}, </span>
                  ))}
                </span>
              </div>
              <div>
                <span>
                  <b>Major Sector:</b>{' '}
                  {item.major_sectors.map((major_sector, i) => (
                    <span key={i}>{major_sector.name} </span>
                  ))}
                </span>
              </div>
              <div>
                <span>
                  <b>Minor Sector:</b>{' '}
                  {item.minor_sectors.map((minor_sector, i) => (
                    <span key={i}>{minor_sector.name} </span>
                  ))}
                </span>
              </div>
              <div>
                <span>
                  <b>Region:</b>{' '}
                  {item.regions.map((region, i) => (
                    <span key={i}>{region.name}, </span>
                  ))}
                </span>
              </div>
              <div>
                <span>
                  <b>Country:</b>{' '}
                  {item.countries.map((country, i) => (
                    <span key={i}>
                      <img
                        className="flag-img"
                        src={`${process.env.REACT_APP_API_URL}images/${country.image}`}
                        alt={country.name}
                      />{' '}
                      {country.name},{' '}
                    </span>
                  ))}
                </span>
              </div>
              <span>
                <b>Publish date:</b> <FormatDateTime date={item.publish_date} type="DATE" />,{' '}
                <FormatDateTime date={item.publish_date} type="TIME" />
                <b> Expiry Date:</b> <FormatDateTime date={item.expiry_date} type="DATE" />,{' '}
                <FormatDateTime date={item.expiry_date} type="TIME" />
              </span>
              <div>
                <span>
                  <b>Author:</b> {item.user.firstname} {item.user.lastname}
                </span>
              </div>
              <div className="row">
                <div className="col-3 offset-9">
                  <Link
                    to={`${PATH_ADMIN_IDEA_DETAILS}?id=${item.id}`}
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

export default AdminIdeas;
