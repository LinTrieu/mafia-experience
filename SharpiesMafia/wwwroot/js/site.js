﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/mafiaHub").build();

connection.on("LoadNight", function ()
{
    var targetDiv = $('#mafiaGame');
    targetDiv.load("/Home/LoadNightScreen");
});

connection.on("MafiaPage", function ()
{
    var targetDiv = $('#mafiaGame');
    targetDiv.load("/Home/MafiaScreen");
});

connection.on("VillagerPage", function ()
{
    var targetDiv = $('#mafiaGame');
    targetDiv.load("/Home/VillagerScreen");
});


connection.on("LoadMafiaNight", function ()
{
    setTimeout(function () {
        var targetDiv = $('#mafiaGame');
        targetDiv.load("/Home/LoadMafiaNightScreen", function () {
        });
    }, 10000);
});


function killPerson(user, role){
    connection.invoke("KillPlayer", user,role).catch(function (err) {
        return console.error(err.toString());
    });
}

connection.on("NightPage", function ()
{
    setTimeout(function () {
        GetNextPage("/Home/LoadNightScreen");
        connection.invoke("ListUsersToKill");
    }, 10000);
});

connection.on("LoadDayPage", function ()
{
    setTimeout(function () {
        GetNextPage("/Home/LoadDayScreen");
    }, 10000);
});

connection.on("UsersToKillPage", function () {
      setTimeout(function () {
        GetNextPage("/Home/UsersToKill");
    }, 15000);
});

connection.on("StartPageUserList", function (users, gameId) {     var targetDiv = $('#mafiaGame');
    targetDiv.load("/Home/StartGameScreen", function (responseTxt, statusTxt, xhr)
    {

        if (statusTxt == "success") {

            var gameIdSplit = gameId.toString().split("");
            var joinCodeFormatting = "";
            joinCodeFormatting += '<div class="codeDigit">' + gameIdSplit[0] + '</div>';
            joinCodeFormatting += '<div class="codeDigit">' + gameIdSplit[1] + '</div>';
            joinCodeFormatting += '<div class="codeDigit">' + gameIdSplit[2] + '</div>';
            joinCodeFormatting += '<div class="codeDigit">' + gameIdSplit[3] + '</div>';

            $("#gameId #gameIdContainer").append(joinCodeFormatting);
            users.forEach(function (element) {
                var li = document.createElement("li");
                li.setAttribute('class', 'list-group-item');
               li.textContent = element.name;
               document.getElementById("userList").appendChild(li)
            });
            document.getElementById("beginGameBtn").addEventListener("click", function (event) {
                connection.invoke("BeginGame").catch(function (err) {
                    return console.error(err.toString());
                });
                event.preventDefault();
            });
        }
        if (statusTxt === "error") {
            alert("Error: " + xhr.status + ": " + xhr.statusText);
        }
    });
});

connection.on("LoadVoteResult", function (name, role, rolesCount)
{
    var targetDiv = $('#mafiaGame');
    targetDiv.load("/Home/LoadVoteResultScreen", function ()
    {
        if (role === "mafia") {
            document.getElementById("resultDisplay").classList.add("text-success");
        } else {
            document.getElementById("resultDisplay").classList.add("text-danger");
        }
        document.getElementById("deadUser").innerHTML = capitalize(name);
        document.getElementById("userRole").innerHTML = capitalize(role);
        document.getElementById("mafiaCount").innerHTML = rolesCount[0];
        document.getElementById("villagerCount").innerHTML = rolesCount[1];
    });
    if (rolesCount[0] >= rolesCount[1]) {
        connection.invoke("WinnerPage", "villager");
    }
    else if (rolesCount[0] == 0) {
        connection.invoke("WinnerPage", "mafia");
    }
    else {
        connection.invoke("LoopGame");
    }
});

connection.on("JoinPageUserList", function (users, gameId)
{
    var targetDiv = $('#mafiaGame');
    targetDiv.load("/Home/JoinGameScreen", function ()
    {
        var gameIdSplit = gameId.toString().split("");
            var joinCodeFormatting = "";
            joinCodeFormatting += '<div class="codeDigit">' + gameIdSplit[0] + '</div>';
            joinCodeFormatting += '<div class="codeDigit">' + gameIdSplit[1] + '</div>';
            joinCodeFormatting += '<div class="codeDigit">' + gameIdSplit[2] + '</div>';
            joinCodeFormatting += '<div class="codeDigit">' + gameIdSplit[3] + '</div>';

        $("#joinGameId #joinGameIdContainer").append(joinCodeFormatting);

        users.forEach(function (element) {
            var li = document.createElement("li");
            li.setAttribute('class', 'list-group-item');
            li.textContent = element.name;
            document.getElementById("joinUserList").appendChild(li)
        });
    });
});

