import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useIdeas } from '../../store/idea-provider';
import Loader from '../../UI/Loader';
import Markdown from '../../UI/Markdown';
import FormatDateTime from '../../helper/formatDateTime';
import { PATH_CLIENT_HOLDINGS, ROLE_CLIENT, USER_ID } from '../../consts';
import useAsyncLoader from '../../hooks/useAsyncLoader';
import { updateIdeaPotentialClientsAPI, userListByRoleAPI } from '../../api/investApi';
import { MultiSelect } from 'react-multi-select-component';
import { toast } from 'react-toastify';

const CardStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px, rgb(51, 51, 51) 0 0 0 3px;
  padding: 30px 15px;
  margin-bottom: 15px;

  .flag-img {
    width: 24px;
    object-fit: contain;
  }
`;

function RmIdeaDetails() {
  const rm_id = localStorage.getItem(USER_ID);
  const [clients, setClients] = useState([]);
  const [searchParams] = useSearchParams();
  const { isLoading, ideaDetailsWithClientsList, getIdeaDetailsWithClientsList } = useIdeas();
  const id = searchParams.get('id');
  const navigate = useNavigate();

  const { data } = useAsyncLoader(userListByRoleAPI, ROLE_CLIENT);
  const clientList = data?.data?.data;

  useEffect(() => {
    getIdeaDetailsWithClientsList(id);
  }, [getIdeaDetailsWithClientsList, id]);

  const convertArrayToOptions = useCallback((list) => {
    const options = [];
    list?.map((item) => {
      options.push({
        value: item.id,
        label: `${item.firstname} ${item.lastname}`,
      });
    });

    return options;
  }, []);

  const handleAddPotentialClients = async () => {
    const clients_id = [];
    clients?.map((item) => {
      clients_id.push(Number(item.value));
    });

    if (ideaDetailsWithClientsList?.possible_clients.length !== 0) {
      ideaDetailsWithClientsList?.possible_clients?.map((item) => {
        clients_id.push(Number(item.id));
      });
    }

    const rm_ids = [Number(rm_id)];
    if (ideaDetailsWithClientsList?.rms.length !== 0) {
      ideaDetailsWithClientsList?.rms?.map((item) => {
        rm_ids.push(Number(item.id));
      });
    }

    try {
      const response = await updateIdeaPotentialClientsAPI(clients_id, id, rm_ids);
      if (response.data.success) {
        toast.success('New possible clients added!');
        getIdeaDetailsWithClientsList(id);
      }
    } catch (e) {
      toast.error(e.data.message);
    }
  };

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>Idea details</h5>
        {isLoading && <Loader />}
        {!isLoading && (
          <CardStyle>
            <h4>{ideaDetailsWithClientsList?.title}</h4>
            <hr />
            <Markdown value={ideaDetailsWithClientsList?.abstract} />
            <h6>Idea Content</h6>
            <Markdown value={ideaDetailsWithClientsList?.content} />
            <div>
              <span>
                <b>Risk rating:</b>{' '}
                {ideaDetailsWithClientsList?.risk_ratings.map((risk, i) => (
                  <span key={i}>{risk.name}</span>
                ))}
              </span>
            </div>
            <div>
              <span>
                <b>Instruments:</b>{' '}
                {ideaDetailsWithClientsList?.instruments.map((instrument, i) => (
                  <span key={i}>{instrument.name}, </span>
                ))}
              </span>
            </div>
            <div>
              <span>
                <b>Currency:</b>{' '}
                {ideaDetailsWithClientsList?.currencies.map((currency, i) => (
                  <span key={i}>{currency.title}, </span>
                ))}
              </span>
            </div>
            <div>
              <span>
                <b>Major Sector:</b>{' '}
                {ideaDetailsWithClientsList?.major_sectors.map((major_sector, i) => (
                  <span key={i}>{major_sector.name} </span>
                ))}
              </span>
            </div>
            <div>
              <span>
                <b>Minor Sector:</b>{' '}
                {ideaDetailsWithClientsList?.minor_sectors.map((minor_sector, i) => (
                  <span key={i}>{minor_sector.name} </span>
                ))}
              </span>
            </div>
            <div>
              <span>
                <b>Region:</b>{' '}
                {ideaDetailsWithClientsList?.regions.map((region, i) => (
                  <span key={i}>{region.name}, </span>
                ))}
              </span>
            </div>
            <div>
              <span>
                <b>Country:</b>{' '}
                {ideaDetailsWithClientsList?.countries.map((country, i) => (
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
              <b>Publish date:</b>{' '}
              <FormatDateTime date={ideaDetailsWithClientsList?.publish_date} type="DATE" />,{' '}
              <FormatDateTime date={ideaDetailsWithClientsList?.publish_date} type="TIME" />
              <b> Expiry Date:</b>{' '}
              <FormatDateTime date={ideaDetailsWithClientsList?.expiry_date} type="DATE" />,{' '}
              <FormatDateTime date={ideaDetailsWithClientsList?.expiry_date} type="TIME" />
            </span>
            <div>
              <span>
                <b>Author:</b> {ideaDetailsWithClientsList?.user.firstname}{' '}
                {ideaDetailsWithClientsList?.user.lastname}
              </span>
            </div>
            <div>
              <hr />
              <h6>Possible clients list:</h6>
              <div className="row">
                {ideaDetailsWithClientsList?.possible_clients.length === 0 && (
                  <div className="col-12 mb-3">No possible clients</div>
                )}
                {ideaDetailsWithClientsList?.possible_clients.length !== 0 &&
                  ideaDetailsWithClientsList?.possible_clients.map((item, i) => (
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
            </div>
            <div>
              <hr />
              <h6>Add new possible clients:</h6>
              <MultiSelect
                options={() => convertArrayToOptions(clientList, setClients)}
                value={clients}
                onChange={setClients}
                labelledBy="Select"
              />
            </div>
            <div className="row mt-3">
              <div className="col-3 offset-9">
                <button
                  disabled={clients.length === 0}
                  onClick={handleAddPotentialClients}
                  className="app-form-button app-button-warning w-100 text-decoration-none d-block text-black"
                >
                  Submit
                </button>
              </div>
            </div>
          </CardStyle>
        )}
      </div>
    </div>
  );
}

export default RmIdeaDetails;
