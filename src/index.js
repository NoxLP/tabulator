import { TabulatorFull as Tabulator } from "../dist/js/tabulator_esm.js";

const keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const data = [];
for (let i = 0; i < 100; i++) {
	const element = { id: i };
	for (let j = 0; j < keys.length; j++) {
		const key = keys[j];
		if (key == "a") {
			element.a = {};
			element.a.milestones = [
				{
					firstM: i,
					tasks: [
						{
							first: "0",
							second: "1",
						},
					],
				},
			];
		} else element[key] = `${i},${key}`;
	}

	data.push(element);
}
console.log("DATA: ", data);

const columnFormatter = (cell, formatterParams, onRendered) => {
	const cellValue = cell.getValue();
	console.log("here");
	const html = cellValue.milestones.map((m) => {
		return `<div style="border: solid black 1px">${m.firstM}-${m.tasks.map(
			(t) => {
				return `TF: ${t.first}, TS: ${t.second}`;
			}
		)}</div>`;
	});
	const dummy = document.createElement("div");
	dummy.innerHTML = html.join();
	return dummy;
};

const columns = keys.map((key) => ({
	title: key,
	field: key,
}));
columns[0].field = "a";
//formatter: columnFormatter,
columns[0].formatter = columnFormatter;
console.log(columns);

window.table = new Tabulator("#forceUpdateTableTest", {
	height: 800,
	data,
	columns,
	layout: "fitColumns",
});
