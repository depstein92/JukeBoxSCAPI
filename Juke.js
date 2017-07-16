
alert('successfull load on runtime');
/*===============Elements=======================
================================================*/
var currentPosition = 0;
var buttonsBox = document.getElementById('buttons_box');
var playButton = document.getElementById("play_button");
var pauseButton = document.getElementById('pause_button');
var stopButton = document.getElementById('stop_button');
var audio = document.getElementById('audioPlayer');
var play_image = document.getElementById('play_image');

var requestAnimationFrame =
   window.requestAnimationFrame ||
   window.mozrequestAnimationFrame ||
   window.webkitrequestAnimationFrame ||
   window.msrequestAnimationFrame;

/*====================================================
================Song Storage======================*/

function songStorage(songs){
  this.songs = [];
  this.addSong = function(song){
    this.songs.push("http://www.californiaherps.com/sounds/rcatesbeianaic509encounter.mp3");
    console.log('I have been called', this.songs);
  }
}

songStorage.prototype.addSong = function(song){
  this.songs.push("http://www.californiaherps.com/sounds/rcatesbeianaic509encounter.mp3");
  console.log('I have been called', this.songs);
}

var store = new songStorage();
//console.log(this.store.songs, " i am on line 32");

//audio.src = "http://www.californiaherps.com/sounds/rcatesbeianaic509encounter.mp3";

store.addSong("http://www.californiaherps.com/sounds/rcatesbeianaic509encounter.mp3");
audio.src = store.songs[0];
/*===============================================
================Jukebox Object=====================*/

function JukeBox(){
this.play = function(){console.log(audio.play()); }
this.pause = function(){ alert('I have been called: Pause'); /*this.song.then(function(player) {player.pause();})*/}
this.stop = function(){alert('I have been called: Stop'); /*this.song.then(function(player){player.stop();})*/}
this.rewind = function(){}
this.forward = function(){}

}
/*=================================================
==================================================
================New Instances of Object====================*/


SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

var sc = SC.stream("/tracks/99446610");
var juke = new JukeBox();



/*===================================================
=====================================================
=============Event Listeners==========================*/

playButton.addEventListener('click', function(event){
//alert('I have been clicked: playButton');
juke.play()
function slideLeft() {
   var b = setTimeout(function() { /*fixing request Animation Frame */
     requestAnimationFrame(slideLeft);

     currentPosition += 5;
     playButton.style.right = currentPosition + "px";
     if (Math.abs(currentPosition) >= 900) {
       currentPosition = -500;
     }
   }, 10);
   clearTimeout(slideLeft);
 }

 slideLeft();
});

pauseButton.addEventListener('click', function(event){
  //alert('I have been clicked: pauseButton');
  alert(juke.pause()); //.bind(this);

});

stop_button.addEventListener('click', function(event){
  alert(juke.stop());
  //alert('I have been clicked: stopButton');
});





/*========================================================
=========================================================
===================Animations========================*/
