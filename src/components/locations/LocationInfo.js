import DataService from "../../services/dataService";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LocationInfo(props) {
    const [locationData, setLocationData] = useState({});
    useEffect(() => {
        let dataServise = new DataService();
        dataServise.getLocationById(props.id)
            .then(data => {
                setLocationData(data)
            })
            .catch(error => console.log(error.message))
    }, [props.id])
    const { name, type, dimension } = locationData;
    return (
        <div className="card">
            <div className="card-header">{name}</div>
            <div className="card-body">
                <h5 className="card-title">{type}</h5>
                <p className="card-text">
                    <strong>
                        Dimension is
                    </strong>  {dimension}</p>
                <Link className="btn btn-primary" to="/locations">
                    Go back
                    </Link>
            </div>
        </div>
    )
}