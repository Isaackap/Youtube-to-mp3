# YouTube to MP3 Converter (Local Web App)

This is a full-stack YouTube to MP3 converter built with **Node.js**, **Express**, and **vanilla JavaScript**. The application allows users to input a YouTube video URL and download the highest quality audio as an `.mp3` file.

>  This project is intended for **educational purposes only** and runs **locally**. It is not hosted or deployed publicly.

---

##  Features

- Convert YouTube videos to MP3 via a simple frontend
- Save the converted file to a temporary directory
- Auto-delete converted files after 5 minutes to save storage
- Download audio directly through the browser
- Error handling for invalid URLs
- Dockerized for consistent development environment

---

##  How It Works

### Client (Frontend)

- Plain HTML/CSS/JS
- User inputs a YouTube URL
- Sends a `POST` request to the server for conversion
- Displays download link once the file is ready
- Option to return to the homepage or trigger a download

### Server (Backend)

- Validates the YouTube URL using `ytdl-core`
- Retrieves video metadata for naming
- Streams the audio to a temp folder (`temp/converted_files`)
- Responds with file info and download endpoint
- Automatically deletes the file after 5 minutes via `setTimeout`
- Serves static files and handles CORS

---

##  Running with Docker (More detailed instructions located in the `README.Docker.md` file)

1. Clone this repo:
   ```bash
   git clone https://github.com/Isaackap/Youtube-to-mp3.git
   cd youtube-to-mp3
2. Build and run the container:
   ```bash
   docker compose up --build
3. Open your browser, the application will be available at:
   `http://localhost:3000`

---

## Dependencies

- express
- cors
- @distube/ytdl-core
- fs (built-in)
- path (built-in)
- joi (currently imported but unused)


---

## Project Structure

├── public/               # Static assets (frontend JavaScript ,CSS, frontend HTML)
│   └── index.html
├── temp/                 # Temporary directory for converted files
│   └── converted_files/
├── server.js             # Express server
├── Dockerfile
├── docker-compose.yml
├── README.Docker.md
└── README.md
