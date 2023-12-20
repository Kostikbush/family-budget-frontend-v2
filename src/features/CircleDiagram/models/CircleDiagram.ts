import { ExpenseTypes } from "shared/const/Categories";
import { LastExpenses } from "shared/types/storeTypes";
import { SliceDiagram } from "./Slice";

interface ICircleDiagram {}

export class CircleDiagram {
	private radius = window.innerWidth / 2;
	private Slices: SliceDiagram[];
	// ctx: CanvasRenderingContext2D;
	// sum: number;
	// radius: number;
	// radiusTwo: number;
	// startAngle: number;
	// centerX: number;
	// centerY: number;
	// endAngle: number;
	// color: number;
	constructor(
		// ctx: CanvasRenderingContext2D,
		// sum: number,
		// radius: number,
		// radiusTwo: number,
		// startAngle: number,
		// centerX: number,
		// centerY: number,
		// endAngle: number,
		// outerX: number,
		// outerY: number,
		// outerXTwo: number,
		// outerYTwo: number,
		// color: number,
		data: LastExpenses[]
	) {
		// this.ctx = ctx;
		// this.data = data;
		// this.sum = sum;
		// this.radius = radius;
		// this.radiusTwo = radiusTwo;
		// this.startAngle = startAngle;
		// this.centerX = centerX;
		// this.centerY = centerY;
		// this.endAngle = endAngle;
		// this.outerX = outerX;
		// this.outerY = outerY;
		// this.outerXTwo = outerXTwo;
		// this.outerYTwo = outerYTwo;
		// this.color = color;
		this.Slices = data.map(item => {});
	}
	drawDiagram = (ctx: CanvasRenderingContext2D) => {
		const allSum = this.data.reduce((prev, curr) => (prev += curr.sum), 0);
		let startAngle = 0;

		const circle = Math.PI * 2;
		const mapData = this.data.map(item => {
			const endAngle = (item.sum * circle) / allSum + startAngle;

			const outerX = this.centerX + this.radiusTwo * Math.cos(endAngle);
			const outerY = this.centerY + this.radiusTwo * Math.sin(endAngle);

			const outerXTwo = this.centerX + this.radius * Math.cos(startAngle);
			const outerYTwo = this.centerY + this.radius * Math.sin(startAngle);

			const color = ExpenseTypes[item.type].color;
		});
	};

	clearDiagram = (ctx: CanvasRenderingContext2D) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	};
}
