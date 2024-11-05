## <a name="top"></a>

# Candidate Search

## React and Typescript Project

![GitHub License](https://img.shields.io/github/license/TEMPTAG/Candidate-Search?label=License)

## Description

Candidate Search is a web application that interacts with the GitHub API to search for GitHub users. Users can view candidate details such as name, location, avatar, email, and company information. The app provides functionality to save candidates to local storage or skip them and move to the next candidate. The app also allows searching for specific GitHub users by username.

![Screenshot of Application]()

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)

---

## Features

- Fetches a list of GitHub users from the GitHub API.
- Displays detailed information for each candidate, including:
- Name
- Username
- Location
- Avatar
- Email
- Company
- Users can save candidates to a list of “Potential Candidates.”
- Users can skip candidates without saving.
- Allows searching for a specific GitHub user by username.
- Data persistence using localStorage so that saved candidates can be accessed later.

---

## Technologies Used

**The project was built using the following technologies**:

- React.js
- TypeScript
- Vite - Front-end tooling
- GitHub REST API

---

## Installation

#### Before running this project, ensure you have the following installed:

- Node.js (v14 or higher)
- Git

1. **Clone the `Candidate-Search` repository**:

   ```bash
   Using HTTPS:
   git clone https://github.com/TEMPTAG/Candidate-Search.git

   Using SSH:
   git clone git@github.com:TEMPTAG/Candidate-Search.git

   Using GitHub CLI:
   gh repo clone TEMPTAG/Candidate-Search
   ```

2. **Navigate into the `Candidate-Search` directory you just cloned down**:

   ```bash
   cd Candidate-Search
   ```

3. **Install the npm dependencies**:

   ```bash
   npm install
   ```

#### GitHub Personal Access Token

This app requires a GitHub Personal Access Token to interact with the GitHub API. To set this up:

1. Create a [GitHub Personal Access Token](https://github.com/settings/tokens).
2. Copy the token.
3. Create a .env file in the project’s root directory and add the token:
   ```bash
    VITE_GITHUB_TOKEN=your_token_here
   ```

#### Start the Development Server

```bash
npm run dev
```

The application will run at http://localhost:5173

---

## Usage

#### Main Features:

- **View Candidates**: The app automatically fetches and displays a list of GitHub users. You can click + to save a candidate or - to skip to the next one.
- **Search by Username**: Enter a GitHub username to search for a specific user and view their profile details.
- **Saved Candidates**: The list of saved candidates is stored in localStorage, so it will persist even after reloading the page.

#### Saving Candidates

Click the '+' button on a candidate’s profile to save them to the “Potential Candidates” list. The saved candidates can be accessed later by retrieving them from localStorage.

#### Skipping Candidates

Click the '-' button on a candidate’s profile to skip them without saving.

#### Search for Specific Candidates

You can search for a specific candidate by entering their GitHub username into the search bar and clicking “Search.”

---

## Contributing

![GitHub contributors](https://img.shields.io/github/contributors/TEMPTAG/Candidate-Search?color=green) ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/TEMPTAG/Candidate-Search)

OH. MY. GOODNESS. Collaborations are amazing. Share ideas, code, etc. with others is the best way to share knowledge, mutual enthusiasms, and a lot of times we make cool friends along the way. I welcome contributions in many ways, shapes, and forms:

- [Email Me](mailto:iansterlingferguson@gmail.com) and just plain tell me what you like, do not like, would like to see changed... just give me a compliment before laying it on me
- FORK IT ALL - create a fork, clone it down, mess it up, do the neato commits and comments, push it back, test it at least a million times, then submit a pull request for me to review and merge into the project if I think you are cool (and the code is cool too) - but again, the nice thing to do would be emailing me first and telling me your intentions... and don't forget the compliment part

Something, something... Have your people call my people. And by call, I mean email - who answers the phone these days?

---

## Questions

Have questions about this project? Want to collaborate? Eager to discuss conspiracy theories or debate why your favorite car is not as cool as you think? [Email Me](mailto:iansterlingferguson@gmail.com) — just do not call, because I probably will not answer.

Did this project make your life better in any way, shape, or form? Check out my other exceptionally rare moments of lucidity on my [GitHub Profile](https://github.com/TEMPTAG)

---

## License

This project is covered under the MIT License. The details of the MIT License can be found on their site [HERE](https://opensource.org/licenses/MIT). You can also see the full details of the [LICENSE](./LICENSE) for this specific project in the linked file.

<div align="center">
<em>Copyright © 2024 Ian Ferguson - powered by caffine, love, and a little bit of fun</em>

[Back to top](#top)
