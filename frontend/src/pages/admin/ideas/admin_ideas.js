import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PATH_ADMIN_IDEA_CREATE, PATH_ADMIN_IDEA_DETAILS } from '../../../consts';
import { useIdeas } from '../../../store/idea-provider';

const CardStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px, rgb(51, 51, 51) 0 0 0 3px;
  padding: 30px 15px;
  margin-bottom: 15px;
`;

function AdminIdeas() {
  const { ideasList, getIdeasList } = useIdeas();

  useEffect(() => {
    getIdeasList();
  }, [getIdeasList]);

  console.log(ideasList);

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
        <CardStyle>
          <h4>
            Blockchain remains on the path of totally changing the face of financial transactions
            worldwide.
          </h4>
          <hr />
          <p>
            The global market for Blockchain Technology estimated at US$3.4 Billion in the year
            2022, is projected to reach a revised size of US$19.9 Billion by 2026, growing at a CAGR
            of 43% over the analysis period. Financial institutions have been spearheading
            innovations in the Blockchain technology space and technology companies with a foothold
            in these companies will do well.
          </p>
          <div>
            <span>
              <b>Risk rating:</b> 1 - Suitable for very conservative investors
            </span>
          </div>
          <div>
            <span>
              <b>Instruments:</b> IBM, AWS, SAP, Oracle, Infosys
            </span>
          </div>
          <div>
            <span>
              <b>Currency:</b> USD, EUR, INR
            </span>
          </div>
          <div>
            <span>
              <b>Major Sector:</b> Technology
            </span>
          </div>
          <div>
            <span>
              <b>Minor Sector:</b> Software & IT Services
            </span>
          </div>
          <div>
            <span>
              <b>Region:</b> Americas, Europe, Asia
            </span>
          </div>
          <div>
            <span>
              <b>Country:</b> United States of America, Germany, India
            </span>
          </div>
          <span>
            <b>Publish date:</b> 4/12/2023, 9:34 AM, <b>Expiry Date:</b> 4/12/2023, 9:34 AM
          </span>
          <div>
            <span>
              <b>Author:</b> Ozodbek Oripjonov
            </span>
          </div>
          <div className="row">
            <div className="col-3 offset-9">
              <Link
                to={PATH_ADMIN_IDEA_DETAILS}
                className="app-form-button app-button-primary w-100 text-decoration-none d-block text-white"
              >
                Read more
              </Link>
            </div>
          </div>
        </CardStyle>
        <CardStyle>
          <h4>
            Blockchain remains on the path of totally changing the face of financial transactions
            worldwide.
          </h4>
          <hr />
          <p>
            The global market for Blockchain Technology estimated at US$3.4 Billion in the year
            2022, is projected to reach a revised size of US$19.9 Billion by 2026, growing at a CAGR
            of 43% over the analysis period. Financial institutions have been spearheading
            innovations in the Blockchain technology space and technology companies with a foothold
            in these companies will do well.
          </p>
          <div>
            <span>
              <b>Risk rating:</b> 1 - Suitable for very conservative investors
            </span>
          </div>
          <div>
            <span>
              <b>Instruments:</b> IBM, AWS, SAP, Oracle, Infosys
            </span>
          </div>
          <div>
            <span>
              <b>Currency:</b> USD, EUR, INR
            </span>
          </div>
          <div>
            <span>
              <b>Major Sector:</b> Technology
            </span>
          </div>
          <div>
            <span>
              <b>Minor Sector:</b> Software & IT Services
            </span>
          </div>
          <div>
            <span>
              <b>Region:</b> Americas, Europe, Asia
            </span>
          </div>
          <div>
            <span>
              <b>Country:</b> United States of America, Germany, India
            </span>
          </div>
          <span>
            <b>Publish date:</b> 4/12/2023, 9:34 AM, <b>Expiry Date:</b> 4/12/2023, 9:34 AM
          </span>
          <div>
            <span>
              <b>Author:</b> Ozodbek Oripjonov
            </span>
          </div>
          <div className="row">
            <div className="col-3 offset-9">
              <Link
                to={PATH_ADMIN_IDEA_DETAILS}
                className="app-form-button app-button-primary w-100 text-decoration-none d-block text-white"
              >
                Read more
              </Link>
            </div>
          </div>
        </CardStyle>
        <CardStyle>
          <h4>
            Blockchain remains on the path of totally changing the face of financial transactions
            worldwide.
          </h4>
          <hr />
          <p>
            The global market for Blockchain Technology estimated at US$3.4 Billion in the year
            2022, is projected to reach a revised size of US$19.9 Billion by 2026, growing at a CAGR
            of 43% over the analysis period. Financial institutions have been spearheading
            innovations in the Blockchain technology space and technology companies with a foothold
            in these companies will do well.
          </p>
          <div>
            <span>
              <b>Risk rating:</b> 1 - Suitable for very conservative investors
            </span>
          </div>
          <div>
            <span>
              <b>Instruments:</b> IBM, AWS, SAP, Oracle, Infosys
            </span>
          </div>
          <div>
            <span>
              <b>Currency:</b> USD, EUR, INR
            </span>
          </div>
          <div>
            <span>
              <b>Major Sector:</b> Technology
            </span>
          </div>
          <div>
            <span>
              <b>Minor Sector:</b> Software & IT Services
            </span>
          </div>
          <div>
            <span>
              <b>Region:</b> Americas, Europe, Asia
            </span>
          </div>
          <div>
            <span>
              <b>Country:</b> United States of America, Germany, India
            </span>
          </div>
          <span>
            <b>Publish date:</b> 4/12/2023, 9:34 AM, <b>Expiry Date:</b> 4/12/2023, 9:34 AM
          </span>
          <div>
            <span>
              <b>Author:</b> Ozodbek Oripjonov
            </span>
          </div>
          <div className="row">
            <div className="col-3 offset-9">
              <Link
                to={PATH_ADMIN_IDEA_DETAILS}
                className="app-form-button app-button-primary w-100 text-decoration-none d-block text-white"
              >
                Read more
              </Link>
            </div>
          </div>
        </CardStyle>
      </div>
    </div>
  );
}

export default AdminIdeas;
