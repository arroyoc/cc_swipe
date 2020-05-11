# Credit Card Swiper Bot

Used to test credit card swipes

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

node js
npm
johnny-five javascript framework

### Flashing arduino
https://github.com/soundanalogous/AdvancedFirmata Follow directions here to flash your arduino

### Installing

Install node js (I installed 8.12.0) from https://nodejs.org/en/

Clone this repo

Open repo in a terminal window and do:
```
npm install
```

Start server with `node index.js`

Or to start server as a service use forever (https://github.com/foreversd/forever)
forever start index.js

To swipe a card hit localhost:3000/validswipe
