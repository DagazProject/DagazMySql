Dagaz.Controller.persistense = "none";

ZRF = {
    JUMP:          0,
    IF:            1,
    FORK:          2,
    FUNCTION:      3,
    IN_ZONE:       4,
    FLAG:          5,
    SET_FLAG:      6,
    POS_FLAG:      7,
    SET_POS_FLAG:  8,
    ATTR:          9,
    SET_ATTR:      10,
    PROMOTE:       11,
    MODE:          12,
    ON_BOARD_DIR:  13,
    ON_BOARD_POS:  14,
    PARAM:         15,
    LITERAL:       16,
    VERIFY:        20
};

if (!_.isUndefined(Dagaz.Controller.addSound)) {
    Dagaz.Controller.addSound(0, "sounds/wind.wav", true);
    Dagaz.Controller.addSound(2,  "sounds/tadam.wav", true);
    Dagaz.Controller.addSound(3, "sounds/loss.wav", true);
}

Dagaz.Model.BuildDesign = function(design) {
    design.checkVersion("z2j", "2");
    design.checkVersion("animate-captures", "false");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "true");
    design.checkVersion("deferred-captures", "true");

    design.addDirection("ne");
    design.addDirection("se");
    design.addDirection("sw");
    design.addDirection("nw");

    design.addPlayer("White", [2, 3, 0, 1]);
    design.addPlayer("Black", [2, 3, 0, 1]);

    design.addPosition("a8", [0, 9, 0, 0]);
    design.addPosition("b8", [0, 9, 7, 0]);
    design.addPosition("c8", [0, 9, 7, 0]);
    design.addPosition("d8", [0, 9, 7, 0]);
    design.addPosition("e8", [0, 9, 7, 0]);
    design.addPosition("f8", [0, 9, 7, 0]);
    design.addPosition("g8", [0, 9, 7, 0]);
    design.addPosition("h8", [0, 0, 7, 0]);
    design.addPosition("a7", [-7, 9, 0, 0]);
    design.addPosition("b7", [-7, 9, 7, -9]);
    design.addPosition("c7", [-7, 9, 7, -9]);
    design.addPosition("d7", [-7, 9, 7, -9]);
    design.addPosition("e7", [-7, 9, 7, -9]);
    design.addPosition("f7", [-7, 9, 7, -9]);
    design.addPosition("g7", [-7, 9, 7, -9]);
    design.addPosition("h7", [0, 0, 7, -9]);
    design.addPosition("a6", [-7, 9, 0, 0]);
    design.addPosition("b6", [-7, 9, 7, -9]);
    design.addPosition("c6", [-7, 9, 7, -9]);
    design.addPosition("d6", [-7, 9, 7, -9]);
    design.addPosition("e6", [-7, 9, 7, -9]);
    design.addPosition("f6", [-7, 9, 7, -9]);
    design.addPosition("g6", [-7, 9, 7, -9]);
    design.addPosition("h6", [0, 0, 7, -9]);
    design.addPosition("a5", [-7, 9, 0, 0]);
    design.addPosition("b5", [-7, 9, 7, -9]);
    design.addPosition("c5", [-7, 9, 7, -9]);
    design.addPosition("d5", [-7, 9, 7, -9]);
    design.addPosition("e5", [-7, 9, 7, -9]);
    design.addPosition("f5", [-7, 9, 7, -9]);
    design.addPosition("g5", [-7, 9, 7, -9]);
    design.addPosition("h5", [0, 0, 7, -9]);
    design.addPosition("a4", [-7, 9, 0, 0]);
    design.addPosition("b4", [-7, 9, 7, -9]);
    design.addPosition("c4", [-7, 9, 7, -9]);
    design.addPosition("d4", [-7, 9, 7, -9]);
    design.addPosition("e4", [-7, 9, 7, -9]);
    design.addPosition("f4", [-7, 9, 7, -9]);
    design.addPosition("g4", [-7, 9, 7, -9]);
    design.addPosition("h4", [0, 0, 7, -9]);
    design.addPosition("a3", [-7, 9, 0, 0]);
    design.addPosition("b3", [-7, 9, 7, -9]);
    design.addPosition("c3", [-7, 9, 7, -9]);
    design.addPosition("d3", [-7, 9, 7, -9]);
    design.addPosition("e3", [-7, 9, 7, -9]);
    design.addPosition("f3", [-7, 9, 7, -9]);
    design.addPosition("g3", [-7, 9, 7, -9]);
    design.addPosition("h3", [0, 0, 7, -9]);
    design.addPosition("a2", [-7, 9, 0, 0]);
    design.addPosition("b2", [-7, 9, 7, -9]);
    design.addPosition("c2", [-7, 9, 7, -9]);
    design.addPosition("d2", [-7, 9, 7, -9]);
    design.addPosition("e2", [-7, 9, 7, -9]);
    design.addPosition("f2", [-7, 9, 7, -9]);
    design.addPosition("g2", [-7, 9, 7, -9]);
    design.addPosition("h2", [0, 0, 7, -9]);
    design.addPosition("a1", [-7, 0, 0, 0]);
    design.addPosition("b1", [-7, 0, 0, -9]);
    design.addPosition("c1", [-7, 0, 0, -9]);
    design.addPosition("d1", [-7, 0, 0, -9]);
    design.addPosition("e1", [-7, 0, 0, -9]);
    design.addPosition("f1", [-7, 0, 0, -9]);
    design.addPosition("g1", [-7, 0, 0, -9]);
    design.addPosition("h1", [0, 0, 0, -9]);

    design.addZone("promotion", 1, [1, 3, 5, 7]);
    design.addZone("promotion", 2, [56, 58, 60, 62]);
    design.addZone("best", 1, [26, 21]);
    design.addZone("best", 2, [37, 42]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.PARAM,	1);	// $2
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	0);	// promotion
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	5);
    design.addCommand(0, ZRF.PROMOTE,	1);	// King
    design.addCommand(0, ZRF.MODE,	2);	// continue-type
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.JUMP,	3);
    design.addCommand(0, ZRF.MODE,	0);	// jump-type
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.IN_ZONE,	0);	// promotion
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.IF,	4);
    design.addCommand(1, ZRF.PROMOTE,	1);	// King
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.JUMP,	2);
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	4);
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.JUMP,	-5);
    design.addCommand(2, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PARAM,	2);	// $3
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	18);
    design.addCommand(2, ZRF.FUNCTION,	6);	// mark
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	5);
    design.addCommand(2, ZRF.PARAM,	3);	// $4
    design.addCommand(2, ZRF.FUNCTION,	23);	// opposite
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.JUMP,	-6);
    design.addCommand(2, ZRF.FUNCTION,	26);	// capture
    design.addCommand(2, ZRF.FUNCTION,	7);	// back
    design.addCommand(2, ZRF.FORK,	4);
    design.addCommand(2, ZRF.MODE,	2);	// continue-type
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end
    design.addCommand(2, ZRF.PARAM,	4);	// $5
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.JUMP,	-19);
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.IF,	7);
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	4);	// last-from?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.JUMP,	-8);
    design.addCommand(3, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.PARAM,	2);	// $3
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.IF,	18);
    design.addCommand(3, ZRF.FUNCTION,	6);	// mark
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.IF,	5);
    design.addCommand(3, ZRF.PARAM,	3);	// $4
    design.addCommand(3, ZRF.FUNCTION,	23);	// opposite
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.JUMP,	-6);
    design.addCommand(3, ZRF.FUNCTION,	26);	// capture
    design.addCommand(3, ZRF.FUNCTION,	7);	// back
    design.addCommand(3, ZRF.FORK,	4);
    design.addCommand(3, ZRF.MODE,	2);	// continue-type
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end
    design.addCommand(3, ZRF.PARAM,	4);	// $5
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.JUMP,	-19);
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	7);
    design.addCommand(4, ZRF.FORK,	3);
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end
    design.addCommand(4, ZRF.PARAM,	1);	// $2
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.JUMP,	-8);
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// jump-type
    design.addPriority(1);			// normal-type

    design.addPiece("Man", 0, 20);
    design.addMove(0, 0, [3, 3], 0);
    design.addMove(0, 0, [0, 0], 0);
    design.addMove(0, 0, [2, 2], 0);
    design.addMove(0, 0, [1, 1], 0);
    design.addMove(0, 1, [3], 1);
    design.addMove(0, 1, [0], 1);

    design.addPiece("King", 1, 100);
    design.addMove(1, 2, [3, 3, 3, 3, 3], 0);
    design.addMove(1, 2, [0, 0, 0, 0, 0], 0);
    design.addMove(1, 2, [2, 2, 2, 2, 2], 0);
    design.addMove(1, 2, [1, 1, 1, 1, 1], 0);
    design.addMove(1, 3, [3, 3, 3, 3, 3], 2);
    design.addMove(1, 3, [0, 0, 0, 0, 0], 2);
    design.addMove(1, 3, [2, 2, 2, 2, 2], 2);
    design.addMove(1, 3, [1, 1, 1, 1, 1], 2);
    design.addMove(1, 4, [3, 3], 1);
    design.addMove(1, 4, [0, 0], 1);
    design.addMove(1, 4, [2, 2], 1);
    design.addMove(1, 4, [1, 1], 1);

    design.setup("White", "Man", 56);
    design.setup("White", "Man", 58);
    design.setup("White", "Man", 60);
    design.setup("White", "Man", 62);
    design.setup("White", "Man", 49);
    design.setup("White", "Man", 51);
    design.setup("White", "Man", 53);
    design.setup("White", "Man", 55);
    design.setup("White", "Man", 40);
    design.setup("White", "Man", 42);
    design.setup("White", "Man", 44);
    design.setup("White", "Man", 46);
    design.setup("Black", "Man", 1);
    design.setup("Black", "Man", 3);
    design.setup("Black", "Man", 5);
    design.setup("Black", "Man", 7);
    design.setup("Black", "Man", 8);
    design.setup("Black", "Man", 10);
    design.setup("Black", "Man", 12);
    design.setup("Black", "Man", 14);
    design.setup("Black", "Man", 17);
    design.setup("Black", "Man", 19);
    design.setup("Black", "Man", 21);
    design.setup("Black", "Man", 23);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
 
    view.defPosition("a8", 352, 352, 50, 50);
    view.defPosition("b8", 302, 352, 50, 50);
    view.defPosition("c8", 252, 352, 50, 50);
    view.defPosition("d8", 202, 352, 50, 50);
    view.defPosition("e8", 152, 352, 50, 50);
    view.defPosition("f8", 102, 352, 50, 50);
    view.defPosition("g8", 52, 352, 50, 50);
    view.defPosition("h8", 2, 352, 50, 50);
    view.defPosition("a7", 352, 302, 50, 50);
    view.defPosition("b7", 302, 302, 50, 50);
    view.defPosition("c7", 252, 302, 50, 50);
    view.defPosition("d7", 202, 302, 50, 50);
    view.defPosition("e7", 152, 302, 50, 50);
    view.defPosition("f7", 102, 302, 50, 50);
    view.defPosition("g7", 52, 302, 50, 50);
    view.defPosition("h7", 2, 302, 50, 50);
    view.defPosition("a6", 352, 252, 50, 50);
    view.defPosition("b6", 302, 252, 50, 50);
    view.defPosition("c6", 252, 252, 50, 50);
    view.defPosition("d6", 202, 252, 50, 50);
    view.defPosition("e6", 152, 252, 50, 50);
    view.defPosition("f6", 102, 252, 50, 50);
    view.defPosition("g6", 52, 252, 50, 50);
    view.defPosition("h6", 2, 252, 50, 50);
    view.defPosition("a5", 352, 202, 50, 50);
    view.defPosition("b5", 302, 202, 50, 50);
    view.defPosition("c5", 252, 202, 50, 50);
    view.defPosition("d5", 202, 202, 50, 50);
    view.defPosition("e5", 152, 202, 50, 50);
    view.defPosition("f5", 102, 202, 50, 50);
    view.defPosition("g5", 52, 202, 50, 50);
    view.defPosition("h5", 2, 202, 50, 50);
    view.defPosition("a4", 352, 152, 50, 50);
    view.defPosition("b4", 302, 152, 50, 50);
    view.defPosition("c4", 252, 152, 50, 50);
    view.defPosition("d4", 202, 152, 50, 50);
    view.defPosition("e4", 152, 152, 50, 50);
    view.defPosition("f4", 102, 152, 50, 50);
    view.defPosition("g4", 52, 152, 50, 50);
    view.defPosition("h4", 2, 152, 50, 50);
    view.defPosition("a3", 352, 102, 50, 50);
    view.defPosition("b3", 302, 102, 50, 50);
    view.defPosition("c3", 252, 102, 50, 50);
    view.defPosition("d3", 202, 102, 50, 50);
    view.defPosition("e3", 152, 102, 50, 50);
    view.defPosition("f3", 102, 102, 50, 50);
    view.defPosition("g3", 52, 102, 50, 50);
    view.defPosition("h3", 2, 102, 50, 50);
    view.defPosition("a2", 352, 52, 50, 50);
    view.defPosition("b2", 302, 52, 50, 50);
    view.defPosition("c2", 252, 52, 50, 50);
    view.defPosition("d2", 202, 52, 50, 50);
    view.defPosition("e2", 152, 52, 50, 50);
    view.defPosition("f2", 102, 52, 50, 50);
    view.defPosition("g2", 52, 52, 50, 50);
    view.defPosition("h2", 2, 52, 50, 50);
    view.defPosition("a1", 352, 2, 50, 50);
    view.defPosition("b1", 302, 2, 50, 50);
    view.defPosition("c1", 252, 2, 50, 50);
    view.defPosition("d1", 202, 2, 50, 50);
    view.defPosition("e1", 152, 2, 50, 50);
    view.defPosition("f1", 102, 2, 50, 50);
    view.defPosition("g1", 52, 2, 50, 50);
    view.defPosition("h1", 2, 2, 50, 50);
}
