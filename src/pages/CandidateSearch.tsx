import { useState, useEffect, FormEvent } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import CandidateCard from "../components/CandidateCard";
import type Candidate from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  // State to hold the current candidate's details
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    name: "",
    login: "",
    location: "",
    avatar_url: "",
    email: "",
    html_url: "",
    company: "",
    bio: "",
  });

  // State to hold the list of candidates
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  // State to hold the index of the current candidate
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to handle the search input
  const [searchInput, setSearchInput] = useState<string>("");

  // State for errors
  const [error, setError] = useState<string | null>(null);

  // State for no more candidates message
  const [noMoreCandidates, setNoMoreCandidates] = useState<boolean>(false);

  // Fetch candidates from GitHub API on component mount
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        const fetchedCandidates: Candidate[] = data.map((user: any) => ({
          name: user.name || "No name available",
          login: user.login,
          location: user.location || "No location available",
          avatar_url: user.avatar_url || "No avatar available",
          email: user.email || "No email available",
          html_url: user.html_url || "No address available",
          company: user.company || "No company available",
          bio: user.bio || "No bio available",
        }));
        setCandidates(fetchedCandidates);

        if (fetchedCandidates.length > 0) {
          setCurrentCandidate(fetchedCandidates[0]);
        }
        setError(null); // Clear any previous error when successful
      } catch (error) {
        setError("Error fetching candidates");
      }
    };

    fetchCandidates();
  }, []);

  // Handle user search input
  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const userData = await searchGithubUser(searchInput);

      if (Object.keys(userData).length === 0) {
        setError("User not found");
        setCurrentCandidate({
          name: "",
          login: "",
          location: "",
          avatar_url: "",
          email: "",
          html_url: "",
          company: "",
          bio: "",
        });
      } else {
        const fetchedCandidate: Candidate = {
          name: userData.name || "No name available",
          login: userData.login,
          location: userData.location || "No location available",
          avatar_url: userData.avatar_url || "No avatar available",
          email: userData.email || "No email available",
          html_url: userData.html_url || "No address available",
          company: userData.company || "No company available",
          bio: userData.bio || "No bio available",
        };
        setCurrentCandidate(fetchedCandidate);
        setError(null);
      }
      setSearchInput(""); // Clear search input after search
    } catch (err) {
      setError("An error occurred while fetching user data");
    }
  };

  // Save the current candidate and move to the next one
  const saveCandidate = () => {
    if (!currentCandidate || noMoreCandidates) return;

    let storedCandidates: Candidate[] = [];
    const saved = localStorage.getItem("candidates");
    if (saved) {
      storedCandidates = JSON.parse(saved);
    }

    // Add the current candidate to local storage
    storedCandidates.push(currentCandidate);
    localStorage.setItem("candidates", JSON.stringify(storedCandidates));

    // Move to the next candidate
    moveToNext();
  };

  // Skip the current candidate and move to the next one
  const moveToNext = () => {
    if (noMoreCandidates || candidates.length === 0) return;

    if (currentIndex + 1 < candidates.length) {
      setCurrentIndex(currentIndex + 1);
      setCurrentCandidate(candidates[currentIndex + 1]);
    } else {
      setNoMoreCandidates(true); // Set the flag when no more candidates are left
      setCurrentCandidate({
        name: "",
        login: "",
        location: "",
        avatar_url: "",
        email: "",
        html_url: "",
        company: "",
        bio: "",
      });
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Candidate Search</h1>

      <form onSubmit={handleSearch} className="form-container">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter GitHub Username"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {/* Render Candidate Card if a candidate is found */}
      {currentCandidate?.login ? (
        <CandidateCard
          candidate={currentCandidate}
          addToPotentialList={saveCandidate}
          skipCandidate={moveToNext}
        />
      ) : (
        <p>
          {noMoreCandidates
            ? "No more candidates available."
            : "No candidate information to display"}
        </p>
      )}
    </div>
  );
};

export default CandidateSearch;
