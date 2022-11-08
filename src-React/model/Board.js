import { Dimensions } from "./Dimensions.js";
import { Coordinate } from "./Coordinate.js";
import { Tile } from "./Tile.js";
import { NinjaSe } from "./NinjaSe.js";

export class Board
{
	constructor()
	{
		this.dimensions = null;  // Dimensions
		this.tiles = null;  // list[list[Tile]]
		this.ninja_se = null;  // NinjaSe
		this.door_cnt = 0;  // int
		this.move_cnt = 0;  // int
	}
	load(level)
	{
		// set tiles
		this.tiles = [];
		// set dimensions
		this.dimensions = new Dimensions(level.dimensions.nrows, level.dimensions.ncols);
		// fill tiles w/ empty tiles
		for(let r = 0; r < this.dimensions.nrows; r++)
		{
			this.tiles[r] = [];
			for(let c = 0; c < this.dimensions.ncols; c++)
			{
				// new (empty) tile here
				this.tiles[r][c] = (new Tile(new Coordinate(r, c)));
			}
		}
		// add walls
		const walls_len = level.walls.length;
		for(let i = 0; i < walls_len; i++)
		{
			const wall = level.walls[i];
			this.tiles[wall.row][wall.col].wall = true;
		}
		// add doors
		const doors_len = level.doors.length;
		// set door_cnt
		this.door_cnt = doors_len;
		for(let i = 0; i < doors_len; i++)
		{
			const door = level.doors[i];
			this.tiles[door.row][door.col].door = door.color;
		}
		// add keys
		const keys_len = level.keys.length;
		for(let i = 0; i < keys_len; i++)
		{
			const key = level.keys[i];
			this.tiles[key.row][key.col].key = key.color;
		}
		// set start
		const start = new Coordinate(level.start.row, level.start.col);
		// start key, either a color or undefined/null
		const start_key = level.start_key;
		// add NinjaSe
		this.ninja_se = new NinjaSe(start, start_key);
		this.tiles[start.row][start.col].ninja_se = this.ninja_se;
	}
	isValidTile(coord)
	{
		// if coordinate in bounds and that tile is not a wall
		return ((coord.row > -1) && (coord.row < this.dimensions.nrows) && 
		(coord.col > -1) && (coord.col < this.dimensions.ncols) &&
		!this.tiles[coord.row][coord.col].wall);
	}
	move(dir)
	{
		const next = new Coordinate(this.ninja_se.coordinate.row, this.ninja_se.coordinate.col);  // new coordinate
		// unlock door @ next
		const unlock = () =>
		{
			// unlock/remove door
			this.tiles[next.row][next.col].door = null;
			// take key from ninja-se
			this.ninja_se.key = null;
			this.door_cnt--;
		}
		// move ninja-se from old coordinate to next
		const moveNinjaSe = () =>
		{
			const old = this.ninja_se.coordinate;  // old coordinate
			// pass ninja-se to next
			this.tiles[next.row][next.col].ninja_se = this.tiles[old.row][old.col].ninja_se;
			// remove ninja-se from old
			this.tiles[old.row][old.col].ninja_se = null;
			// make sure ninja-se knows where he is
			this.ninja_se.coordinate = next;
		}
		if(dir === "up")
		{
			// update next
			next.row--;
			// if next is invalid
			if(!this.isValidTile(next))
			{
				// don't move
				return;
			}
			const door = this.tiles[next.row][next.col].door;  // door field @ next (color or null)
			if(door)
			{
				const key = this.ninja_se.key;  // ninja-se's key (color or null)
				// if key doesn't match door
				if(door !== key)
				{
					// don't move
					return;
				}
				unlock();
			}
			moveNinjaSe();
		}
		else if(dir === "left")
		{
			// update next
			next.col--;
			// if next is invalid
			if(!this.isValidTile(next))
			{
				// don't move
				return;
			}
			const door = this.tiles[next.row][next.col].door;  // door field @ next (color or null)
			if(door)
			{
				const key = this.ninja_se.key;  // ninja-se's key (color or null)
				// if key doesn't match door
				if(door !== key)
				{
					// don't move
					return;
				}
				unlock();
			}
			moveNinjaSe();
		}
		else if(dir === "down")
		{
			// update next
			next.row++;
			// if next is invalid
			if(!this.isValidTile(next))
			{
				// don't move
				return;
			}
			const door = this.tiles[next.row][next.col].door;  // door field @ next (color or null)
			if(door)
			{
				const key = this.ninja_se.key;  // ninja-se's key (color or null)
				// if key doesn't match door
				if(door !== key)
				{
					// don't move
					return;
				}
				unlock();
			}
			moveNinjaSe();
		}
		else
		{
			// update next
			next.col++;
			// if next is invalid
			if(!this.isValidTile(next))
			{
				// don't move
				return;
			}
			const door = this.tiles[next.row][next.col].door;  // door field @ next (color or null)
			if(door)
			{
				const key = this.ninja_se.key;  // ninja-se's key (color or null)
				// if key doesn't match door
				if(door !== key)
				{
					// don't move
					return;
				}
				unlock();
			}
			moveNinjaSe();
		}
		// increment move count
		this.move_cnt++;
	}
	swapKey()
	{
		const ns_key = ((this.ninja_se.key != null) ? this.ninja_se.key : null);  // ninja-se's keys
		const ns_coord = this.ninja_se.coordinate;  // ninja-se's coordinate
		const tile_key = this.tiles[ns_coord.row][ns_coord.col].key;  // key on curr tile (color or null)
		// if both keys null
		if(!ns_key && !tile_key)
		{
			// don't count as a turn
			return;
		}
		// swap keys (or pick up key if ninja-se not holding one)
		this.tiles[ns_coord.row][ns_coord.col].key = ns_key;
		this.ninja_se.key = tile_key;
		// increment move count
		this.move_cnt++;
	}
}