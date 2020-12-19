export default function CardSection(props) {
    return (
        <>
            <span className="text-gray">{props.title}:</span>
            <p className="card-text">{props.value}</p>
        </>
    )
}