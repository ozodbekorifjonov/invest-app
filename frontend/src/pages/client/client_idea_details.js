import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useIdeas } from '../../store/idea-provider';
import Loader from '../../UI/Loader';
import Markdown from '../../UI/Markdown';
import FormatDateTime from '../../helper/formatDateTime';
import { toast } from 'react-toastify';
import { holdingsListAPI, updateIdeaHolderAPI } from '../../api/investApi';
import { PATH_CLIENT_HOLDINGS, USER_ID } from '../../consts';
import useAsyncLoader from '../../hooks/useAsyncLoader';

const CardStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px, rgb(51, 51, 51) 0 0 0 3px;
  padding: 30px 15px;
  margin-bottom: 15px;

  .flag-img {
    width: 24px;
    object-fit: contain;
  }
`;

const InvestorBox = styled.div`
  background-color: #ffde03;
  color: #040001;
  padding: 20px 15px;
  margin-bottom: 15px;
`;

function ClientIdeaDetails() {
  const [searchParams] = useSearchParams();
  const { isLoading, ideaDetails, getIdeaDetails } = useIdeas();
  const id = searchParams.get('id');
  const user_id = localStorage.getItem(USER_ID);
  const navigate = useNavigate();

  const { data } = useAsyncLoader(holdingsListAPI, user_id);

  const holdingsList = data?.data?.data;

  useEffect(() => {
    getIdeaDetails(id);
  }, [getIdeaDetails, id]);

  const handleBeInvestor = async () => {
    try {
      const response = await updateIdeaHolderAPI(user_id, id);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(PATH_CLIENT_HOLDINGS);
      }
    } catch (e) {
      toast.error(e.data.message);
    }
  };

  const isInvestor = holdingsList?.filter((holding) => holding?.id === ideaDetails?.id);

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>Idea details</h5>
        {isLoading && <Loader />}
        {!isLoading && isInvestor?.length !== 0 && (
          <InvestorBox>
            <h5>You are already an investor for this idea. Moving on to the next step soon… ⏳</h5>
          </InvestorBox>
        )}
        {!isLoading && (
          <CardStyle>
            <h4>{ideaDetails?.title}</h4>
            <hr />
            <Markdown value={ideaDetails?.abstract} />
            <h6>Idea Content</h6>
            <Markdown value={ideaDetails?.content} />
            <div>
              <span>
                <b>Risk rating:</b>{' '}
                {ideaDetails?.risk_ratings.map((risk, i) => (
                  <span key={i}>{risk.name}</span>
                ))}
              </span>
            </div>
            <div>
              <span>
                <b>Instruments:</b>{' '}
                {ideaDetails?.instruments.map((instrument, i) => (
                  <span key={i}>{instrument.name}, </span>
                ))}
              </span>
            </div>
            <div>
              <span>
                <b>Currency:</b>{' '}
                {ideaDetails?.currencies.map((currency, i) => (
                  <span key={i}>{currency.title}, </span>
                ))}
              </span>
            </div>
            <div>
              <span>
                <b>Major Sector:</b>{' '}
                {ideaDetails?.major_sectors.map((major_sector, i) => (
                  <span key={i}>{major_sector.name} </span>
                ))}
              </span>
            </div>
            <div>
              <span>
                <b>Minor Sector:</b>{' '}
                {ideaDetails?.minor_sectors.map((minor_sector, i) => (
                  <span key={i}>{minor_sector.name} </span>
                ))}
              </span>
            </div>
            <div>
              <span>
                <b>Region:</b>{' '}
                {ideaDetails?.regions.map((region, i) => (
                  <span key={i}>{region.name}, </span>
                ))}
              </span>
            </div>
            <div>
              <span>
                <b>Country:</b>{' '}
                {ideaDetails?.countries.map((country, i) => (
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
              <b>Publish date:</b> <FormatDateTime date={ideaDetails?.publish_date} type="DATE" />,{' '}
              <FormatDateTime date={ideaDetails?.publish_date} type="TIME" />
              <b> Expiry Date:</b> <FormatDateTime date={ideaDetails?.expiry_date} type="DATE" />,{' '}
              <FormatDateTime date={ideaDetails?.expiry_date} type="TIME" />
            </span>
            <div>
              <span>
                <b>Author:</b> {ideaDetails?.user.firstname} {ideaDetails?.user.lastname}
              </span>
            </div>
            {!isLoading && isInvestor?.length === 0 && (
              <div className="row">
                <div className="col-3 offset-9">
                  <button
                    onClick={handleBeInvestor}
                    className="app-form-button app-button-warning w-100 text-decoration-none d-block text-black"
                  >
                    Be investor
                  </button>
                </div>
              </div>
            )}
          </CardStyle>
        )}
      </div>
    </div>
  );
}

export default ClientIdeaDetails;
