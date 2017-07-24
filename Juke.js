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
  this.play = function() {
      //this.currentSongId = this.songsPos.id;
      this.song = SC.stream('/tracks/' + store.songs[this.currentSongIndex]);
      this.song.then(function(player) {
        console.log(player);
        this.player = player;
        player.play();

      }.bind(this))
  };
  this.pause = function() {
    this.player.pause();
    console.log(this);
    this.song.then(function(player){
      console.log(player);
    })
  }
  /*this.stop = function() {
    this.song.then(function(player) {
      store.songs[index].currentTime = 0;
      alert('I have been called');
      player.pause();

    })

  }*/
  this.rewind = function() { /*WARNING: MIGHT BE BUGGY, Investigate later*/
    if (currentPosition < 0) {
      this.song.then(function(player) {
        player.play();
        audio.src = store.songs[0];
        audio.play();
      })


    } else {
      currentPosition = store.songs.length - 1;
      audio.pause();
      audio.src = store.songs[currentPosition]
      audio.play();

    }
  };
  this.currentSongIndex = 0;

  this.forward = function() { //==========================START OF FORWARD BUTTON ====================
    // this.song.then(function(player) {
    //   player.pause();
    //   console.log('paused has been hit');
    // });

   if (this.currentSongIndex >= store.songs.length) {
        this.currentSongIndex = 0;
        console.log('this has exceeded everything');
      } else{
        console.log(this.currentSongIndex);
        this.currentSongIndex++;
      }
     this.play();
    //  audio.src = store.songs[this.currentSongIndex];

    /*  this.song.then(function(player){
        player.play();
      })
    /*
    console.log('I am at point 3');
    console.log(this.currentSongIndex);
    console.log(this.store.songs);
    let stored = this.store.songs[currentSongIndex];
    console.log(stored);
    this.song.then(function(player) {
      player.play();
    });
    this.song.then(function(player) {
      player.play();
    }); */

  } //========================================================END OF FORWARD BUTTON
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

/*stop_button.addEventListener('click', function(event) {
  event.preventDefault();
  juke.stop()
  //alert('I have been clicked: stopButton');
});*/
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
