# The Mafia Experience: Game

The idea behind this project was to remove the need of a narrator while playing this game so that everyone can join in. 

Hosted on Heroku currently - scan the QR code or visit: https://mafiaexperience.herokuapp.com/ 
![rsz_qr-code](https://user-images.githubusercontent.com/36490540/61822076-acba0680-ae50-11e9-8fbf-5d3374a8b154.png)

## Purpose
The Mafia Experience game was developed as part of Makers Academy bootcamp, in weeks 11 and 12, for Group Engineering Project 2 (EP2). See 'Contributers' below for the names of the team members. The Game was presented at the April-2019 cohort demo day on 19/07/2019 - see the following to watch the [demo presentation](https://m.facebook.com/story.php?story_fbid=356901535225807&id=367457470014643).

## Technology Stack

* C# 
* ASP.NET
* JavaScript (incl. jQuery)
* Entity Framework (ORM)
* PostgreSQL database
* SignalR 
* HTML& CSS (incl. Bootstrap)

## Roadmap: further development (since demo day)

- [x] Add 'Mafia Victim Reveal' result page for all users (i.e. non-victims)
- [x] Truncate Users table in Database everytime a user clicks 'Start new game' button to ensure every unique game is unique  
- [x] Display a list of the game's winning players on the final Mafia results screen (i.e. a reveal of the mafia and villager names once the game is complete)  
- [ ] Implement Villager Voting functionality (i.e. 'Vote who you think is in the Mafia?') 
- [ ] Implement a countdown timer for the villager voting process (i.e. after a set amount of time the voting ends)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Installing

A step by step series of examples that tell you how to get a development environment running

Database set-up

```
dotnet ef migrations add initial
```
```
dotnet ef database update
```

## Project workflow

Please refer to the project [Wiki](https://github.com/LinTrieu/mafia-experience/wiki/Project-Workflow) for details on our production process, ways of working and code of conduct.

## Contributers

* Lin Trieu
* Taj Islam
* Megan Goode
* Lauren O'Mara
* Ed Reeve
* Kelvin Samuel
