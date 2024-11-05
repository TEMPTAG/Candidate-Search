import { useEffect, useState } from "react";
import type Candidate from "../interfaces/Candidate.interface";
import { BsDashCircleFill } from "react-icons/bs";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  // Retrieve saved candidates from local storage on component load
  useEffect(() => {
    const storedCandidates = localStorage.getItem("potentialCandidates");
    if (storedCandidates) {
      const parsedCandidates = JSON.parse(storedCandidates) as Candidate[];
      setSavedCandidates(parsedCandidates);
      setFilteredCandidates(parsedCandidates); // Initialize filteredCandidates as well
    }
  }, []);

  // Filter candidates based on name or location
  useEffect(() => {
    const filtered = savedCandidates.filter(
      (candidate) =>
        candidate.name?.toLowerCase().includes(filter.toLowerCase()) ||
        candidate.location?.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCandidates(filtered);
  }, [filter, savedCandidates]);

  // Sort candidates based on the selected criteria (e.g., name or location)
  useEffect(() => {
    const sorted = [...filteredCandidates].sort((a, b) => {
      const fieldA = a[sortCriteria as keyof Candidate] ?? "";
      const fieldB = b[sortCriteria as keyof Candidate] ?? "";

      if (sortOrder === "asc") {
        return fieldA.toString().localeCompare(fieldB.toString());
      } else {
        return fieldB.toString().localeCompare(fieldA.toString());
      }
    });
    setFilteredCandidates(sorted);
  }, [sortCriteria, sortOrder]);

  // Remove a candidate from the saved list
  const removeCandidate = (username: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== username
    );
    setSavedCandidates(updatedCandidates);
    setFilteredCandidates(updatedCandidates);
    localStorage.setItem(
      "potentialCandidates",
      JSON.stringify(updatedCandidates)
    );
  };

  return (
    <>
      <h1>Potential Candidates</h1>

      {/* Filter Input */}
      <input
        type="text"
        placeholder="Filter by name or location"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      {/* Sort Dropdown */}
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="location">Location</option>
          <option value="company">Company</option>
        </select>

        {/* Sort Order */}
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          style={{ marginLeft: "10px" }}
        >
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      {filteredCandidates.length > 0 ? (
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
            {filteredCandidates.map((candidate) => (
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
