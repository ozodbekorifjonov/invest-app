import React from 'react';
import styled from 'styled-components';
import Markdown from '../../../UI/Markdown';

const CardStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px, rgb(51, 51, 51) 0 0 0 3px;
  padding: 30px 15px;
  margin-bottom: 15px;
`;

function AdminIdeaDetails() {
  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>Idea details</h5>
        <CardStyle>
          <h4>
            Blockchain remains on the path of totally changing the face of financial transactions
            worldwide.
          </h4>
          <hr />
          <Markdown
            value={`The global market for Blockchain Technology estimated at US$3.4 Billion in the year 2022, is projected to reach a
revised size of US$19.9 Billion by 2026, growing at a CAGR of 43% over the analysis period. Financial institutions
have been spearheading innovations in the Blockchain technology space and technology companies with a
foothold in these companies will do well`}
          />
          <h6>Idea Content</h6>
          <Markdown
            value={`Fast, truly global in reach, and with low processing fees, blockchain remains on the path of totally changing the face of financial transactions worldwide.
Blockchain is a permanent database that keeps record of every transaction that is executed. The technology has become an integral part of business-to-business and business-to-
consumer commerce, products and legal processes. In the banking, financial services and insurance sector, growth is expected to benefit from the growing adoption of blockchain
in applications such as digital identities, payments, exchanges and documentation.
Financial institutions have been spearheading innovations in the Blockchain technology space, with the sector already witness to successful implementations of use cases such as
Nasdaqs private market trading platform and Ripples cross border payment platform. Blockchain holds significant potential for prescription management, medical data, online

shopping and other areas. The technology is likely to help companies in controlling supply chains, achieving traceability of products and maintaining auditable record of goods
movement. In the post COVID-19 period, growth in the market will be led by next-generation blockchain innovations and the resulting development of new applications areas.
Amid the COVID-19 crisis, the global market for Blockchain Technology estimated at US$3.4 Billion in the year 2022, is projected to reach a revised size of US$19.9 Billion by 2026,
growing at a CAGR of 43% over the analysis period. Public, one of the segments analyzed in the report, is projected to grow at a 44.8% CAGR to reach US$21.5 Billion by the end of
the analysis period.
The Blockchain Technology market in the U.S. is estimated at US$1 Billion in the year 2022. The country currently accounts for a 31.64% share in the global market. China, the
world's second largest economy, is forecast to reach an estimated market size of US$2.1 Billion in the year 2026 trailing a CAGR of 50.2% through the analysis period.
When it comes to the sector that has the highest distribution of blockchain market value, the banking industry rules with a 29.7% share. Followed by process manufacturing
(11.4%), discrete manufacturing (10.9%), and professional services (6.6%) (IDC, 2020). The bullish rush by investors to increase the reach of blockchain services is of course easily
matched by the ever-increasing adopters of blockchain wallets, which now stands at 40 million worldwide (Statista, 2021). To give you a perspective, that stood at just 11 million in
2016.
Another analysis by PwC suggests that 2025 will be the tipping point when blockchain technologies will be adopted at scale across economies worldwide. Currently, tracking and
tracing of products and services is the top priority of many companies. Other key application areas include payments and financial services, contracts and dispute resolution, and
identity management (PwC, 2020).
`}
          />
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
              <button className="app-form-button app-button-warning w-100">Edit</button>
            </div>
          </div>
        </CardStyle>
      </div>
    </div>
  );
}

export default AdminIdeaDetails;
