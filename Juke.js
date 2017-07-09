
console.log('page connected');

window.addEventListener('load', function(event){


var buttonsBox = document.getElementById('buttons_box');
var playButton = document.getElementById('play_button');
var pauseButton = document.getElementById('pause_button');
var stopButton = document.getElementById('stop_button');


console.log('page connected');


function JukeBox(){
this.play = function(){ this.song.then(function(player){player.play();})}
this.pause = function(){ this.song.then(function(player) {player.pause();})}
this.stop = function(){ this.song.then(function(player){player.stop();})}
this.rewind = function(){}
this.forward = function(){}

}

SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

var sc = SC.stream("/tracks/99446610");


playButton.addEventListener('click', function(event){
console.log('I have been clicked: playButton');
});

pauseButton.addEventListener('click', function(event){
  console.log('I have been clicked: pauseButton');
});

stop_button.addEventListener('click', function(event){
  console.log('I have been clicked: stopButton');
});





});
