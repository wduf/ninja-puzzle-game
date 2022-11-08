export class Tile
{
	constructor(coordinate, wall, key, door, ninja_se)
	{
		this.coordinate = coordinate;  // Coordinate
		this.wall = wall;  // bool
		this.key = key;  // Key
		this.door = door;  // Door
		this.ninja_se = ninja_se;  // NinjaSe
	}
}