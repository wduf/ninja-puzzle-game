export class Controller
{
	static input(model, key)
	{
		// move up
		if(key === 'w')
		{
			model.board.move("up");
		}
		// move left
		else if(key === 'a')
		{
			model.board.move("left");
		}
		// move down
		else if(key === 's')
		{
			model.board.move("down");
		}
		// move right
		else if(key === 'd')
		{
			model.board.move("right");
		}
		// pick up key / swap key
		else if(key === " ")
		{
			model.board.swapKey();
		}
		// reset level
		else if(key === 'r')
		{
			model.load(model.level);
		}
	}
	static loadLevel(model, level)
	{
		model.level = level;
		model.load(level);
	}
}