Dagaz.Controller.persistense = "none";
Dagaz.Model.WIDTH  = 9;
Dagaz.Model.HEIGHT = 10;

(function() {

var getName = function() {
  var str = window.location.pathname.toString();
  var result = str.match(/\/([^.\/]+)\./);
  if (result) {
      return result[1].replace("-board", "").replace("-ai", "");
  } else {
      return str;
  }
}

var badName = function(str) {
  var result = str.match(/[?&]game=([^&*]*)/);
  if (result) {
      return result[1] != getName();
  } else {
      return true;
  }
}

var getCookie = function() {
  var result = localStorage.getItem('dagaz.setup');
  if (result) {
      if (badName(result)) return "";
      return result;
  } else {
      return "";
  }
}

var getSetup = function(setup) {
  var str = window.location.search.toString();
  if (setup) {
      str = setup;
  }
  var result = str.match(/[?&]setup=([^&]*)/);
  if (result) {
      return result[1];
  } else {
      str = getCookie();
      result = str.match(/[?&]setup=([^&]*)/);
      if (result) {
          return result[1];
      } else {
          return "";
      }
  }
}

var getTurn = function(setup) {
  var str = window.location.search.toString();
  if (setup) {
      str = setup;
  }
  var result = str.match(/[?&]turn=(\d+)/);
  if (result) {
      return result[1];
  } else {
      str = getCookie();
      result = str.match(/[?&]turn=(\d+)/);
      if (result) {
          return result[1];
      } else {
          return "";
      }
  }
}

var createPiece = function(c) {
  if (c == 'S') return Dagaz.Model.createPiece(0, 1);
  if (c == 's') return Dagaz.Model.createPiece(0, 2);
  if (c == 'H') return Dagaz.Model.createPiece(1, 1);
  if (c == 'h') return Dagaz.Model.createPiece(1, 2);
  if (c == 'E') return Dagaz.Model.createPiece(2, 1);
  if (c == 'e') return Dagaz.Model.createPiece(2, 2);
  if (c == 'R') return Dagaz.Model.createPiece(3, 1);
  if (c == 'r') return Dagaz.Model.createPiece(3, 2);
  if (c == 'C') return Dagaz.Model.createPiece(4, 1);
  if (c == 'c') return Dagaz.Model.createPiece(4, 2);
  if (c == 'A') return Dagaz.Model.createPiece(5, 1);
  if (c == 'a') return Dagaz.Model.createPiece(5, 2);
  if (c == 'G') return Dagaz.Model.createPiece(6, 1);
  if (c == 'g') return Dagaz.Model.createPiece(6, 2);
  return null;
}

Dagaz.Model.setup = function(board, init) {
  var design = Dagaz.Model.design;
  var setup  = getSetup(init);
  var player = 1;
  if (setup) {
      board.clear();
      var pos = 0;
      for (var i = 0; i < setup.length; i++) {
           var c = setup[i];
           if (c != '/') {
               if ((c >= '0') && (c <= '9')) {
                   pos += +c;
               } else {
                   var piece = createPiece(c);
                   board.setPiece(pos, piece);
                   pos++;
               }
               if (pos >= Dagaz.Model.WIDTH * Dagaz.Model.HEIGHT) break;
           }
      }
      var turn = getTurn(init);
      if (turn) {
          board.turn   = +turn;
          board.player = design.currPlayer(board.turn);
      }
  }
}

var getPieceNotation = function(piece) {
  var r = 'S';
  if (piece.type > 0)  r = 'H';
  if (piece.type > 1)  r = 'E';
  if (piece.type > 2)  r = 'R';
  if (piece.type > 3)  r = 'C';
  if (piece.type > 4)  r = 'A';
  if (piece.type > 5)  r = 'G';
  if (piece.player > 1) {
      return r.toLowerCase();
  }
  return r;
}

Dagaz.Model.getSetup = function(design, board) {
  var str = "?turn=" + board.turn + ";&setup=";
  var k = 0; var c = 0;
  for (var pos = 0; pos < Dagaz.Model.WIDTH * Dagaz.Model.HEIGHT; pos++) {
       if (k >= Dagaz.Model.WIDTH) {
           if (c > 0) {
               str += c;
           }
           str += "/";
           k = 0;
           c = 0;
       }
       k++;
       var piece = board.getPiece(pos);
       if (piece === null) {
           c++;
       } else {
           if (c > 0) {
               str += c;
           }
           c = 0;
           str += getPieceNotation(piece);
       }
  }
  if (c > 0) {
      str += c;
  }
  if (board.turn == 0) {
      str += " w";
  } else {
      str += " b";
  }
  if (Dagaz.Controller.persistense == "setup") {
      var s = str + "&game=" + getName() + "*";
      localStorage.setItem('dagaz.setup', s);
  }
  return str;
}

var clearGame = Dagaz.Controller.clearGame;

Dagaz.Controller.clearGame = function() {
   localStorage.setItem('dagaz.setup', '');
   if (!_.isUndefined(clearGame)) {
       clearGame();
   }
}

})();
