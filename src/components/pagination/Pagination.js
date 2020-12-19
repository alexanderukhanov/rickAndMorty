import { Link } from "react-router-dom";
const TEXT_STYLE = "disabled";

export default function Pagination(props) {
  return (
    <nav aria-label="...">
      <ul onClick={props.choosePage} className="pagination justify-content-center">
        <li id="prevButton" className={`page-item ${props.isPrevButtonDisabled ? TEXT_STYLE : null}`}>
          <Link className="page-link" to="#">Previous</Link>
        </li>
        {props.pages.map((value, i) => {
          if (value === props.page) {
            return (
              <li key={i} className="page-item active">
                <Link className="page-link" to="#">
                  {value}
                </Link>
              </li>
            )
          } return (
            <li key={i} className="page-item">
              <Link className="page-link" to="#">
                {value}
              </Link>
            </li>
          )
        })}
        <li id="nextButton" className={`page-item ${props.isNextButtonDisabled ? TEXT_STYLE : null}`}>
          <Link className="page-link" to="#">Next</Link>
        </li>
      </ul>
      <p id="nuber_of_pages">{props.page} of {props.quantityOfPages}</p>
    </nav>
  )
}