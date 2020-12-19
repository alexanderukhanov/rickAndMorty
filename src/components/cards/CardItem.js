import CardSection from "./CardSection"

function CardItem(props) {
    const { image, name, status, species, location, gender, type } = props.items;
    return (
        <div className="col mb-4">
            <div className="card h-100">
                <img
                    className="card-img-top"
                    src={image}
                    alt=""
                />
                <div className="card-body">
                    <h4 className="card-title">{name}</h4>
                    <p className={status.toLowerCase()}>{status} - {species}.</p>
                    <CardSection title="Last known location" value={location.name} />
                    <CardSection title="Gender" value={gender} />
                    {type !== "" ? (<CardSection title="Type" value={type} />) : null}
                </div>
            </div>
        </div>
    )
}

export default CardItem;