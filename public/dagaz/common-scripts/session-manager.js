(function() {

var SERVICE   = "/api/";

Dagaz.Controller.NO_UNDO  = false;
Dagaz.Controller.MIN_TURN = null;

var root      = null;
var curr      = null;
var top       = null;
var branch    = 1;
var isAuto    = true;
var isStarted = false;
var undoUid   = null;
var auth      = null;

Dagaz.Model.moveToString = function(move) {
  var r = "";
  for (var i = 0; i < move.actions.length; i++) {
       if (move.actions[i][1] !== null) {
           if (r != "") {
               r = r + "-";
           }
           if (move.actions[i][0] !== null) {
               r = r + Dagaz.Model.posToString(move.actions[i][0][0]);
           } else if (Dagaz.Model.DETAIL_MOVE_DESCRIPTION && (move.actions[i][2] !== null)) {
               r = r + move.actions[i][2][0].toString() + " ";
           }
           if (move.actions[i][1] !== null) {
               r = r + Dagaz.Model.posToString(move.actions[i][1][0]);
           }
       }
  }
  return r;
}

Dagaz.Controller.init = function(setup, player) {
//console.log('Session Manager (Init): ' + setup + ', player = ' + player);
  root = {
      parent: null,
      turn:   0,
      branch: 0,
      player: player,
      setup:  setup,
      nodes:  []
  };
  curr = root;
  top = curr;
}

var findNode = function(turn) {
  var r = top;
  while (r !== null) {
      if (r.turn == turn) return r;
      r = r.parent;
  }
  return null;
}

var checkButtons = function() {
  if (curr.parent) {
      undo.style.display = "inline";
      home.style.display = "inline";
  } else {
      undo.style.display = "none";
      home.style.display = "none";
  }
  if (curr.nodes.length) {
      redo.style.display = "inline";
  } else {
      redo.style.display = "none";
  }
  if (undoUid !== null) {
      undo.style.display = "inline";
  }
}

Dagaz.Controller.setUndoVisible = function(uid, token) {
   if (Dagaz.Controller.NO_UNDO) return;
   undoUid = uid;
   if (uid !== null) {
       auth = token;
   }
   checkButtons();
}

// TODO: Переопределить в app
// true - если коалиция или режим разбора партии
Dagaz.Controller.isStable = function(player) {
  return true;
}

Dagaz.Controller.home = function() {
  Dagaz.Controller.system = true;
  if (!curr.parent) return;
  if (!Dagaz.Controller.isBuzy()) return;
  var node = curr.parent;
  while (node.parent) {
      node = node.parent;
  }
  curr = node;
  checkButtons();
  Dagaz.Controller.setup(node.setup, node.player, node.limit);
  console.log('undo: ' + node.setup);
  if (!_.isUndefined(Dagaz.Controller.play)) {
      Dagaz.Controller.play(Dagaz.Sounds.page);
  }
  isAuto = false;
}

var undoMove = function(uid) {
  if (auth === null) return;
  $.ajax({
     url: SERVICE + "move/undo/" + uid,
     type: "POST",
     dataType: "json",
     beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + auth);
     },
     success: function(data) {
         window.location = window.location;
     },
     error: function() {
         console.log('undo: error');
     },
     statusCode: {
        404: function() {
             if (!(localStorage.getItem('myFlags') & 1)) alert('Can\'t rollback move');
        },
        500: function() {
             console.log('undo: 500');
        }
     }
  });
}

Dagaz.Controller.undo = function() {
  if (undoUid !== null) {
      if (!(localStorage.getItem('myFlags') & 1) && !confirm("Rollback last move?")) return;
      undoMove(undoUid);
      Dagaz.Controller.setUndoVisible(null);
      return;
  }
  Dagaz.Controller.system = true;
  if (!curr.parent) return;
  if (!Dagaz.Controller.isBuzy()) return;
  var node = curr.parent;
  while (node.parent) {
      // Если перемотка может быть завершена на этом игроке
      if (Dagaz.Controller.isStable(node.player)) break;
      node = node.parent;
  }
  if (!node) return false;
  curr = node;
  checkButtons();
  Dagaz.Controller.setup(node.setup, node.player, node.limit);
  console.log('undo: ' + node.setup);
  if (!_.isUndefined(Dagaz.Controller.play)) {
      Dagaz.Controller.play(Dagaz.Sounds.page);
  }
  isAuto = false;
}

