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

Dagaz.Model.BuildDesign = function(design) {
    design.checkVersion("z2j", "2");
    design.checkVersion("animate-captures", "false");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "true");
    design.checkVersion("pass-partial", "true");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("ne");
    design.addDirection("n");
    design.addDirection("se");
    design.addDirection("sw");
    design.addDirection("nw");

    design.addPlayer("Light", [1, 0, 4, 6, 2, 7, 3, 5]);
    design.addPlayer("Dark", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a8", [0, 1, 8, 0, 0, 9, 0, 0]);
    design.addPosition("b8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("c8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("d8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("e8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("f8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("g8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("h8", [-1, 0, 8, 0, 0, 0, 7, 0]);
    design.addPosition("a7", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h7", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a6", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h6", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a5", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h5", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a4", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h4", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a3", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h3", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a2", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h2", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a1", [0, 1, 0, -7, -8, 0, 0, 0]);
    design.addPosition("b1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("c1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("d1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("e1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("f1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("g1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("h1", [-1, 0, 0, 0, -8, 0, 0, -9]);

    design.addZone("goal-zone", 2, [56, 57, 58, 59, 60, 61, 62, 63]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	0);	// goal-zone
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	4);
    design.addCommand(0, ZRF.PROMOTE,	2);	// Jotunn
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.JUMP,	3);
    design.addCommand(0, ZRF.PROMOTE,	1);	// JotunnR
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.IN_ZONE,	0);	// goal-zone
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.IF,	4);
    design.addCommand(1, ZRF.PROMOTE,	2);	// Jotunn
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.JUMP,	3);
    design.addCommand(1, ZRF.PROMOTE,	0);	// JotunnA
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.IF,	8);
    design.addCommand(3, ZRF.FORK,	4);
    design.addCommand(3, ZRF.PROMOTE,	4);	// ValkyrieR
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.JUMP,	-9);
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	4);
    design.addCommand(4, ZRF.PARAM,	1);	// $2
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.JUMP,	-5);
    design.addCommand(4, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.PARAM,	2);	// $3
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	19);
    design.addCommand(4, ZRF.FUNCTION,	6);	// mark
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	5);
    design.addCommand(4, ZRF.PARAM,	3);	// $4
    design.addCommand(4, ZRF.FUNCTION,	23);	// opposite
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.JUMP,	-6);
    design.addCommand(4, ZRF.FUNCTION,	26);	// capture
    design.addCommand(4, ZRF.FUNCTION,	7);	// back
    design.addCommand(4, ZRF.FORK,	5);
    design.addCommand(4, ZRF.PROMOTE,	4);	// ValkyrieR
    design.addCommand(4, ZRF.MODE,	1);	// continue-type
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end
    design.addCommand(4, ZRF.PARAM,	4);	// $5
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.JUMP,	-20);
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.IF,	8);
    design.addCommand(5, ZRF.FORK,	4);
    design.addCommand(5, ZRF.PROMOTE,	3);	// ValkyrieA
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end
    design.addCommand(5, ZRF.PARAM,	1);	// $2
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.JUMP,	-9);
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.IF,	4);
    design.addCommand(6, ZRF.PARAM,	1);	// $2
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.JUMP,	-5);
    design.addCommand(6, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.PARAM,	2);	// $3
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.IF,	19);
    design.addCommand(6, ZRF.FUNCTION,	6);	// mark
    design.addCommand(6, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.IF,	5);
    design.addCommand(6, ZRF.PARAM,	3);	// $4
    design.addCommand(6, ZRF.FUNCTION,	23);	// opposite
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.JUMP,	-6);
    design.addCommand(6, ZRF.FUNCTION,	26);	// capture
    design.addCommand(6, ZRF.FUNCTION,	7);	// back
    design.addCommand(6, ZRF.FORK,	5);
    design.addCommand(6, ZRF.PROMOTE,	3);	// ValkyrieA
    design.addCommand(6, ZRF.MODE,	1);	// continue-type
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end
    design.addCommand(6, ZRF.PARAM,	4);	// $5
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.JUMP,	-20);
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addPiece("JotunnA", 0, 100);
    design.addMove(0, 0, [7], 0);
    design.addMove(0, 0, [6], 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [5], 0);

    design.addPiece("JotunnR", 1, 100);
    design.addMove(1, 1, [4], 0);
    design.addMove(1, 1, [2], 0);
    design.addMove(1, 1, [1], 0);
    design.addMove(1, 1, [0], 0);

    design.addPiece("Jotunn", 2, 5000);
    design.addMove(2, 2, [7], 0);
    design.addMove(2, 2, [6], 0);
    design.addMove(2, 2, [3], 0);
    design.addMove(2, 2, [5], 0);
    design.addMove(2, 2, [4], 0);
    design.addMove(2, 2, [2], 0);
    design.addMove(2, 2, [1], 0);
    design.addMove(2, 2, [0], 0);

    design.addPiece("ValkyrieA", 3, 10000);
    design.addMove(3, 3, [7, 7], 0);
    design.addMove(3, 3, [3, 3], 0);
    design.addMove(3, 3, [6, 6], 0);
    design.addMove(3, 3, [5, 5], 0);
    design.addMove(3, 4, [7, 7, 7, 7, 7], 1);
    design.addMove(3, 4, [3, 3, 3, 3, 3], 1);
    design.addMove(3, 4, [6, 6, 6, 6, 6], 1);
    design.addMove(3, 4, [5, 5, 5, 5, 5], 1);

    design.addPiece("ValkyrieR", 4, 10000);
    design.addMove(4, 5, [4, 4], 0);
    design.addMove(4, 5, [1, 1], 0);
    design.addMove(4, 5, [2, 2], 0);
    design.addMove(4, 5, [0, 0], 0);
    design.addMove(4, 6, [4, 4, 4, 4, 4], 1);
    design.addMove(4, 6, [1, 1, 1, 1, 1], 1);
    design.addMove(4, 6, [2, 2, 2, 2, 2], 1);
    design.addMove(4, 6, [0, 0, 0, 0, 0], 1);

    design.setupSelector(4);

    design.setup("Dark", "JotunnA", 1, 1);
    design.setup("Dark", "JotunnA", 2, 1);
    design.setup("Dark", "JotunnA", 3, 1);
    design.setup("Dark", "JotunnA", 4, 1);
    design.setup("Dark", "JotunnA", 5, 1);
    design.setup("Dark", "JotunnA", 6, 1);
    design.setup("Light", "ValkyrieA", 58, 1);
    design.setup("Light", "ValkyrieA", 59, 1);
    design.setup("Light", "ValkyrieA", 60, 1);
    design.setup("Light", "ValkyrieA", 61, 1);

    design.setup("Dark", "JotunnA", 1, 2);
    design.setup("Dark", "JotunnA", 2, 2);
    design.setup("Dark", "JotunnA", 3, 2);
    design.setup("Dark", "JotunnA", 4, 2);
    design.setup("Dark", "JotunnA", 5, 2);
    design.setup("Dark", "JotunnA", 6, 2);
    design.setup("Dark", "JotunnA", 9, 2);
    design.setup("Dark", "JotunnA", 10, 2);
    design.setup("Dark", "JotunnA", 11, 2);
    design.setup("Dark", "JotunnA", 12, 2);
    design.setup("Dark", "JotunnA", 13, 2);
    design.setup("Dark", "JotunnA", 14, 2);
    design.setup("Light", "ValkyrieA", 58, 2);
    design.setup("Light", "ValkyrieA", 59, 2);
    design.setup("Light", "ValkyrieA", 60, 2);
    design.setup("Light", "ValkyrieA", 61, 2);

    design.setup("Dark", "JotunnA", 1, 3);
    design.setup("Dark", "JotunnA", 2, 3);
    design.setup("Dark", "JotunnA", 3, 3);
    design.setup("Dark", "JotunnA", 4, 3);
    design.setup("Dark", "JotunnA", 5, 3);
    design.setup("Dark", "JotunnA", 6, 3);
    design.setup("Dark", "JotunnA", 9, 3);
    design.setup("Dark", "JotunnA", 10, 3);
    design.setup("Dark", "JotunnA", 11, 3);
    design.setup("Dark", "JotunnA", 12, 3);
    design.setup("Dark", "JotunnA", 13, 3);
    design.setup("Dark", "JotunnA", 14, 3);
    design.setup("Dark", "JotunnA", 17, 3);
    design.setup("Dark", "JotunnA", 18, 3);
    design.setup("Dark", "JotunnA", 19, 3);
    design.setup("Dark", "JotunnA", 20, 3);
    design.setup("Dark", "JotunnA", 21, 3);
    design.setup("Dark", "JotunnA", 22, 3);
    design.setup("Light", "ValkyrieA", 58, 3);
    design.setup("Light", "ValkyrieA", 59, 3);
    design.setup("Light", "ValkyrieA", 60, 3);
    design.setup("Light", "ValkyrieA", 61, 3);

    design.setup("Dark", "JotunnA", 1, 4);
    design.setup("Dark", "JotunnA", 2, 4);
    design.setup("Dark", "JotunnA", 3, 4);
    design.setup("Dark", "JotunnA", 4, 4);
    design.setup("Dark", "JotunnA", 5, 4);
    design.setup("Dark", "JotunnA", 6, 4);
    design.setup("Dark", "JotunnA", 9, 4);
    design.setup("Dark", "JotunnA", 10, 4);
    design.setup("Dark", "JotunnA", 11, 4);
    design.setup("Dark", "JotunnA", 12, 4);
    design.setup("Dark", "JotunnA", 13, 4);
    design.setup("Dark", "JotunnA", 14, 4);
    design.setup("Dark", "JotunnA", 17, 4);
    design.setup("Dark", "JotunnA", 18, 4);
    design.setup("Dark", "JotunnA", 19, 4);
    design.setup("Dark", "JotunnA", 20, 4);
    design.setup("Dark", "JotunnA", 21, 4);
    design.setup("Dark", "JotunnA", 22, 4);
    design.setup("Dark", "JotunnA", 25, 4);
    design.setup("Dark", "JotunnA", 26, 4);
    design.setup("Dark", "JotunnA", 27, 4);
    design.setup("Dark", "JotunnA", 28, 4);
    design.setup("Dark", "JotunnA", 29, 4);
    design.setup("Dark", "JotunnA", 30, 4);
    design.setup("Light", "ValkyrieA", 58, 4);
    design.setup("Light", "ValkyrieA", 59, 4);
    design.setup("Light", "ValkyrieA", 60, 4);
    design.setup("Light", "ValkyrieA", 61, 4);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("DarkJotunnA", "Dark JotunnA");
    view.defPiece("DarkJotunnR", "Dark JotunnR");
    view.defPiece("DarkJotunn", "Dark Jotunn");
    view.defPiece("LightValkyrieA", "Light ValkyrieA");
    view.defPiece("LightValkyrieR", "Light ValkyrieR");
 
    view.defPosition("a8", 562, 562, 80, 80);
    view.defPosition("b8", 482, 562, 80, 80);
    view.defPosition("c8", 402, 562, 80, 80);
    view.defPosition("d8", 322, 562, 80, 80);
    view.defPosition("e8", 242, 562, 80, 80);
    view.defPosition("f8", 162, 562, 80, 80);
    view.defPosition("g8", 82, 562, 80, 80);
    view.defPosition("h8", 2, 562, 80, 80);
    view.defPosition("a7", 562, 482, 80, 80);
    view.defPosition("b7", 482, 482, 80, 80);
    view.defPosition("c7", 402, 482, 80, 80);
    view.defPosition("d7", 322, 482, 80, 80);
    view.defPosition("e7", 242, 482, 80, 80);
    view.defPosition("f7", 162, 482, 80, 80);
    view.defPosition("g7", 82, 482, 80, 80);
    view.defPosition("h7", 2, 482, 80, 80);
    view.defPosition("a6", 562, 402, 80, 80);
    view.defPosition("b6", 482, 402, 80, 80);
    view.defPosition("c6", 402, 402, 80, 80);
    view.defPosition("d6", 322, 402, 80, 80);
    view.defPosition("e6", 242, 402, 80, 80);
    view.defPosition("f6", 162, 402, 80, 80);
    view.defPosition("g6", 82, 402, 80, 80);
    view.defPosition("h6", 2, 402, 80, 80);
    view.defPosition("a5", 562, 322, 80, 80);
    view.defPosition("b5", 482, 322, 80, 80);
    view.defPosition("c5", 402, 322, 80, 80);
    view.defPosition("d5", 322, 322, 80, 80);
    view.defPosition("e5", 242, 322, 80, 80);
    view.defPosition("f5", 162, 322, 80, 80);
    view.defPosition("g5", 82, 322, 80, 80);
    view.defPosition("h5", 2, 322, 80, 80);
    view.defPosition("a4", 562, 242, 80, 80);
    view.defPosition("b4", 482, 242, 80, 80);
    view.defPosition("c4", 402, 242, 80, 80);
    view.defPosition("d4", 322, 242, 80, 80);
    view.defPosition("e4", 242, 242, 80, 80);
    view.defPosition("f4", 162, 242, 80, 80);
    view.defPosition("g4", 82, 242, 80, 80);
    view.defPosition("h4", 2, 242, 80, 80);
    view.defPosition("a3", 562, 162, 80, 80);
    view.defPosition("b3", 482, 162, 80, 80);
    view.defPosition("c3", 402, 162, 80, 80);
    view.defPosition("d3", 322, 162, 80, 80);
    view.defPosition("e3", 242, 162, 80, 80);
    view.defPosition("f3", 162, 162, 80, 80);
    view.defPosition("g3", 82, 162, 80, 80);
    view.defPosition("h3", 2, 162, 80, 80);
    view.defPosition("a2", 562, 82, 80, 80);
    view.defPosition("b2", 482, 82, 80, 80);
    view.defPosition("c2", 402, 82, 80, 80);
    view.defPosition("d2", 322, 82, 80, 80);
    view.defPosition("e2", 242, 82, 80, 80);
    view.defPosition("f2", 162, 82, 80, 80);
    view.defPosition("g2", 82, 82, 80, 80);
    view.defPosition("h2", 2, 82, 80, 80);
    view.defPosition("a1", 562, 2, 80, 80);
    view.defPosition("b1", 482, 2, 80, 80);
    view.defPosition("c1", 402, 2, 80, 80);
    view.defPosition("d1", 322, 2, 80, 80);
    view.defPosition("e1", 242, 2, 80, 80);
    view.defPosition("f1", 162, 2, 80, 80);
    view.defPosition("g1", 82, 2, 80, 80);
    view.defPosition("h1", 2, 2, 80, 80);
}
