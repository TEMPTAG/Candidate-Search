import { useEffect, useState } from "react";
import type Candidate from "../interfaces/Candidate.interface";
import { BsDashCircleFill } from "react-icons/bs";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Retrieve saved candidates from local storage on component load
  useEffect(() => {
    const storedCandidates = localStorage.getItem("potentialCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates) as Candidate[]);
    }
  }, []);

  // Remove a candidate from the saved list
  const removeCandidate = (username: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== username
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem(
      "potentialCandidates",
      JSON.stringify(updatedCandidates)
    );
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td style={{ textAlign: "center" }}>
                  <img
                    src={candidate.avatar_url}
                    alt={`${candidate.login}`}
                    style={{
                      height: "75px",
                      margin: "10px",
                      borderRadius: "10%",
                    }}
                  />
                </td>
                <td>
                  <strong>
                    {candidate.name} <i>({candidate.login})</i>
                  </strong>
                </td>
                <td>{candidate.location || "No Location provided"} </td>
                <td>
                  {candidate.email ? (
                    <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  ) : (
                    "No Email Provided"
                  )}
                </td>
                <td>{candidate.company || "N/A"}</td>
                <td>{candidate.bio || "No Bio available"}</td>
                <td style={{ textAlign: "center" }}>
                  <div
                    onClick={() => removeCandidate(candidate.login)}
                    aria-label="Skip Candidate"
                    style={{ cursor: "pointer" }}
                  >
                    <BsDashCircleFill size={36} color="red" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates have been saved.</p>
      )}
    </>
  );
};

export default SavedCandidates;
