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

type Props = {
  config?: any;
  data?: any;
};

const COMPONENTS = {
  Address: Address,
  Concat: Concat,
  DateTime: DateTime,
  Image: Image,
  Value: Value,
  ResultActions: ResultActions
};

/**
 * Component for showing search results in list format.
 * Data payload provided by {@link SearchContext}.
 *
 * @component
 * @prop {object} config  Configuration object.
 * @prop {string} config.id  Path to ID. Passed as identifier to Detail view.
 * @prop {object} config.thumbnail  Thumbnail configuration object.
 * @prop {string} config.thumbnail.src  Path to thumbnail source URL.
 * @prop {string} config.thumbnail.width  Thumbnail width (as CSS width value).
 * @prop {string} config.thumbnail.height  Thumbnail height (as CSS width value).
 * @prop {string} config.title  Path to title associated with record. Clicking title in UI takes you to the
 * Detail view for that result.
 * @prop {object[]} config.items  Array of item configuration objects. Item can be value-based or component-based.
 * @prop {string} config.items.value  Path to value-based item.
 * @prop {string} config.items.className  CSS class name to apply to item value.
 * @prop {string} config.items.component  Name of component used to render component-based item.
 * @prop {object} config.items.config  Object of configuration properties for item component.
 * @prop {object} config.categories  Categories configuration object.
 * @prop {string} config.categories.value  Path to categories.
 * @prop {object} config.categories.colors  Key/value pairs specifying categories and their colors.
 * @prop {object} config.timestamp  Timestamp configuration object.
 * @prop {string} config.timestamp.value  Path to timestamp.
 * @prop {string} config.timestamp.label  Label prefix for timestamp.
 * @prop {string} config.status  Path to status associated with record.
 * @example
 * // Configuration
 * const searchResultsConfig = {
 *   id: "extracted.person.id",
 *   thumbnail: {
 *       src: "extracted.person.image",
 *       width: "70px",
 *       height: "70px"
 *   },
 *   title: "extracted.person.name",
 *   items: [
 *       // Component-based item example
 *       {
 *          component: "Address",
 *          config: {
 *            city: "extracted.person.address.city",
 *            state: "extracted.person.address.state"
 *          }
 *       },
 *       // Value-based item examples
 *       {value: "extracted.person.phone", className: "phone"},
 *       {value: "extracted.person.ssn"}
 *   ],
 *   categories: {
 *       value: "extracted.person.sources",
 *       colors: "sourcesColors"
 *   },
 *   timestamp: {
 *       value: "extracted.person.createdOn",
 *       label: "Time is"
 *   },
 *   status: "extracted.person.status"
 * }
 * @example
 * // JSX
 * <ResultsList config={searchResultsConfig} />
 */
const ResultsList: React.FC<Props> = (props) => {

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
    let titleValue = results?.uri ? results?.uri : "No record URI";
    return (
        <div key={"result-" + index} className="result">
            <div className="details">
            <div className="title no-entity"><Value id={results?.uri}>{titleValue}</Value></div>
          <div className="title no-entity"><Value id={results?.uri}>{titleValue}</Value></div>
                <div className="subtitle no-entity"><ResultSnippet config={{}} data={results} /></div>
            </div>
        </div>
    )
  }

  // Handle both singular and array cases for categories
  const getCategories = (results, config) => {
    let res = getValByConfig(results, config);
    return _.isArray(res) ? res : [res];
  }

  const getResults = () => {
    // let results = searchContext.searchResults.result.map((results, index) => {
    let results = props.data.results.map((results, index) => {
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
      let titleValue: any, idValue: any;
      if (configEntityType.title?.component && configEntityType.title?.config) {
        titleValue = (<span>
            {React.createElement(
                COMPONENTS[configEntityType.title.component], 
                { config: configEntityType.title.config, data: results }, null
            )}
            </span>);   
        if (configEntityType.title?.id) {
            idValue = getValByConfig(results, configEntityType.title.id);
        }
      } else {
        if (results?.uri) {
            titleValue = results?.uri;
            idValue = results?.uri;
        }
      }
      return (
        <div key={"result-" + index} className="result">
          {<span className="entityIcon" data-testid={"entity-icon-" + index}><FontAwesomeIcon icon={iconElement} color={configEntityType.icon ? configEntityType.icon.color : defaultIcon.color} /></span>}
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
                {getCategories(results, configEntityType.categories)!.map((s, index2) => {
                  return (
                    <Chiclet
                      key={"category-" + index2}
                      config={configEntityType.categories}
                    >{s}</Chiclet>
                  );
                })}
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
              {configEntityType.resultActions?.component ?
                React.createElement(
                  COMPONENTS[configEntityType.resultActions.component],
                  {config: configEntityType?.resultActions.config, data: results?.extracted}, null
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
      {(props.data?.results?.length) > 0 ? (
        <div>
          {getResults()}
        </div>
      ) : <div className="noResults">No results</div>
      }
    </div>
  );
};

export default ResultsList;
