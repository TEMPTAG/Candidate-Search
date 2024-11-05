import type Candidate from "../interfaces/Candidate.interface";
import { BsDashCircleFill, BsPlusCircleFill } from "react-icons/bs";
import "./CandidateCard.css";

interface CandidateCardProps {
  candidate: Candidate;
  addToPotentialList: () => void;
  skipCandidate: () => void;
}

const CandidateCard = ({
  candidate,
  addToPotentialList,
  skipCandidate,
}: CandidateCardProps) => {
  return (
    <div className="card-container">
      <img
        className="card-img"
        src={candidate.avatar_url || "https://via.placeholder.com/150"}
        alt={`${candidate.login || "avatar"}`}
      />

      <div className="card-body">
        <h4 className="card-title">
          <strong>
            {candidate.name} <i>({candidate.login})</i>
          </strong>
        </h4>

        <div className="card-text">
          <p>Location: {candidate.location || "No Location Provided"}</p>
          <p>
            Email:{" "}
            {candidate.email ? (
              <a
                href={`mailto:${candidate.email}`}
                style={{ color: "#646cff" }}
              >
                {candidate.email}
              </a>
            ) : (
              "No Email Provided"
            )}
          </p>
          <p>Company: {candidate.company || "No Company provided"}</p>
          <p>Bio: {candidate.bio || "No Bio provided"}</p>
        </div>
      </div>

      <div className="card-buttons">
        <div
          className="icon-button"
          onClick={skipCandidate}
          aria-label="Skip Candidate"
        >
          <BsDashCircleFill size={56} color="red" />
        </div>

        <div
          className="icon-button"
          onClick={addToPotentialList}
          aria-label="Add Candidate"
        >
          <BsPlusCircleFill size={56} color="green" />
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
