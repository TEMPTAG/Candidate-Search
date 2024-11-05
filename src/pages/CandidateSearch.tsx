import { useState, useEffect, FormEvent } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import CandidateCard from "../components/CandidateCard";
import type Candidate from "../interfaces/Candidate.interface";
import loadingGif from "../assets/images/loading.gif";

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

  // State to hold the index of the current candidate being viewed
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to handle the user's search input for GitHub usernames
  const [searchInput, setSearchInput] = useState<string>("");

  // State for displaying any errors during data fetching
  const [error, setError] = useState<string | null>(null);

  // State to track whether there are no more candidates available to review
  const [noMoreCandidates, setNoMoreCandidates] = useState<boolean>(false);

  // State to manage loading state when fetching data
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch candidates from GitHub API when the component mounts
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true); // Start loading state

        // Fetch initial batch of candidate usernames
        const data = await searchGithub();

        const fetchedCandidates: Candidate[] = [];
        for (const user of data) {
          // For each candidate, fetch detailed user information
          const currentUser = await searchGithubUser(user.login);

          // Skip users with incomplete or missing data
          if (Object.keys(currentUser).length === 0) continue;

          // Push valid candidate data to the array
          fetchedCandidates.push({
            name: currentUser.name || "No name available",
            login: currentUser.login,
            location: currentUser.location || "No location available",
            avatar_url: currentUser.avatar_url || "No avatar available",
            email: currentUser.email || "No email available",
            html_url: currentUser.html_url || "No address available",
            company: currentUser.company || "No company available",
            bio: currentUser.bio || "No bio available",
          });
        }

        // Update state with fetched candidates
        setCandidates(fetchedCandidates);

        // Set the first candidate as the current candidate if available
        if (fetchedCandidates.length > 0) {
          setCurrentCandidate(fetchedCandidates[0]);
        }
        setError(null); // Clear any previous error when successful
        setLoading(false); // End loading state
      } catch (error) {
        setLoading(false); // End loading state
        setError("Error fetching candidates"); // Set error message when an error occurs
      }
    };

    // Call the fetch function when component mounts
    fetchCandidates();
  }, []);

  // Handle user search input and fetch specific GitHub user data
  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const userData = await searchGithubUser(searchInput);

      // If no user is found, display error and clear current candidate
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
        // If user is found, map user data to the Candidate interface
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

        setCurrentCandidate(fetchedCandidate); // Update current candidate
        setError(null); // Clear any previous error
      }
      setSearchInput(""); // Clear search input after search
    } catch (err) {
      setError("An error occurred while fetching user data"); // Set error message when an error occurs
    }
  };

  // Save the current candidate and move to the next one
  const saveCandidate = () => {
    // If no candidate or no more candidates, do nothing
    if (!currentCandidate || noMoreCandidates) return;

    let storedCandidates: Candidate[] = [];
    const saved = localStorage.getItem("potentialCandidates");
    if (saved) {
      storedCandidates = JSON.parse(saved);
    }

    // Add the current candidate to local storage
    storedCandidates.push(currentCandidate);

    // Add the current candidate to the list
    localStorage.setItem(
      "potentialCandidates",
      JSON.stringify(storedCandidates)
    );

    // Move to the next candidate
    moveToNext();
  };

  // Skip the current candidate and move to the next one
  const moveToNext = () => {
    // If no more candidates, do nothing
    if (noMoreCandidates || candidates.length === 0) return;

    // Move to the next candidate in the list
    if (currentIndex + 1 < candidates.length) {
      // Update current index and current candidate
      setCurrentIndex(currentIndex + 1);
      setCurrentCandidate(candidates[currentIndex + 1]);
    } else {
      // If no more candidates available, set flag and clear current candidate
      setNoMoreCandidates(true);
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2.5rem",
            textAlign: "center",
          }}
        >
          <p>
            {noMoreCandidates ? (
              "No more candidates available."
            ) : loading ? (
              <img
                src={loadingGif}
                alt="Loading Gif"
                style={{ width: "50px", height: "50px" }}
              />
            ) : (
              "No candidate information to display"
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
