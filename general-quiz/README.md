# General Quiz

General Quiz is a web application built with React where users can test their general knowledge by answering multiple-choice questions on different topics.

Users can choose the difficulty level and how many questions they want to answer. At the end of the quiz, they can see their score and check their previous attempts.

This is my final project for the Web Development course.

Author: Andrew Okeke

Live demo: https://andrewchiemerieokeke-pixel.github.io/general-quiz/ 

## Features

- Home page where users can choose the difficulty and number of questions.
- Quiz page that gets questions from an external API and displays them one at a time.
- Answer options are shuffled for each question.
- Immediate feedback after selecting an answer.
- Progress bar and score tracking during the quiz.
- Results page showing the latest score and previous quiz attempts.
- Quiz history is saved in the browser using localStorage.
- Loading messages and error handling, including API rate-limit messages.
- Responsive design for both mobile phones and desktop screens.

## Technologies Used

- [React](https://react.dev/) – for building the user interface.
- [Vite](https://vite.dev/) – for setting up and running the project.
- [React Router](https://reactrouter.com/) – for moving between the different pages.
- [React-Bootstrap](https://react-bootstrap.github.io/) and [Bootstrap](https://getbootstrap.com/) – for the layout and styling.
- [he](https://github.com/mathiasbynens/he) – for decoding HTML entities in the questions received from the API.
- [Open Trivia DB](https://opentdb.com/) – for getting the quiz questions.

## Getting Started

### Requirements

To run this project, you need:

- [Node.js](https://nodejs.org/) (version 18 or newer).
- npm (included with Node.js).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/andrewchiemerieokeke-pixel/general-quiz.git
   ```

2. Open the project folder:

   ```bash
   cd general-quiz
   ```

3. Install the required packages:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local address shown in your terminal. It is usually:

   `http://localhost:5173`

## Project Structure

```text
src/
├── components/
│   └── AppNavbar.jsx    Navigation bar
├── pages/
│   ├── Home.jsx         Quiz settings
│   ├── Quiz.jsx         Quiz questions and functionality
│   └── Results.jsx      Results and quiz history
├── App.jsx              Application routes
└── main.jsx             Application entry point
```

## API

The questions used in this application come from [Open Trivia DB](https://opentdb.com/api_config.php).

The app uses `fetch` and `async/await` to request questions from the API. Open Trivia DB has a limit of one request every five seconds per IP address. If a user starts quizzes too quickly, the API may temporarily reject a request, and the app displays a message asking them to wait before trying again.