alert('successfull load on runtime');
/*===============Elements=======================
================================================*/

var artwork = document.getElementById('artwork');
var songInfo = document.getElementById('inform');
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
  var _this = this;
  this.songs = [];
  this.addSong = function(song) {
    this.songs.push(song);
  }
}

var store = new songStorage();


store.addSong(293);
store.addSong(200954643);
store.addSong(198703933);
audio.src = store.songs[0];
/*===============================================
================Jukebox Object=====================*/





function JukeBox() {
  this.currentPosition = 0;
  this.currentSongId = 0;
  this.songsPos = store.songs[this.currentPosition];
  this.song = SC.stream('/tracks/' + store.songs[0]);
  this.playerFlag = false;
  this.play = function() {
    console.log(store.songs[this.currentSongIndex]);
    SC.get('/tracks/' + store.songs[this.currentSongIndex]).then(function(tracks) {
      artwork.innerHTML = tracks.artwork_url;
      songInfo.innerHTML = tracks.title;
    });
    this.playerFlag = true;
    this.song = SC.stream('/tracks/' + store.songs[this.currentSongIndex]);
    this.song.then(function(player) {
      this.player = player;
      player.play();
    }.bind(this))
  };
  this.pause = function() { //you need to figure out how to pause a song
    //after its been paused once before
    this.player.pause();
  }

  this.rewind = function() { /*WARNING: MIGHT BE BUGGY, Investigate later*/
    if (this.currentSongIndex < 0) {
      this.currentSongIndex = 0;
    } else {
      this.currentSongIndex--;
    }
    this.play();
  };
  this.currentSongIndex = 0;

  this.forward = function() {
    if (this.currentSongIndex >= store.songs.length) {
      this.currentSongIndex = 0;
    } else {
      this.currentSongIndex++;
    }
    this.play();


  }
}


/*=================================================
==================================================
================New Instances of Object====================*/


SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});


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

rewindButton.addEventListener('click', function(event) {
  event.preventDefault();
  juke.rewind();
});
forwardButton.addEventListener('click', function(event) {
  event.preventDefault();
  juke.forward();
});



/*========================================================
=========================================================
===================Animations========================*/
