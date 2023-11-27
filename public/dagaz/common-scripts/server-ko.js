(function() {

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  if (Dagaz.Controller.SERVER_KO) {
      _.each(board.moves, function(move) {
           if (move.failed) return;
           var b = board.apply(move);
           var s = Dagaz.Model.getSetup(design, b);
           if (s == Dagaz.Controller.SERVER_KO) {
               move.failed = true;
           }
      });
  }
  CheckInvariants(board);
}

})();
