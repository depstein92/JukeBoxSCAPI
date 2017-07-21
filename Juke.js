alert('successfull load on runtime');
/*===============Elements=======================
================================================*/
var currentPosition = 0;
var currentSongId = 0;
var divs = document.getElementsByTagName('div');
var buttonsBox = document.getElementById('buttons_box');
var playButton = document.getElementById("play_button");
var pauseButton = document.getElementById('pause_button');
var stopButton = document.getElementById('stop_button');
var audio = document.getElementById('audioPlayer');
var play_image = document.getElementById('play_image');
var rewindButton = document.getElementById('previous_button');
var forwardButton = document.getElementById('skip_button');

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozrequestAnimationFrame ||
  window.webkitrequestAnimationFrame ||
  window.msrequestAnimationFrame;




/*====================================================
================Song Storage======================*/

function songStorage(songs) {
  this.songs = [];
  this.addSong = function(song) {
    this.songs.push(song);
    console.log('I have been called', this.songs);
  }
}

var store = new songStorage();


store.addSong("Ants.mp3");
store.addSong("http://www.californiaherps.com/sounds/rcatesbeianaic509encounter.mp3");
store.addSong("http://confrerie.cz.free.fr/cstrike/sound/eira-smallgust.wav");
store.addSong("");
audio.src = store.songs[0];
/*===============================================
================Jukebox Object=====================*/

function JukeBox() {
  this.play = function() {
    audio.play();
  }
  this.pause = function() {
    audio.pause();
  }
  this.stop = function() {
    i = 0;
    audio.pause()
    audio.src = store.songs[i]
  }
  this.rewind = function() { /*WARNING: MIGHT BE BUGGY, Investigate later*/
    if (currentPosition < 0) {
      audio.pause();
      audio.src = store.songs[0];
      audio.play();
    } else {
      currentPosition = store.songs.length - 1;
      audio.pause();
      audio.src = store.songs[currentPosition]
      audio.play();

    } };
  this.forward = function() {
    if(currentPosition > store.songs.length){
      audio.pause();
      audio.src = store.songs[0];
      audio.play();
    }else{
      currentPosition = store.songs.length + 1
      audio.pause();
      audio.src = store.songs[currentPosition]
      audio.play();
    }

} };
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

playButton.addEventListener('click', function(event) {
event.preventDefault();

  juke.play()

  /*function slideLeft() {
    var b = setTimeout(function() { /*fixing request Animation Frame */
      /*requestAnimationFrame(slideLeft);

      currentPosition += 5;
      playButton.style.right = currentPosition + "px";
      if (Math.abs(currentPosition) >= 900) {
        currentPosition = -500;
      }
    }, 10);
    clearTimeout(slideLeft);
  }

  slideLeft(); */
});

pauseButton.addEventListener('click', function(event) {
  event.preventDefault();
  juke.pause();

});

stop_button.addEventListener('click', function(event) {
  event.preventDefault();
  juke.stop()
  //alert('I have been clicked: stopButton');
});
rewindButton.addEventListener('click', function(event){
  event.preventDefault();
  juke.rewind();
});
forwardButton.addEventListener('click', function(event){
  event.preventDefault();
  juke.forward();
});



/*========================================================
=========================================================
===================Animations========================*/
