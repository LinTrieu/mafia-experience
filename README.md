﻿# The Mafia Experience: Game

The idea behind this project was to remove the need of a narrator while playing this game so that everyone can join in. 

Hosted on Heroku currently - scan the QR code or visit: https://mafiaexperience.herokuapp.com/ 
![rsz_qr-code](https://user-images.githubusercontent.com/36490540/61822076-acba0680-ae50-11e9-8fbf-5d3374a8b154.png)

## Technology Stack

* C# 
* ASP.NET
* JavaScript (incl. jQuery)
* Entity Framework
* PostgreSQL
* SignalR 
* HTML& CSS (incl. Bootstrap)

## Project workflow

Please refer to the project [Wiki](https://github.com/LinTrieu/mafia-experience/wiki/Workflow-and-ways-of-working) for details on our production process, ways of working and code of conduct.

## Roadmap: further development (since demo day at 19/07/2019)

- [x] Add 'Mafia Victim Reveal' result page for all users (i.e. non-victims)
- [ ] Display a list of the game's winning players on final Mafia Win screen (i.e. names of who is in villager/mafia group)  
- [ ] Add Voting functionality for villagers voting process 
- [ ] Add a countdown to the villagers voting process 

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


## Contributers

* Lin Trieu
* Taj Islam
* Megan Goode
* Lauren O'Mara
* Ed Reeve
* Kelvin Samuel
