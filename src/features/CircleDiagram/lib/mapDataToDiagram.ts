import { ExpenseTypes } from "shared/const/Categories";
import { LastExpenses } from "shared/types/storeTypes";

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

export const mapDataToDiagram = (data: LastExpenses[], centerX: number, centerY: number, radius: number) => {
	const allSum = data.reduce((prev, curr) => (prev += curr.sum), 0);
	let startAngle = 0;

	const circle = Math.PI * 2;
	const mapData = data.map(item => {
		const endAngle = (item.sum * circle) / allSum + startAngle;

		const color = ExpenseTypes[item.type].color;

		const obj = {
			sum: item.sum,
			radius,
			startAngle,
			centerX,
			centerY,
			endAngle,
			color,
			drawSlice: function ({
				ctx,
				centerX,
				centerY,
				radius,
				startAngle,
				endAngle,
				color,
			}: {
				ctx: CanvasRenderingContext2D;
				centerX?: number | null;
				centerY?: number | null;
				radius?: number | null;
				startAngle?: number | null;
				endAngle?: number | null;
				color?: string;
			}) {
				console.log("draw");
				const currentCenterX = centerX ?? this?.centerX;
				const currentCenterY = centerY ?? this?.centerY;
				const currentRadius = radius ?? this?.radius;
				const currentStartAngle = startAngle ?? this?.startAngle;
				const currentEndAngle = endAngle ?? this?.endAngle;
				const currentColor = color ?? this?.color;
				ctx.strokeStyle = currentColor;

				ctx.beginPath();
				ctx.arc(currentCenterX, currentCenterY, currentRadius, currentStartAngle, currentEndAngle, false);
				ctx.stroke();
				ctx.closePath();
			},
			clearSlice: function (ctx: CanvasRenderingContext2D) {},

			clickSlice: function (ctx: CanvasRenderingContext2D) {
				const initialRadius = this.radius;
				const targetRadius = this.radius + 100;
				let currentRadius = initialRadius;
				let currentCenterX = this.centerX;
				let currentCenterY = this.centerY;

				const animationStep = () => {
					if (currentRadius >= targetRadius) {
						return;
					}
					clearCanvas(ctx);

					currentRadius += 0.1;

					currentCenterX = this.centerX + currentRadius + Math.cos(this.startAngle);
					currentCenterY = this.centerY + currentRadius + Math.sin(this.endAngle);

					this.drawSlice({ ctx, centerX: currentCenterX, centerY: currentCenterY });

					requestAnimationFrame(animationStep);
				};

				animationStep();
			},
		};

		startAngle = endAngle;
		return obj;
	});
	return {
		allSum,
		startAngle,
		mapData,
	};
};

// const distans = this.centerX * 1.5;
// let progressCenterX = this.centerX;
// let progressCenterY = this.centerY;
// let progressR = this.radius;
// const hide = "rgba(0, 0, 0, 0)";
// const animate = () => {
// 	// console.log("click", progressR);

// 	this.drawSlice(ctx, progressCenterX, progressCenterY, null, null, null, hide);
// 	progressR += 0.1;
// 	progressCenterX += 10;
// 	progressCenterY += 10;
// 	this.drawSlice(ctx, progressCenterX, progressCenterY, null);
// 	if (progressCenterX >= distans) return;

// 	requestAnimationFrame(animate);
// };
// animate();
