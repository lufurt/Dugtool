// ==UserScript==
// @name	DugTool
// @namespace
// @version	1.8.0
// @author	Lucas Furtado
// @description	This is a useful tool for Dugout Online game
// @include	*.dugout-online.com/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require	http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @resource
// @copyright	2020
// ==/UserScript==

//Skills:
//Reflexes: row1[0].innerText.trim()
//Tackling: row1[3].innerText.trim()
//Creativity: row1[6].innerText.trim()
//Shooting: row1[9].innerText.trim()
//Teamwork: row1[12].innerText.trim()
//One on ones: row2[0].innerText.trim()
//Marking: row2[3].innerText.trim()
//Passing: row2[6].innerText.trim()
//Dribbling: row2[9].innerText.trim()
//Speed: row2[12].innerText.trim()
//Handling: row3[0].innerText.trim()
//Heading: row3[3].innerText.trim()
//Long Shots: row3[6].innerText.trim()
//Positioning: row3[9].innerText.trim()
//Strength: row3[12].innerText.trim()
//Communication: row4[0].innerText.trim()
//Crossing: row4[3].innerText.trim()
//First touch: row4[6].innerText.trim()
//Aggression: row4[9].innerText.trim()
//Influence: row4[12].innerText.trim()
//Eccentricity: row5[0].innerText.trim()

// Helper functions
var formatNumber = function(nr) {
    var result = '';
    nr = nr.toString();
    while (nr.length > 3) {
        result = '.' + nr.substring(nr.length - 3) + result;
        nr = nr.slice(0, - 3);
    }
    return nr + result;
};

// globals
var $head = $("head");
var $body = $("body");
var $leftDT = $("<div/>").attr("id", "leftDT").attr("class", "dugtool left").attr("style", "position: absolute; left: 100px; top: 250px;");
var $rightDT = $("<div/>").attr("id", "rightDT").attr("class", "dugtool right");
var heightPos = "10px";
var widthPos = "10px";
var width = "200px";
var $style = $("<style/>");
// DOM
$body.append($leftDT);
$body.append($rightDT);
$body.append($style);
// Draggable
$(".dugtool").draggable();

var playerDetails = function() {
    // this is a tr
    var $player = $(".player_name").text();
    var $nameId = $('.tabbed_pane').children('div').eq(2).children('table').children('tbody').children('tr').eq(0).children('td').eq(1).text();
    $nameId = ( !! $nameId) ? $nameId.trim() : undefined;
    $nameId = ( !! $nameId) ? $nameId.match(/^(.+)\s*-\s*\(ID\s*(\d+)\)$/) : undefined;
    // var $ageCountry = $(".dataText_profile");
    var skills = {};
    var row1 = $('#main-1').children('div').eq(0).children('table').children('tbody').children('tr').eq(1)[0].cells
    for(let i = 0; i < 15; i = i+3){
        skills[row1[i].innerText.trim()] = row1[i+1].innerText.trim()
    }
    var row2 = $('#main-1').children('div').eq(0).children('table').children('tbody').children('tr').eq(2)[0].cells
    for(let i = 0; i < 15; i = i+3){
        skills[row2[i].innerText.trim()] = row2[i+1].innerText.trim()
    }
    var row3 = $('#main-1').children('div').eq(0).children('table').children('tbody').children('tr').eq(3)[0].cells
    for(let i = 0; i < 15; i = i+3){
        skills[row3[i].innerText.trim()] = row3[i+1].innerText.trim()
    }
    var row4 = $('#main-1').children('div').eq(0).children('table').children('tbody').children('tr').eq(4)[0].cells
    for(let i = 0; i < 15; i = i+3){
        skills[row4[i].innerText.trim()] = row4[i+1].innerText.trim()
    }
    var row5 = $('#main-1').children('div').eq(0).children('table').children('tbody').children('tr').eq(5)[0].cells
    for(let i = 0; i < 3; i = i+3){
        skills[row5[i].innerText.trim()] = row5[i+1].innerText.trim()
    }
    var plDetails = {};
    plDetails.xp = $('.tabbed_pane').children('div').eq(3).children('div').children('table').children('tbody').children('tr').eq(2).children('td').eq(5).children('div').attr('title');

    var positions = {};

    positions["GK"] = parseInt(skills[row1[0].innerText.trim()]) + parseInt(skills[row2[0].innerText.trim()]) + parseInt(skills[row4[0].innerText.trim()]) + parseInt(skills[row3[0].innerText.trim()]) + parseInt(skills[row3[9].innerText.trim()])
    positions["DL/R"] = parseInt(skills[row1[3].innerText.trim()]) + parseInt(skills[row2[3].innerText.trim()]) + parseInt(skills[row4[3].innerText.trim()]) + parseInt(skills[row4[0].innerText.trim()]) + parseInt(skills[row3[9].innerText.trim()])
    positions["DC"] = parseInt(skills[row1[3].innerText.trim()]) + parseInt(skills[row2[3].innerText.trim()]) + parseInt(skills[row3[3].innerText.trim()]) + parseInt(skills[row4[0].innerText.trim()]) + parseInt(skills[row3[9].innerText.trim()])
    positions["DM"] = parseInt(skills[row2[6].innerText.trim()]) + parseInt(skills[row1[6].innerText.trim()]) + parseInt(skills[row2[3].innerText.trim()]) + parseInt(skills[row1[3].innerText.trim()]) + parseInt(skills[row3[9].innerText.trim()])
    positions["ML/R"] = parseInt(skills[row1[6].innerText.trim()]) + parseInt(skills[row2[6].innerText.trim()]) + parseInt(skills[row4[3].innerText.trim()]) + parseInt(skills[row4[6].innerText.trim()]) + parseInt(skills[row3[9].innerText.trim()])
    positions["MC"] = parseInt(skills[row1[6].innerText.trim()]) + parseInt(skills[row2[6].innerText.trim()]) + parseInt(skills[row3[6].innerText.trim()]) + parseInt(skills[row4[6].innerText.trim()]) + parseInt(skills[row3[9].innerText.trim()])
    positions["AM"] = parseInt(skills[row1[6].innerText.trim()]) + parseInt(skills[row2[6].innerText.trim()]) + parseInt(skills[row1[9].innerText.trim()]) + parseInt(skills[row3[6].innerText.trim()]) + parseInt(skills[row2[9].innerText.trim()])
    positions["FL/R"] = parseInt(skills[row1[9].innerText.trim()]) + parseInt(skills[row2[9].innerText.trim()]) + parseInt(skills[row4[3].innerText.trim()]) + parseInt(skills[row4[6].innerText.trim()]) + parseInt(skills[row3[9].innerText.trim()])
    positions["FC"] = parseInt(skills[row1[9].innerText.trim()]) + parseInt(skills[row2[9].innerText.trim()]) + parseInt(skills[row3[3].innerText.trim()]) + parseInt(skills[row4[6].innerText.trim()]) + parseInt(skills[row3[9].innerText.trim()])

    var $tableOPS = $("<table></table>").attr("id", "opsTable").addClass("dugtooltable");
    $tableOPS.append("<tr><th>Pos</th><th>OPS</th></tr>");
    var $row;
    var pos;
    for(pos in positions) {
        $row = $("<tr></tr>").addClass(i % 2 === 0 ? "even" : "odd").addClass("center");
        $row.html("<td>" + pos + "</td><td>" + positions[pos] + "</td>");
        $tableOPS.append($row);
    }
    $leftDT.append($tableOPS);
    $leftDT.append("<div class='center'>Exp : " + plDetails.xp + "</div>");
};

