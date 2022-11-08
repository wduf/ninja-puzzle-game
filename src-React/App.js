import React from "react";
import { layout } from "./layout/Layout.js"
import { Model } from "./model/Model.js";
import { Boundary } from "./boundary/Boundary.js";
import { Controller } from "./controller/Controller.js";
import { Levels } from "./model/Levels.js";

// goal and controls popup
setTimeout(() =>
{
	alert("Goal: Unlock all doors.\n\nControls:\n  - wasd = Move\n  - Space = Swap key\n  - r = Reset level\n\nHave fun!")
}, 100);  // 40 works, 100 to be safe

function App()
{
	const cvs_ref = React.useRef(null);
	const button1_ref = React.useRef(null);
	const button2_ref = React.useRef(null);
	const button3_ref = React.useRef(null);
	const button4_ref = React.useRef(null);
	// could use [model, setModel], but setModel() is never used
	const [model] = React.useState(new Model(Levels.level1));
	const [redraw, forceRedraw] = React.useState(0);
	React.useEffect(() =>
	{
		Boundary.redrawCanvas(model, cvs_ref.current);
	}, [model, redraw]);
	const inputHandler = (e) =>
	{
		// handles moving, swap key, reset level from keyboard
		Controller.input(model, e.key);
		forceRedraw(redraw + 1);
		// wait for redraw before checking win
		setTimeout(() =>
		{
			if(model.board.door_cnt === 0)
			{
				model.board.door_cnt--;
				alert(`All doors unlocked. You beat level ${model.level.id}. Congratulations!`);
			}
		}, 40);  // 1 works, 40 to be safe
	}
	const resetButtons = () =>
	{
		// set all buttons to default style
		button1_ref.current.style.background = layout.button.background;
		button2_ref.current.style.background = layout.button.background;
		button3_ref.current.style.background = layout.button.background;
		button4_ref.current.style.background = layout.button.background;
	}
	const pressButton = (id) =>
	{
		if(id === 1)
		{
			button1_ref.current.style.background = layout.buttonPressed.background;
		}
		else if(id === 2)
		{
			button2_ref.current.style.background = layout.buttonPressed.background;
		}
		else if(id === 3)
		{
			button3_ref.current.style.background = layout.buttonPressed.background;
		}
		else if(id === 4)
		{
			button4_ref.current.style.background = layout.buttonPressed.background;
		}
		// could add more levels
	}
	const loadLevelHandler = (level) =>
	{
		// if trying to load the current level
		if(model.level.id === level.id)
		{
			// don't
			return;
		}
		resetButtons();
		pressButton(level.id);
		Controller.loadLevel(model, level);
		forceRedraw(redraw + 1);
	}
	// TODO: darken current level button and make un-clickable "linear-gradient(lightgray, gray)"
	return (
		<main clasName="App" style={layout.App}>
			<br/>
			<h1 style={layout.title}>CS3733 Individual Project 2: Ninja-Se (by Will Dufault)</h1>
			<canvas ref={cvs_ref} width={layout.canvas.width}
			height={layout.canvas.height} style={layout.canvas} tabIndex = "1" 
			onKeyDown={(e) => inputHandler(e)}></canvas>
			<div className="button-wrapper">
				<button className="button1" ref={button1_ref} style={layout.buttonPressed} onClick={() => loadLevelHandler(Levels.level1)}>Level 1</button>&nbsp;
				<button className="button2" ref={button2_ref} style={layout.button} onClick={() => loadLevelHandler(Levels.level2)}>Level 2</button>&nbsp;
				<button className="button3" ref={button3_ref} style={layout.button} onClick={() => loadLevelHandler(Levels.level3)}>Level 3</button>&nbsp;
				<button className="button4" ref={button4_ref} style={layout.button} onClick={() => loadLevelHandler(Levels.level4)}>Level 4</button>&nbsp;
			</div>
			<h1 style={layout.title}>Moves: {model.board.move_cnt}</h1>
		</main>
	);
}

export default App;