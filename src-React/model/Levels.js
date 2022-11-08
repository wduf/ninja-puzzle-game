export class Levels
{
	static level1 =
	{
		"id": 1,
		"dimensions": {"nrows": 5, "ncols": 4},
		"start": {"row": 2, "col": 0},
		"walls": [
			{"row": 0, "col": 3},
			{"row": 1, "col": 1},
			{"row": 1, "col": 2},
			{"row": 1, "col": 3},
			{"row": 3, "col": 0},
			{"row": 3, "col": 1},
			{"row": 3, "col": 3},
			{"row": 4, "col": 3},
		],
		"doors": [
			{"color": "green", "row": 2, "col": 3},
			{"color": "red",   "row": 4, "col": 1},
		],
		"keys": [
			{"color": "green", "row": 4, "col": 0},
			{"color": "red",   "row": 0, "col": 2},
		],
	}

	static level2 =
	{
		"id": 2,
		"dimensions": {"nrows": 3, "ncols": 4},
		"start":  {"row": 1, "col": 0},
		"walls": [],
		"doors": [
			{"color": "green", "row": 2, "col": 0},
			{"color": "green", "row": 1, "col": 3},
			{"color": "red",   "row": 0, "col": 0},
			{"color": "red",   "row": 2, "col": 1},
			{"color": "blue",  "row": 0, "col": 1},
		],
		"keys": [
			{"color": "green", "row": 1, "col": 2},
			{"color": "green", "row": 2, "col": 3},
			{"color": "red",   "row": 1, "col": 1},
			{"color": "red",   "row": 2, "col": 2},
			{"color": "blue",  "row": 0, "col": 3},
		],
	}

	static level3 =
	{
		"id": 3,
		"dimensions": {"nrows": 2, "ncols": 5},
		"start": {"row": 0, "col": 0},
		"walls": [{"row": 1, "col": 0}],
		"doors": [
			{"color": "green",  "row": 1, "col": 3},
			{"color": "red",    "row": 0, "col": 4},
			{"color": "yellow", "row": 1, "col": 1},
			{"color": "blue",   "row": 1, "col": 2},
		],
		"keys":
		[
			{"color": "red",    "row": 0, "col": 1},
			{"color": "green",  "row": 0, "col": 2},
			{"color": "blue",   "row": 0, "col": 3},
			{"color": "yellow", "row": 1, "col": 4},
		],
	}

	static level4 =
	{
		"id": 4,
		"dimensions": {"nrows": 3, "ncols": 3},
		"start": {"row": 1, "col": 1},
		"walls": [
			{"row": 0, "col": 0},
			{"row": 0, "col": 2},
			{"row": 1, "col": 0},
			{"row": 1, "col": 2},
			{"row": 2, "col": 0},
			{"row": 2, "col": 1},
			{"row": 2, "col": 2},
		],
		"doors": [
			{"color": "red", "row": 0, "col": 1},
		],
		"keys": [
			{"color": "red", "row": 1, "col": 1},
		],
		"start_key": "#ff0001",  // 1 away from red
	}
}