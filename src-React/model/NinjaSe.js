export class NinjaSe
{
	constructor(coordinate, key)
	{
		this.coordinate = coordinate;  // Coordinate
		this.key = key;  // Key
	}
	swapKey(new_key)
	{
		// swap keys
		const old_key = this.key;
		this.key = new_key;
		// return key NinjaSe was holding
		return old_key;
	}
}