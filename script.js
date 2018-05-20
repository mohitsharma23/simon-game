$(document).ready(function(){
  var compmoves = [];
  var humanmoves = [];
  var strict = false;
  var moves = ['#red', '#blue', '#green', '#yellow'];
  var round = 0;
  sounds = {
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  };

  $('#start').on('click', function(){
    startGame();
  });

  function startGame(){
    nextRound();
  }

function sound(color){
  switch (color) {
    case '#green':
      sounds.green.play();
      break;
    case '#blue':
      sounds.blue.play();
      break;
    case '#red':
      sounds.red.play();
      break;
    case "#yellow":
      sounds.yellow.play();
      break;
  };
}

  function displayMoves(){
    var i = 0;
    var moves = setInterval(function(){
      //console.log(compmoves[i]);
      gamePlay(compmoves[i]);
      i++;
      if(i >= compmoves.length){
        clearInterval(moves);
      }
    }, 700);
    emptyPlayer();
  }

  function gamePlay(moveid){
    $(moveid).addClass('active');
    sound(moveid);
    setTimeout(function(){
      $(moveid).removeClass('active');
    }, 300);
  }

  function emptyPlayer(){
    humanmoves = [];
  }

  $('.circle').click(function(){
    var id = this.id;
    playerMove(id);
  });

  function playerMove(id){
    var newId = '#' + id;
    humanmoves.push(newId);
    humanTurn(newId);
  }

  function humanTurn(m){
    if(humanmoves[humanmoves.length - 1] != compmoves[humanmoves.length - 1]){
      if(strict){
        alert('Oops! Play again from starting');
        round = 0;
        compmoves = [];
        humanmoves = [];
        startGame();
      }else{
        alert('Try again!');
        displayMoves();
      }
    }else{
      sound(m);
      if(humanmoves.length == compmoves.length){
        if(round == 20){
          alert("You won!");
        }else{
          nextRound();
        }
      }
    }
  }

  function nextRound(){
    round++;
    $('#round').html(round);
    newMoves();
  }

  function newMoves(){
    compmoves.push(moves[(Math.floor(Math.random() * 4))]);
    displayMoves();
  }

  $('#reset').click(function(){
    compmoves = [];
    humanmoves = [];
    round = 0;
    $('#round').html(round);
  });

  $('#strict').click(function(){
    if(!strict){
      strict = true;
      $('#strict').html('Strict ON');
      $('#myModal').modal('hide');
      setTimeout(function(){
        startGame();
      }, 200);
    }else{
      strict = false;
      $('#strict').html('Strict OFF');
      $('#myModal').modal('hide');
      setTimeout(function(){
        startGame();
      }, 200);
    }
  });

});
