import DataService from "../../services/dataService";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const NUMBER_ONE = 1;
const STYLE_DISABLED = "disabled";
const STYLE_PREV_BUTT = "btn btn-primary ";
const STYLE_NEXT_BUTT = "btn btn-secondary ";

export default function EpisodeInfo(props) {
    const [fetchedEpisode, setFetchedEpisode] = useState({});
    const [countOfEpisodes, setCountOfEpisodes] = useState(null);
    const [characters, setCharacters] = useState(null);
    const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(false);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
    const id = Number(props.id);
    useEffect(() => {
        let dataService = new DataService();

        dataService
            .getEpisodes()
            .then(data => setCountOfEpisodes(data.info.count))
            .catch(error => console.log(error.message));

        dataService
            .getEpisodeById(id)
            .then(data => {
                setIsPrevButtonDisabled(false);
                setIsNextButtonDisabled(false);
                if (id === countOfEpisodes) { setIsNextButtonDisabled(true) }
                else if (id === NUMBER_ONE) { setIsPrevButtonDisabled(true) }
                setFetchedEpisode(data);
                setCharacters(data.characters.length)
            })
            .catch(error => console.log(error.message));
    }, [id, countOfEpisodes])

    const { name, episode, air_date } = fetchedEpisode;
    const classNameForPrevButt = isPrevButtonDisabled
        ? STYLE_PREV_BUTT + STYLE_DISABLED
        : STYLE_PREV_BUTT
    const classNameForNextButt = isNextButtonDisabled
        ? STYLE_NEXT_BUTT + STYLE_DISABLED
        : STYLE_NEXT_BUTT
    return (
        <>
            <h3>Episode detailts</h3>
            <div className="list-group lead">
                <div className="list-group-item">
                    <div className="d-flex justify-content-between">
                        <h5 className="mb-1">{episode}</h5>
                        <small>{air_date}</small>
                    </div>
                    <div className="mb-1">
                        <div className="d-inline"><span className="text-gray">Name:</span></div>
                        <p className="d-inline p-2">{name}</p>
                    </div>
                    <div className="mb-1">
                        <div className="d-inline"><span className="text-gray">Сharacters:</span></div>
                        <p className="d-inline p-2">{characters}</p>
                    </div>
                </div>
            </div>
            <div className="modal-footerr">
                <Link className="btn btn-primary" to="/episodes">
                    Go back
                    </Link>
                <div className="nav_buttons">
                    <Link
                        to={`/episodes/${id - NUMBER_ONE}`}
                        className={classNameForPrevButt}
                    >
                        Previous
                        </Link>
                    <Link
                        to={`/episodes/${(id + NUMBER_ONE)}`}
                        className={classNameForNextButt}
                    >
                        Next
                        </Link>
                </div>
            </div>
        </>
    )
}