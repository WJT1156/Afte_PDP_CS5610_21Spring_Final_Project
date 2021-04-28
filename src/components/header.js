
import Login from "./login";
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <a className="nav-brand" href="/">Home</a>

                <form className="form-inline float-right">
                    <Link to="/search" className="btn btn-light">Search</Link>
                    <Login/>
                </form>
            </nav>
        </>
    )
}

export default Header