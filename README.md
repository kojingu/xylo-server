# xylo-server

Welcome to the server side of the Xylo game.

Xylo is a multiplayer mobile game featuring a digital Xylophone (percusion musical instrument).

## Game rules

In each round of the game a player is randomly chosen to be a producer and the rest of the players will be guessers.
The producer has to create a melody in their digital xylophone.
The melody is sent to all the guessers in audio format so they can guess the right permutation of notes for that specific melody.
Each guesser tries to guess the melody by tapping the notes in their xylophone.
When a guesser guesses the melody whins the round, if no guesser guesses the melody in 60 seconds the current producer wins the round.
When the round is finished, a new producer is randomly chosen.
The game lasts the number of rounds chosen at the creation of the game.
The player who wins more rounds wins the game.


## Project main features

### Digital Xylophone
  Each player will have a digital xylophone to either produce or guess a melody.

### Room creation and Joining
  For each game a new web socket room is created.
  Players who wish to be in that game will join that room.
  
### Rounds
  Each game has a number of rounds chosen by the creator of that game.

### Producer and Guessers
  In each round of the game a new producer is randomly chosen and the rest of the players are assigned to the roles of guessers.
  
 
## Installation

Make sure you have Node.Js installed

Clone project

```bash
git clone https://github.com/kojingu/xylo-server.git
```

Configure env variables in env file

```bash
PORT=3000
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
```

Install all npm dependencies required

```bash
npm install
```

Start docker mongoDB container

```bash
docker compose up -d db
```

run the application
```bash
npm run dev
```

## Stack

Server side
- Node.js
- Express.js
- Web sockets: socket.io
- NOSQL database: MongoDB
- Docker
- ORM: Mongoose
 



