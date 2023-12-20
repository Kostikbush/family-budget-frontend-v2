export class SliceDiagram {
	sum: number;
	radius: number;
	radiusTwo: number;
	startAngle: number;
	centerX: number;
	centerY: number;
	endAngle: number;
	outerX: number;
	outerY: number;
	outerXTwo: number;
	outerYTwo: number;
	color: string;
	constructor(
		sum: number,
		radius: number,
		radiusTwo: number,
		startAngle: number,
		centerX: number,
		centerY: number,
		endAngle: number,
		outerX: number,
		outerY: number,
		outerXTwo: number,
		outerYTwo: number,
		color: string
	) {
		this.sum = sum;
		this.radius = radius;
		this.radiusTwo = radiusTwo;
		this.startAngle = startAngle;
		this.centerX = centerX;
		this.centerY = centerY;
		this.endAngle = endAngle;
		this.outerX = outerX;
		this.outerY = outerY;
		this.outerXTwo = outerXTwo;
		this.outerYTwo = outerYTwo;
		this.color = color;
	}
	drawSlice = (
		ctx: CanvasRenderingContext2D,
		{
			centerX = this.centerX,
			centerY = this.centerY,
			outerX = this.outerX,
			outerY = this.outerY,
			outerXTwo = this.outerXTwo,
			outerYTwo = this.outerYTwo,
			radius = this.radius,
			radiusTwo = this.radiusTwo,
			startAngle = this.startAngle,
			endAngle = this.endAngle,
			color = this.color,
		}: {
			centerX?: number;
			centerY?: number;
			outerX?: number;
			outerY?: number;
			outerXTwo?: number;
			outerYTwo?: number;
			radius?: number;
			radiusTwo?: number;
			startAngle?: number;
			endAngle?: number;
			color?: string;
		} = {}
	) => {
		const currentCenterX = centerX !== undefined ? centerX : this.centerX;
		const currentCenterY = centerY !== undefined ? centerY : this.centerY;
		const currentOuterX = outerX !== undefined ? outerX : this.outerX;
		const currentOuterY = outerY !== undefined ? outerY : this.outerY;
		const currentOuterXTwo = outerXTwo !== undefined ? outerXTwo : this.outerXTwo;
		const currentOuterYTwo = outerYTwo !== undefined ? outerYTwo : this.outerYTwo;
		const currentRadius = radius !== undefined ? radius : this.radius;
		const currentRadiusTwo = radiusTwo !== undefined ? radiusTwo : this.radiusTwo;
		const currentStartAngle = startAngle !== undefined ? startAngle : this.startAngle;
		const currentEndAngle = endAngle !== undefined ? endAngle : this.endAngle;
		const currentColor = color !== undefined ? color : this.color;

		ctx.fillStyle = currentColor;
		ctx.strokeStyle = currentColor;

		ctx.beginPath();
		ctx.arc(currentCenterX, currentCenterY, currentRadiusTwo, currentStartAngle, currentEndAngle, false);
		ctx.lineTo(currentOuterX, currentOuterY);
		ctx.arc(currentCenterX, currentCenterY, currentRadius, currentEndAngle, currentStartAngle, true);
		ctx.lineTo(currentOuterXTwo, currentOuterYTwo);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};
}
