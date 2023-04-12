import React, { useState } from 'react';
import styled from 'styled-components';
import TextEditor from '../../../helper/textEditor';
import { MultiSelect } from 'react-multi-select-component';

const CardStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px, rgb(51, 51, 51) 0 0 0 3px;
  padding: 30px 15px;
  margin-bottom: 15px;
`;
const TextEditorStyle = styled.div`
  height: 25rem;
  position: relative;
  margin-bottom: 50px;

  .editor-input {
    height: 100%;
  }
`;

const options = [
  { label: 'Grapes 🍇', value: 'grapes' },
  { label: 'Mango 🥭', value: 'mango' },
  { label: 'Strawberry 🍓', value: 'strawberry', disabled: true },
];

function AdminIdeaCreate() {
  const [riskRating, setRiskRating] = useState(null);
  const [productType, setProductType] = useState(null);
  const [majorSector, setMajorSector] = useState(null);
  const [minorSector, setMinorSector] = useState(null);
  const [instruments, setInstruments] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [region, setRegion] = useState([]);
  const [country, setCountry] = useState([]);

  const getContentValue = (val) => {
    console.log(val);
  };

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>New Idea</h5>
        <CardStyle>
          <div className="app-form-control">
            <input name="title" type="text" placeholder="Title" />
          </div>
          <div className="app-form-control">
            <textarea name="abstract" rows={5} placeholder="Abstract" />
          </div>
          <TextEditorStyle>
            <TextEditor getContentValue={getContentValue} className="editor-input" />
          </TextEditorStyle>
          <div className="app-form-control">
            <select required={true} onChange={(event) => setRiskRating(event.target.value)}>
              <option value="null">Select risk rating</option>
              <option value="CLIENT">Client</option>
              <option value="RM">RM</option>
            </select>
          </div>
          <div className="app-form-control">
            <select required={true} onChange={(event) => setProductType(event.target.value)}>
              <option value="null">Select product type</option>
              <option value="CLIENT">Client</option>
              <option value="RM">RM</option>
            </select>
          </div>
          <div className="app-form-control">
            <select required={true} onChange={(event) => setMajorSector(event.target.value)}>
              <option value="null">Select major sector</option>
              <option value="CLIENT">Client</option>
              <option value="RM">RM</option>
            </select>
          </div>
          <div className="app-form-control">
            <select required={true} onChange={(event) => setMinorSector(event.target.value)}>
              <option value="null">Select minor sector</option>
              <option value="CLIENT">Client</option>
              <option value="RM">RM</option>
            </select>
          </div>
          <div className="app-form-control">
            <span>Instruments</span>
            <MultiSelect
              options={options}
              value={instruments}
              onChange={setInstruments}
              labelledBy="Select"
            />
          </div>
          <div className="app-form-control">
            <span>Currency</span>
            <MultiSelect
              options={options}
              value={currency}
              onChange={setCurrency}
              labelledBy="Select"
            />
          </div>
          <div className="app-form-control">
            <span>Region</span>
            <MultiSelect
              options={options}
              value={region}
              onChange={setRegion}
              labelledBy="Select"
            />
          </div>
          <div className="app-form-control">
            <span>Country</span>
            <MultiSelect
              options={options}
              value={country}
              onChange={setCountry}
              labelledBy="Select"
            />
          </div>
          <div className="d-flex">
            <div className="app-form-control me-3">
              <label htmlFor="publish_date">Publish date:</label>
              <input type="datetime-local" id="publish_date" name="publish_date" />
            </div>
            <div className="app-form-control ms-3">
              <label htmlFor="expiry_date">Expiry date:</label>
              <input type="datetime-local" id="expiry_date" name="expiry_date" />
            </div>
          </div>
          <div className="row">
            <div className="col-4 offset-8">
              <button className="app-form-button app-button-success w-100 text-decoration-none d-block text-black">
                Add new idea
              </button>
            </div>
          </div>
        </CardStyle>
      </div>
    </div>
  );
}

export default AdminIdeaCreate;
