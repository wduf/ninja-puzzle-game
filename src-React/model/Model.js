import { Board } from "./Board.js"

export class Model
{
	constructor(level)
	{
		this.board = new Board();  // Board
		this.level = level;  // Levels (level)
		// load level to board
		this.load(level);
	}
	load(level)
	{
		this.board.load(level);
		// reset move count
		this.board.move_cnt = 0;
	}
}