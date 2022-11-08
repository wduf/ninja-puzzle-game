export class Boundary
{
	static redrawCanvas(model, cvs)
	{
		const ctx = cvs.getContext("2d");  // allows us to draw on canvas
		// clear canvas
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		const nrows = model.board.dimensions.nrows;  // # of rows
		const ncols = model.board.dimensions.ncols;  // # of cols
		const scale_x = ((0.8 * cvs.width) / ncols);  // 80% of ncols
		const scale_y = ((0.8 * cvs.height) / nrows);  // 80 % of nrows
		const tile_size = Math.min(scale_x, scale_y);  // size of each tile
		const tile_gap = (tile_size / 10);  // size of gap between tiles
		const center_x = (cvs.width / 2);  // horizontal center of canvas
		const center_y = (cvs.height / 2);  // vertical center of canvas
		// for every row of tiles
		for(let r = 0; r < nrows; r++)
		{
			const y = (center_y + ((r - (nrows / 2)) * (tile_size + tile_gap) + (tile_gap / 2)));  // y value of this row of tiles
			// for every tile in current row
			for(let c = 0; c < ncols; c++)
			{
				const x = (center_x + ((c - (ncols / 2)) * (tile_size + tile_gap)) + (tile_gap / 2));  // x value of current tile
				const tile = model.board.tiles[r][c];  // current tile
				// draw tile outline
				ctx.beginPath();
				ctx.rect(x, y, tile_size, tile_size);
				ctx.strokeStyle = "black";
				ctx.lineWidth = 4;
				ctx.stroke();
				// if wall here
				if(tile.wall)
				{
					// draw wall
					ctx.beginPath();
					// fill wall black
					ctx.fillStyle = "black";
					ctx.fillRect(x, y, tile_size, tile_size);
				}
				// if ninja-se here
				else if(tile.ninja_se)
				{
					// draw ninja-se
					ctx.beginPath();
					ctx.fillStyle = "#a349a4";  // ninja-se purple
					ctx.fillRect(x, y, tile_size, tile_size);
					// if ninja-se holding key
					if(tile.ninja_se.key)
					{
						// draw key
						ctx.beginPath();
						const half = (tile_size / 2);
						const qtr = (tile_size / 4);
						// fill key color
						ctx.fillStyle = tile.ninja_se.key;
						ctx.fillRect((x + qtr), (y + qtr), half, half);
						ctx.beginPath();
						ctx.rect((x + qtr), (y + qtr), half, half);
						// draw key outline
						ctx.strokeStyle = "black";
						ctx.lineWidth = 2;
						ctx.stroke();
					}
				}
				// if door
				else if(tile.door)
				{
					// draw door
					ctx.beginPath();
					// fill door color
					ctx.fillStyle = tile.door;
					ctx.fillRect(x, y, tile_size, tile_size);
					ctx.beginPath();
					const half = (tile_size / 2);
					const qtr = (tile_size / 4);
					// fill keyhole
					ctx.fillStyle = "white";
					ctx.fillRect((x + qtr), (y + qtr), half, half);
					ctx.beginPath();
					ctx.rect((x + qtr), (y + qtr), half, half);
					// draw keyhole
					ctx.strokeStyle = "black";
					ctx.lineWidth = 2;
					ctx.stroke();
				}
				// if empty tile or key
				else
				{
					// draw empty tile
					ctx.beginPath();
					// fill empty tile
					ctx.fillStyle = "white";
					ctx.fillRect(x, y, tile_size, tile_size);
					// if key
					if(tile.key)
					{
						// draw key
						ctx.beginPath();
						const half = (tile_size / 2);
						const qtr = (tile_size / 4);
						// fill key color
						ctx.fillStyle = tile.key;
						ctx.fillRect((x + qtr), (y + qtr), half, half);
						ctx.beginPath();
						ctx.rect((x + qtr), (y + qtr), half, half);
						// draw key outline
						ctx.strokeStyle = "black";
						ctx.lineWidth = 2;
						ctx.stroke();
					}
				}
			}
		}
	}
}