connection.on("ResultsScreen", function (winningRole, gameOwner) {
    var targetDiv = $('#mafiaGame');

    if (winningRole == "villager") {
        targetDiv.load("/Home/VillagerWinScreen", function () {
            if (gameOwner) {
                $('#restartGameBtnDiv').html('<button id="restartGameBtn" class="btn btn-outline-success">Restart Game</button>');
            }
        });
    }
    else {
        targetDiv.load("/Home/MafiaWinScreen", function ()
        {
            if (gameOwner) {
                $('#restartGameBtnDiv').html('<button id="restartGameBtn" class="btn btn-outline-success">Restart Game</button>');
            }
        });
    }

    if (gameOwner) {
        $('#resetGameBtn').on("click", function (event) {
            connection.invoke("ResetGame").catch(function (error) {
                return console.error(error.toString());
            });

            event.preventDefault();
        });
    }
});

connection.start().then(function(){
    document.getElementById("newGameStartBtn").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

$('#joinGameBtn').on("click", function () {
    connection.invoke("AddUserToGroup", "gameMember").catch(function (error)
    {
        return console.error(error.toString());
    });
    var user = $('#nameInputJoin').val();
    var gameId = $('#codeInputJoin').val();
    connection.invoke("JoinGame", user, gameId).catch(function (err) {
        return alert("User already exists");
    });
    event.preventDefault();
});

connection.on("LoadUsersToKill", function (users)
{
  setTimeout(function () {
    var targetDiv = $('#mafiaGame');
    targetDiv.load("/Home/UsersToKillMafia", function ()
    {
        createButtons(users, "mafia");
    });
  }, 10000);
});

connection.on("EveryoneKillChoice", function (users)
{
    setTimeout(function () {
        var targetDiv = $('#mafiaGame');

        
        targetDiv.load("/Home/UsersToKill", function (responseTxt, statusTxt, xhr)
        {
            createButtons(users, "villager");
        });

    }, 22000);

});


function createButtons(users, role) {
    users.forEach(function (user) {
        var br = document.createElement("br");
        var button = document.createElement("BUTTON");
        var t = document.createTextNode(user.name);
        button.appendChild(t);
        button.classList.add("btn");
        button.classList.add("btn-outline-danger");
        var buttons = document.getElementsByClassName("btn");
        button.onclick = function () {
            killPerson(user.name, role);
        }
        document.getElementById("userList").appendChild(button);
        document.getElementById("userList").appendChild(br);
    });
}

function voteToKill(user, buttons) {
    connection.invoke("voteToKill", user).catch(function (err) {
        return console.error(err.toString());
    });
   
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function GetNextPage(HomeControllerMethod) {
    var targetDiv = $('#mafiaGame');    
    targetDiv.load(HomeControllerMethod, function () {
    });
}

document.getElementById("newGameStartBtn").addEventListener("click", function (event) {
    connection.invoke("AddUserToGroup", "gameOwner").catch(function (error)
    {
        return console.error(error.toString());
    });
    var user = document.getElementById("nameInputStart").value;
    connection.invoke("StartGame", user).catch(function (err) {
        return alert("User already exists");
    });
    event.preventDefault();
});

connection.on("YouDiedPageDelayed", function () {
    setTimeout(function () {
        GetNextPage("/Home/YouDiedScreen");
    }, 17000);
});

connection.on("YouDiedPageInstant", function () {
    GetNextPage("/Home/YouDiedScreen");
});

connection.on("VillagerWin", function (users) {
    setTimeout(function () {
        var targetDiv = $('#mafiaGame');
        targetDiv.load("/Home/VillagerWinScreen", function (responseTxt, statusTxt, xhr)
        {
            if (statusTxt == "success") {
                users.forEach(function (user) {
                    var li = document.createElement("li");
                    li.setAttribute('class', 'list-group-item');
                    li.textContent = user.name;
                        if (user.role == "mafia") {
                            document.getElementById("MafiaListV").appendChild(li)
                        }
                        else {
                            document.getElementById("VillagerListV").appendChild(li)
                        }
                });
            }
        if (statusTxt === "error") {
            alert("Error: " + xhr.status + ": " + xhr.statusText);
        }
    });
    }, 7000);
});

connection.on("MafiaWin", function (users) {
   setTimeout(function () {
    var targetDiv = $('#mafiaGame');
    targetDiv.load("/Home/MafiaWinScreen", function (responseTxt, statusTxt, xhr)
    {
        if (statusTxt == "success") {
            users.forEach(function (user) {
                var li = document.createElement("li");
                li.setAttribute('class', 'list-group-item');
                li.textContent = user.name;
                    if (user.role == "mafia") {
                        document.getElementById("MafiaListM").appendChild(li)
                    }
                    else {
                        document.getElementById("VillagerListM").appendChild(li)
                    }
            });
        }
        if (statusTxt === "error") {
            alert("Error: " + xhr.status + ": " + xhr.statusText);
        }
    });
    }, 7000);
});

$("#infoIcon").on("click", function () {
    $('#infoModal').modal('show');
});

function speak(message) {
    var spk = window.speechSynthesis;
    var to_speak = new SpeechSynthesisUtterance(message);
    to_speak.voice = spk.getVoices()[49];

    spk.speak(to_speak);
}

connection.on("LoadVictimResult", function (name)
{
    setTimeout(function () {    
    var targetDiv = $('#mafiaGame');
    targetDiv.load("/Home/LoadVictimResultScreen", function ()
    {
        document.getElementById("deadVictim").innerHTML = capitalize(name);
    });
        }, 17000);
});