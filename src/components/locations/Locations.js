import React from "react";
import ErrorMessage from "../error/ErrorMessage";
import Table from "../table/Table";
import DataService from "../../services/dataService";
import { Link } from "react-router-dom";

const LOCATION_TABLE_HEADERS = [
    { value: "#" },
    { value: "Name" },
    { value: "Type" },
    { value: "Dimension" },
    { value: "" },
];
const INPUT_SEARCH_NAME = "search";
const EMPRTY_STRING = "";
const SEARCH_INFO_MESSAGE = "Search result";

class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { locations: [], searchInfo: EMPRTY_STRING, isErrorSearch: false, headers: LOCATION_TABLE_HEADERS }
        this.dataService = new DataService();
        this.showLocations = (results, isSearch = false) => {
            let newLocations = results.map(result => {
                return {
                    id: result.id,
                    name: result.name,
                    type: result.type,
                    dimension: result.dimension,
                    button: <Link className="btn btn-primary" to={`locations/${result.id}`}>See more</Link>,
                };
            });
            this.setState({
                locations: newLocations,
                searchInfo: isSearch
                    ? `${SEARCH_INFO_MESSAGE}: ${newLocations.length}`
                    : EMPRTY_STRING,
                isErrorSearch: false,
            });
        };
        this.getDefaultData = () => {
            this.dataService.getLocations().then(data => {
                this.showLocations(data.results)
            });
        };
        this.componentDidMount = () => this.getDefaultData();
        this.searchByName = (e) => {
            e.preventDefault()
            let name = e.target.elements[INPUT_SEARCH_NAME].value;
            this.dataService.getLocationsByName(name)
                .then(data => {
                    this.showLocations(data.results, true)
                }).catch(this.onError)
        };
        this.onError = (error) => {
            this.setState({ isErrorSearch: true, errorMessage: error.message })
        };
        this.clearResult = (e) => {
            e.preventDefault();
            document.forms.locations[INPUT_SEARCH_NAME].value = EMPRTY_STRING;
            this.getDefaultData();
        }
    };
    render() {
        return (
            <>
                <h3>Locations</h3>
                <div className="mb-2">
                    <form name="locations" onSubmit={this.searchByName} className="form-inline my-2 my-lg-0">
                        <input name={INPUT_SEARCH_NAME}
                            required
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                        />
                        <button
                            className="btn btn-outline-primary my-2 my-sm-0 search_button"
                            type="submit"
                        >
                            Search by Name
                </button>
                        <button
                            onClick={this.clearResult}
                            className="btn btn-outline-primary my-2 my-sm-0"
                            type="submit"
                        >
                            Clear result
                </button>
                    </form>
                </div>
                {this.state.searchInfo === EMPRTY_STRING ? null : <p>{this.state.searchInfo}</p>}
                {this.state.isErrorSearch
                    ? <ErrorMessage errorMessage={this.state.errorMessage} />
                    : <Table
                        headers={this.state.headers}
                        locationsOrEpisodes={this.state.locations}
                    />
                }
            </>
        )
    }
}

export default Locations;