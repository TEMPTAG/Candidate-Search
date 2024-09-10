import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const currentPage = useLocation().pathname;

  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <h3>
            <Link
              to="/"
              className={currentPage === "/" ? "nav-link active" : "nav-link"}
            >
              Home
            </Link>
          </h3>
        </li>
        <li className="nav-item">
          <h3>
            <Link
              to="/SavedCandidates"
              className={
                currentPage === "/SavedCandidates"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Potential Candidates
            </Link>
          </h3>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
