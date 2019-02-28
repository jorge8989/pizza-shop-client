# Pizza Shop Client
## Prerequisites

Make sure you have ruby 2.2.3 installed

## Setup

Run the following command to setup the project:

```
bundle install
```

## Run the local server

Start the server with:
```
bundle exec rails s
```

## Architecture

This app is meant to be used as a REST client, it uses HTTP requests to communicate
with a RESTful API. Every generated Rails app is
structured with the MVC (Model-View-Controller) design pattern. However,
this app doesn't have a database or models. So the pattern for
this particular app would be a VC (Controller-View).
