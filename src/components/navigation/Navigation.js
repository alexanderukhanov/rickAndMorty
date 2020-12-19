import { Link } from "react-router-dom";

export default function Navigation(props) {
    return (
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${props.isHiddenWelcomeBanner ? "shift_main_content" : null}`}>
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Rick and Morty
                </Link>
                <form className="form-inline my-2 my-lg-0">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/locations">
                                Locations
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/episodes">
                                Episodes
                            </Link>
                        </li>
                    </ul>
                </form>
            </div>
        </nav>
    )
}