var playersCount = function() {
    var totalAge = 0;
    var juniors = 0;

    var gk = $('.tabbed_pane').children('div').children('div').eq(1).children('table').eq(0)[0].rows;
    for (let i = 1; i < gk.length; i++){
        let age = parseInt(gk[i].children[4].innerText.trim());
        let age2 = parseInt(gk[i].children[3].innerText.trim());
        if (isNaN(age)){
            totalAge += age2;
        } else {
            totalAge += age;
        }
        if (age < 19 || age2 < 19){
            juniors++;
        }
    }

    var df = $('.tabbed_pane').children('div').children('div').eq(1).children('table').eq(1)[0].rows;
    for (let i = 1; i < df.length; i++){
        let age = parseInt(df[i].children[4].innerText.trim());
        let age2 = parseInt(df[i].children[3].innerText.trim());
        if (isNaN(age)){
            totalAge += age2;
        } else {
            totalAge += age;
        }
        if (age < 19 || age2 < 19){
            juniors++;
        }
    }

    var mc = $('.tabbed_pane').children('div').children('div').eq(2).children('table').eq(0)[0].rows;
    for (let i = 1; i < mc.length; i++){
        let age = parseInt(mc[i].children[4].innerText.trim());
        let age2 = parseInt(mc[i].children[3].innerText.trim());
        if (isNaN(age)){
            totalAge += age2;
        } else {
            totalAge += age;
        }
        if (age < 19 || age2 < 19){
            juniors++;
        }
    }

    var at = $('.tabbed_pane').children('div').children('div').eq(2).children('table').eq(1)[0].rows;
    for (let i = 1; i < at.length; i++){
        let age = parseInt(at[i].children[4].innerText.trim());
        let age2 = parseInt(at[i].children[3].innerText.trim());
        if (isNaN(age)){
            totalAge += age2;
        } else {
            totalAge += age;
        }
        if (age < 19 || age2 < 19){
            juniors++;
        }
    }

    var totalPlayers = gk.length - 1 + df.length - 1 + mc.length - 1 + at.length - 1;
    var averageAge = totalAge / totalPlayers;

    var tablePlayerCount = $("<table></table>").attr("id", "playerCountTable").addClass("dugtooltable");
    tablePlayerCount.append("<tr><th>Players</th><th>Total</th></tr>");
    tablePlayerCount.append("<tr><th>All</th><th>" + totalPlayers + "</th></tr>");
    tablePlayerCount.append("<tr><th>Juniors</th><th>" + juniors + "</th></tr>");
    tablePlayerCount.append("<tr><th>Avg Age</th><th>" + (Math.round(averageAge * 100) / 100).toFixed(1) + "</th></tr>");
    $leftDT.append(tablePlayerCount);
};

function parseURL() {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = window.location.href;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}

var url = parseURL();
if (url.pathname.startsWith('/players/none')){
    playersCount();
}
else if (url.pathname.startsWith('/players/details')){
    playerDetails();
}
