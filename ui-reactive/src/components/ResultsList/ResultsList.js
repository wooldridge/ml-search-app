import React, {useContext} from "react";
import Address from "../Address/Address";
import Chiclet from "../Chiclet/Chiclet";
import Concat from "../Concat/Concat";
import DateTime from "../DateTime/DateTime";
import Image from "../Image/Image";
import List from "../List/List";
import Value from "../Value/Value";
import ResultSnippet from "../ResultSnippet/ResultSnippet";
import "./ResultsList.scss";
import {getValByConfig} from "../../util/util";
import ResultActions from "../ResultActions/ResultActions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as FaDictionary from '@fortawesome/free-solid-svg-icons'
import {CaretDownFill, CaretUpFill} from "react-bootstrap-icons";
import _ from "lodash";

const COMPONENTS = {
  Address: Address,
  Concat: Concat,
  DateTime: DateTime,
  Image: Image,
  Value: Value,
  ResultActions: ResultActions
};

const ResultsList = (props) => {

  const handleTitleClick = (id) => {
    // id could be an event object if valueId undefined
    // if (_.isObjectLike(id)) {
    //     detailContext.handleGetDetail(id.target.id);
    // } else {
    //     detailContext.handleGetDetail(id);
    // }
    console.log("handleTitleClick", id);
  };

  // Display URI and snippet (if available) if result entity not recognized
  const getResultNoEntity = (results, index) => {
    let titleValue = results.uri ? results.uri : "No record URI";
    return (
        <div key={"result-" + index} className="result">
            <div className="details">
            <div className="title no-entity"><Value id={results.uri}>{titleValue}</Value></div>
            <div className="title no-entity"><Value id={results.uri}>{titleValue}</Value></div>
                <div className="subtitle no-entity"><ResultSnippet config={{}} data={results} /></div>
            </div>
        </div>
    )
  }

  // Handle both singular and array cases for categories
  const getCategories = (results, config) => {
    let res = getValByConfig(results, config);
    res = _.isArray(res) ? res : [res];
    res = res.map((s, index2) => {
      return (
        <Chiclet
          key={"category-" + index2}
          config={config}
        >{s}</Chiclet>
      )
    });
    return res;
  }

  const getResults = () => {
    // let results = searchContext.searchResults.result.map((results, index) => {
    // let results = _.isArray(props.data) && props.data.map((results, index) => {
    console.log("getResults", props.data, props.config);
    let results = _.isArray(props.data) && props.data.map((results, index) => {
      // Get entity type via configured path (root relative if configured) or at default property "entityType"
      const entityType = props.config.entityType ? 
        (props.config.entityType.rootRelative ? getValByConfig(props.data, props.config.entityType) :
        getValByConfig(results, props.config.entityType)) :
        results.entityType;
      const configEntityType = entityType && props.config.entities[entityType];
      if (!configEntityType) {
          return getResultNoEntity(results, index);
      }
      let defaultIcon = props.config.defaultIcon
      let iconElement = (configEntityType && configEntityType.icon) ? FaDictionary[configEntityType.icon.type] : FaDictionary[defaultIcon.type];
      let titleValue, idValue;
      if (configEntityType.title.component && configEntityType.title.config) {
        titleValue = (<span>
            {React.createElement(
                COMPONENTS[configEntityType.title.component], 
                { config: configEntityType.title.config, data: results }, null
            )}
            </span>);   
        if (configEntityType.title.id) {
            idValue = getValByConfig(results, configEntityType.title.id);
        }
      } else {
        if (results.uri) {
            titleValue = results.uri;
            idValue = results.uri;
        }
      }
      return (
        <div key={"result-" + index} className="result">
          <span className="entityIcon" data-testid={"entity-icon-" + index}><FontAwesomeIcon icon={iconElement} color={configEntityType.icon ? configEntityType.icon.color : defaultIcon.color} /></span>
          <div className="thumbnail">
            {configEntityType.thumbnail ?
              <Image data={results} config={configEntityType.thumbnail.config} />
              : null}
          </div>
          <div className="details">
            {/* TODO onClick handleTitleClick removed */}
            <div className="title" onClick={e => handleTitleClick(idValue)}>
                {titleValue}
            </div>
            <div className="subtitle">
              {configEntityType.items ?
                <List data={results} config={configEntityType.items} />
                : null}
            </div>
            {configEntityType.categories ?
              <div className="categories">
                {getCategories(results, configEntityType.categories)}
              </div> : null}
          </div>
          <div className="actions">
            {configEntityType.timestamp ?
              <div className="timestamp">
                <DateTime config={configEntityType.timestamp} data={results} style={configEntityType.timestamp.style} />
              </div> : null}
            <div className="icons">
              {configEntityType.status ?
                <div className="status">
                  <Value data={results} config={configEntityType.status} getFirst={true} />
                </div> : null}
              {configEntityType.resultActions && configEntityType.resultActions.component ?
                React.createElement(
                  COMPONENTS[configEntityType.resultActions.component],
                  {config: configEntityType.resultActions.config, data: results}
                  , null
                )
                : null}
            </div>
          </div>
        </div>
      );
    });
    return results;
  };

  // TODO removed getSort below
  // TODO removed Pagination below
  return (
    <div className="resultsList">
      {_.isArray(props.data) && props.data.length > 0 ? (
        <div>
          {getResults()}
        </div>
      ) : <div className="noResults">No results</div>
      }
    </div>
  );
};

export default ResultsList;
