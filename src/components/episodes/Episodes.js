import React from "react";
import Table from "../table/Table";
import DataService from "../../services/dataService";
import { Link } from "react-router-dom"

const STRING_ID = "id";
const STRING_NAME = "name";
const STRING_DATE = "date";
const STRING_EPISODE = "episode";
const SYMBOL_SHARP = "#";
const STYLE_FOCUSED_HEADER_DOWN = "focused_header_down";
const HEADERS = [
    { value: "#", isSortedFromAToB: false, isSortedFromBToA: false },
    { value: "Name", isSortedFromAToB: false, isSortedFromBToA: false },
    { value: "Date", isSortedFromAToB: false, isSortedFromBToA: false },
    { value: "Episode", isSortedFromAToB: false, isSortedFromBToA: false },
    { value: "", isSortedFromAToB: false, isSortedFromBToA: false }
];

export default class Episodes extends React.Component {
    constructor(props) {
        super(props);
        this.state = { episodes: [], headers: HEADERS };
        this.dataService = new DataService();
        this.componentDidMount = () => {
            this.dataService.getEpisodes().then(data => {
                let filtratedEpisodes = data.results.map(value => {
                    return {
                        id: value.id,
                        name: value.name,
                        date: value.air_date,
                        episode: value.episode,
                        button: <Link
                            className="btn btn-primary"
                            to={`/episodes/${value.id}`}
                        >
                            See more
                            </Link>
                    }
                })
                this.setState({ episodes: filtratedEpisodes })
            })
        }
        this.sortList = (key, isReverseSort = false) => {
            this.setState(state => {
                let sort;
                if (key === STRING_DATE) {
                    sort = state.episodes.sort((a, b) => {
                        const A = isReverseSort ? a.date : b.date;
                        const B = isReverseSort ? b.date : a.date
                        return new Date(A) - new Date(B)
                    })
                }
                else {
                    sort = state.episodes.sort((a, b) => {
                        if (a[key] > b[key]) {
                            return isReverseSort ? 1 : -1;
                        }
                        if (a[key] < b[key]) {
                            return isReverseSort ? -1 : 1;
                        }
                        return 0;
                    })
                }
                key = key === STRING_ID ? SYMBOL_SHARP : key;
                let newHeaders = state.headers.map(item => {
                    const itemValue = item.value.toLowerCase()
                    if (isReverseSort) {
                        item.isSortedFromBToA = false;
                        item.isSortedFromAToB = itemValue === key;
                    }
                    else {
                        item.isSortedFromBToA = itemValue === key;
                        item.isSortedFromAToB = false;
                    }
                    return item;
                })
                return { episodes: sort, headers: newHeaders }
            })
        }
        this.chooseTypeOfSort = (targetId, stringTitle) => {
            if (targetId === STYLE_FOCUSED_HEADER_DOWN) {
                return this.sortList(stringTitle)
            }
            this.sortList(stringTitle, true)
        }
        this.sortByClick = (e) => {
            const target = e.target.innerText;
            const targetId = e.target.id;
            switch (target) {
                case HEADERS[0].value:
                    this.chooseTypeOfSort(targetId, STRING_ID);
                    break;
                case HEADERS[1].value:
                    this.chooseTypeOfSort(targetId, STRING_NAME);
                    break;
                case HEADERS[2].value:
                    this.chooseTypeOfSort(targetId, STRING_DATE);
                    break;
                case HEADERS[3].value:
                    this.chooseTypeOfSort(targetId, STRING_EPISODE);
                    break;
                default:
                    break;
            }
        }
    }
    render() {
        return (
            <>
                <h3>Episodes</h3>
                <Table sortByClick={this.sortByClick} headers={this.state.headers} locationsOrEpisodes={this.state.episodes} />
            </>
        )
    }
}