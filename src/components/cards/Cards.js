import "./cards.css";
import CardItem from "./CardItem";

function Cards(props) {
  return (
    props.items.length > 0
      ? <>
        <h3>Cards</h3>
        <div className="row row row-cols-1 row-cols-md-5">
          {props.items.map(item => <CardItem key={item.id} items={item} />)}
        </div>
      </>
      : <h3>Loading cards....</h3>
  );
}

export default Cards;
