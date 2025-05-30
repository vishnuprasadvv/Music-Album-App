# Music-Album-App

This is a React application that displays a collection of music albums and their details. The application is built using React and includes a mock API server to serve the data.

## Features

- Landing page with a table of music albums
- Album details page
- Type filters for filtering albums by type (EP, Album, Single)
- Responsive design
- Mock API using JSON Server

## Tech Stack

Frontend: React, TypeScript
State Management: useState, useEffect
Routing: React Router
Icons: react-icons
API Calls: Axios
Mock API : JSON Server


### Installation

1. Clone the repository
```bash
git clone https://github.com/vishnuprasadvv/Music-Album-App.git
cd Music-Album-App
```

2. Install dependencies:
```bash
npm install
```

3. Start the JSON Server
```bash 
json-server --watch db.json --port 5000
```

4. Start the React app
```bash 
cd Music-Album-App/client
npm run dev
```