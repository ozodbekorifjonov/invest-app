import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TextEditor from '../../../helper/textEditor';
import { MultiSelect } from 'react-multi-select-component';
import { useRecommends } from '../../../store/recommend-provider';
import { createIdeaAPI, updateIdeaAPI } from '../../../api/investApi';
import { toast } from 'react-toastify';
import { PATH_ADMIN_IDEAS, USER_ID } from '../../../consts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useIdeas } from '../../../store/idea-provider';
import Loader from '../../../UI/Loader';

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

function TextEditorComp({ getContentValue, content }) {
  return (
    <TextEditor getContentValue={getContentValue} className="editor-input" defaultValue={content} />
  );
}

function AdminIdeaCreate() {
  const [riskRating, setRiskRating] = useState(null);
  const [productType, setProductType] = useState(null);
  const [majorSector, setMajorSector] = useState(null);
  const [minorSector, setMinorSector] = useState(null);
  const [content, setContent] = useState(null);
  const [instruments, setInstruments] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [region, setRegion] = useState([]);
  const [country, setCountry] = useState([]);

  const navigate = useNavigate();

  const title = useRef();
  const abstract = useRef();
  const publish_date = useRef();
  const expiry_date = useRef();

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { isLoading, ideaDetails, getIdeaDetails } = useIdeas();

  const {
    getRiskRatingList,
    riskRatingList,
    getProductTypesList,
    productTypesList,
    getMajorSectorList,
    majorSectorList,
    getMinorSectorList,
    minorSectorList,
    getInstrumentsList,
    instrumentList,
    getCurrenciesList,
    currenciesList,
    getRegionList,
    regionList,
    getCountriesList,
    countriesList,
  } = useRecommends();

  useEffect(() => {
    getRiskRatingList();
    getProductTypesList();
    getMajorSectorList();
    getMinorSectorList();
    getInstrumentsList();
    getCurrenciesList();
    getRegionList();
    getCountriesList();

    if (id) {
      getIdeaDetails(id);
    }
  }, [
    getRiskRatingList,
    getProductTypesList,
    getMajorSectorList,
    getMinorSectorList,
    getInstrumentsList,
    getCurrenciesList,
    getRegionList,
    getCountriesList,
    getIdeaDetails,
    id,
  ]);

  const getContentValue = (val) => setContent(val);

  const convertArrayToOptions = useCallback((list) => {
    const options = [];
    list.map((item) => {
      options.push({
        value: item.id,
        label: item.name || item.title,
      });
    });

    return options;
  }, []);

  const convertOptionsToArray = useCallback((list) => {
    const options = [];
    list.map((item) => {
      options.push(item.value);
    });

    return options;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newIdea = {
      title: title.current.value,
      abstract: abstract.current.value,
      publish_date: publish_date.current.value,
      expiry_date: expiry_date.current.value,
      content: content,
      user_id: localStorage.getItem(USER_ID),
      risk_ratings: [riskRating].map((e) => Number(e)),
      product_types: [productType].map((e) => Number(e)),
      major_sectors: [majorSector].map((e) => Number(e)),
      minor_sectors: [minorSector].map((e) => Number(e)),
      instruments: convertOptionsToArray(instruments),
      currencies: convertOptionsToArray(currency),
      regions: convertOptionsToArray(region),
      countries: convertOptionsToArray(country),
    };

    try {
      let response;
      if (id) {
        response = await updateIdeaAPI(newIdea, id);
      } else {
        response = await createIdeaAPI(newIdea);
      }

      if (response.data.success) {
        navigate(PATH_ADMIN_IDEAS);
        toast.success(response.data.message);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>New Idea</h5>
        {id && isLoading && <Loader />}
        <CardStyle>
          <form onSubmit={handleSubmit}>
            <div className="app-form-control">
              <input
                ref={title}
                name="title"
                defaultValue={id && ideaDetails?.title}
                type="text"
                placeholder="Title"
                required={true}
              />
            </div>
            <div className="app-form-control">
              <textarea
                ref={abstract}
                name="abstract"
                defaultValue={id && ideaDetails?.abstract}
                rows={5}
                placeholder="Abstract"
                required={true}
              />
            </div>
            <TextEditorStyle>
              {id ? (
                ideaDetails && (
                  <TextEditorComp
                    getContentValue={getContentValue}
                    className="editor-input"
                    content={ideaDetails.content}
                  />
                )
              ) : (
                <TextEditor getContentValue={getContentValue} className="editor-input" />
              )}
            </TextEditorStyle>
            <div className="app-form-control">
              <select required={true} onChange={(event) => setRiskRating(event.target.value)}>
                <option value="null">Select risk rating</option>
                {riskRatingList?.map((item, i) => (
                  <option
                    key={i}
                    value={item.id}
                    selected={id && item.id === ideaDetails?.risk_ratings[0].id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="app-form-control">
              <select required={true} onChange={(event) => setProductType(event.target.value)}>
                <option value="null">Select product type</option>
                {productTypesList?.map((item, i) => (
                  <option
                    key={i}
                    value={item.id}
                    selected={id && item.id === ideaDetails?.product_types[0].id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="app-form-control">
              <select required={true} onChange={(event) => setMajorSector(event.target.value)}>
                <option value="null">Select major sector</option>
                {majorSectorList?.map((item, i) => (
                  <option
                    key={i}
                    value={item.id}
                    selected={id && item.id === ideaDetails?.major_sectors[0].id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="app-form-control">
              <select required={true} onChange={(event) => setMinorSector(event.target.value)}>
                <option value="null">Select minor sector</option>
                {minorSectorList?.map((item, i) => (
                  <option
                    key={i}
                    value={item.id}
                    selected={id && item.id === ideaDetails?.minor_sectors[0].id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="app-form-control">
              <span>Instruments</span>
              {id && (
                <div>
                  Default selected instruments:
                  {ideaDetails?.instruments.map((item, i) => (
                    <span key={i}> {item.name}, </span>
                  ))}
                </div>
              )}
              <MultiSelect
                options={() => convertArrayToOptions(instrumentList, setInstruments)}
                value={instruments}
                onChange={setInstruments}
                labelledBy="Select"
              />
            </div>
            <div className="app-form-control">
              <span>Currency</span>
              {id && (
                <div>
                  Default selected currencies:
                  {ideaDetails?.currencies.map((item, i) => (
                    <span key={i}> {item.title}, </span>
                  ))}
                </div>
              )}
              <MultiSelect
                options={() => convertArrayToOptions(currenciesList, setCurrency)}
                value={currency}
                onChange={setCurrency}
                labelledBy="Select"
              />
            </div>
            <div className="app-form-control">
              <span>Region</span>
              {id && (
                <div>
                  Default selected regions:
                  {ideaDetails?.regions.map((item, i) => (
                    <span key={i}> {item.name}, </span>
                  ))}
                </div>
              )}
              <MultiSelect
                options={() => convertArrayToOptions(regionList, setRegion)}
                value={region}
                onChange={setRegion}
                labelledBy="Select"
              />
            </div>
            <div className="app-form-control">
              <span>Country</span>
              {id && (
                <div>
                  Default selected countries:
                  {ideaDetails?.countries.map((item, i) => (
                    <span key={i}> {item.name}, </span>
                  ))}
                </div>
              )}
              <MultiSelect
                options={() => convertArrayToOptions(countriesList, setCountry)}
                value={country}
                onChange={setCountry}
                labelledBy="Select"
              />
            </div>
            <div className="d-flex">
              <div className="app-form-control me-3">
                <label htmlFor="publish_date">Publish date:</label>
                <input
                  ref={publish_date}
                  type="datetime-local"
                  id="publish_date"
                  name="publish_date"
                  defaultValue={id && ideaDetails?.publish_date}
                />
              </div>
              <div className="app-form-control ms-3">
                <label htmlFor="expiry_date">Expiry date:</label>
                <input
                  ref={expiry_date}
                  type="datetime-local"
                  id="expiry_date"
                  name="expiry_date"
                  defaultValue={id && ideaDetails?.expiry_date}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4 offset-8">
                <button className="app-form-button app-button-success w-100 text-decoration-none d-block text-black">
                  Add new idea
                </button>
              </div>
            </div>
          </form>
        </CardStyle>
      </div>
    </div>
  );
}

export default AdminIdeaCreate;