Dagaz.Controller.redo = function() {
  Dagaz.Controller.system = true;
  if (!curr.nodes.length) return;
  if (!Dagaz.Controller.isBuzy()) return;
  var node = null;
  _.each(curr.nodes, function(n) {
      if (n.branch > branch) return;
      if ((node !== null) && (node.branch >= n.branch)) return;
      node = n;
  });
  if (!node) return false;
  if (node.move !== null) {
      Dagaz.Controller.apply(node.move, node.setup, node.limit);
  } else {
      Dagaz.Controller.setup(node.setup, node.player, node.limit);
      console.log('redo: ' + node.setup);
      if (!_.isUndefined(Dagaz.Controller.play)) {
          Dagaz.Controller.play(Dagaz.Sounds.page);
      }
  }
  curr = node;
  checkButtons();
}

var animate = function() {
  if (!isAuto) return;
  Dagaz.Controller.redo();
  _.delay(animate, 2000);
}

Dagaz.Controller.regSetup = function(s) {
  if (_.isUndefined(s)) return;
  if (Dagaz.Controller.NO_UNDO && (Dagaz.Controller.MIN_TURN !== null)) {
      var r = s.match(/turn=(\d+)/);
      if (r && (r[1] >= Dagaz.Controller.MIN_TURN)) {
          Dagaz.Controller.NO_UNDO = false;
      }
  }
}

Dagaz.Controller.addMoves = function(moves) {
  console.log(moves[0]);
  _.each(moves, function(move) {
      var node = findNode(move.turn_num - 1);
      if (node === null) return;
      var branch = 0;
      _.each(node.nodes, function(n) {
          if (n.branch <= branch) return;
          branch = n.branch;
      });
      // Добавить branch_num
      if (move.branch_num <= branch) return;
      top = {
          parent: node,
          turn: move.turn_num,
          branch: move.branch_num,
          player: move.next_player,
          move: move.move_str,
          setup: move.setup_str,
          limit: move.time_limit,
          nodes:  []
      };
      node.nodes.push(top);   
  });
  checkButtons();
  if (!isStarted) {
      isStarted = true;
      _.delay(animate, 1000);
  }
}

// Переключиться на branch хода
Dagaz.Controller.switch = function(move, setup, player) {
  var node = null; var mx = branch;
  _.each(curr.nodes, function(n) {
      if (n.branch > mx) mx = n.branch;
      if (n.move != move) return;
      node = n;
  });
  if (!node) {
      node = {
          parent: curr,
          turn: curr.turn + 1,
          branch: mx + 1,
          player: player,
          move: move,
          setup: setup,
          nodes:  []
      };
      curr.nodes.push(node);
      // TODO: Сохранить новый branch в БД
      Dagaz.Controller.save(node.turn, node.move, node.setup, node.player, node.branch);
  }
  if (!node) return false;
  branch = node.branch
  curr = node;
  checkButtons();
  return true;
}

var DIR_NAMES   = {
    "Home":      "h",
    "PageUp":    "u",
    "PageDown":  "d",
    "Backspace": "d"
};

var onkeyup = window.onkeyup;

window.onkeyup = function(event) {
  var name = DIR_NAMES[event.key];
  if (_.isUndefined(event.key)) {
      name = DIR_NAMES[event.keyIdentifier];
  }
  if (curr) {
      if ((curr.parent || (undoUid !== null)) && (name == 'd')) {
          Dagaz.Controller.undo();
      }
      if (curr.nodes.length && (name == 'u')) {
          Dagaz.Controller.redo();
      }
      if (curr.nodes.length && (name == 'h')) {
          Dagaz.Controller.home();
      }
  }
  if (onkeyup) {
      onkeyup(event);
  }
}

})();
