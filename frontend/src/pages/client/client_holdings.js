import React from 'react';
import useAsyncLoader from '../../hooks/useAsyncLoader';
import { holdingsListAPI } from '../../api/investApi';
import { USER_ID } from '../../consts';
import styled from 'styled-components';
import Loader from '../../UI/Loader';
import FormatDateTime from '../../helper/formatDateTime';
import Markdown from '../../UI/Markdown';

const CardStyle = styled.div`
  box-shadow: rgba(13, 40, 5, 0.16) 0 1px 4px, rgb(97, 190, 17) 0 0 0 3px;
  padding: 30px 15px;
  margin-bottom: 15px;

  .flag-img {
    width: 24px;
    object-fit: contain;
  }
`;

function ClientHoldings() {
  const user_id = localStorage.getItem(USER_ID);
  const { isLoading, data } = useAsyncLoader(holdingsListAPI, user_id);

  const holdingsList = data?.data?.data;

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>Your holdings list</h5>
        {isLoading && <Loader />}
        {!isLoading &&
          holdingsList?.map((item, id) => (
            <CardStyle key={id}>
              <h4>{item.title}</h4>
              <hr />
              <Markdown value={item?.abstract} />
              <h6>Idea Content</h6>
              <Markdown value={item?.content} />
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
            </CardStyle>
          ))}
        {!isLoading && holdingsList?.length === 0 && (
          <h4>You have an empty holdings list. Please become an investor! 💰</h4>
        )}
      </div>
    </div>
  );
}

export default ClientHoldings;
