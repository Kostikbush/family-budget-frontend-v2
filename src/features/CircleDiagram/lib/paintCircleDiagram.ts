import { LastExpenses } from "shared/types/storeTypes";
import { clearCanvas, mapDataToDiagram } from "./mapDataToDiagram";

const arr: LastExpenses[] = [
	{
		category: "",
		date: new Date(),
		id: "1",
		sum: 1000,
		type: "beauty",
		userID: "",
	},
	{
		category: "",
		date: new Date(),
		id: "2",
		sum: 3000,
		type: "fun",
		userID: "1",
	},
	{
		category: "",
		date: new Date(),
		id: "3",
		sum: 2500,
		type: "rest",
		userID: "1",
	},
	{
		category: "",
		date: new Date(),
		id: "4",
		sum: 4000,
		type: "sport",
		userID: "",
	},
	{
		category: "",
		date: new Date(),
		id: "5",
		sum: 4000,
		type: "kids",
		userID: "",
	},
	{
		category: "",
		date: new Date(),
		id: "6",
		sum: 4000,
		type: "food",
		userID: "",
	},
	{
		category: "",
		date: new Date(),
		id: "7",
		sum: 4000,
		type: "connection",
		userID: "",
	},
	{
		category: "",
		date: new Date(),
		id: "8",
		sum: 4000,
		type: "household",
		userID: "",
	},
];

interface Slice {
	sum: number;
	radius: number;
	startAngle: number;
	centerX: number;
	centerY: number;
	endAngle: number;
	color: string;
	clearSlice: (ctx: CanvasRenderingContext2D) => void;
	clickSlice: (ctx: CanvasRenderingContext2D) => void;
	drawSlice: ({
		ctx,
		centerX,
		centerY,
		radius,
		startAngle,
		endAngle,
		color,
	}: {
		ctx: CanvasRenderingContext2D;
		centerX?: number | null | undefined;
		centerY?: number | null | undefined;
		radius?: number | null | undefined;
		startAngle?: number | null | undefined;
		endAngle?: number | null | undefined;
		color?: string | undefined;
	}) => void;
}

const DPI = 2;
let WIDTH: number;

if (window.innerWidth > 500 && window.innerWidth < 600) {
	WIDTH = window.innerWidth / 1.5;
} else if (window.innerWidth > 600) {
	WIDTH = window.innerWidth / 2;
} else {
	WIDTH = window.innerWidth / 1;
}

const HEIGHT = WIDTH;
const DPI_WIDTH = WIDTH * DPI;
const DPI_HEIGHT = HEIGHT * DPI;
const PI = Math.PI;
const circle = PI * 2;

function isPointInsideSlice(x: number, y: number, slice: Slice): boolean {
	const deltaX = x - slice.centerX / 2;
	const deltaY = y - slice.centerY / 2;
	const distanceFromCenter = Math.sqrt(deltaX ** 2 + deltaY ** 2);

	// Проверка, что клик находится за пределами внутренней границы диаграммы
	if (distanceFromCenter <= slice.radius / 4) {
		return false;
	}

	const polarAngle = Math.atan2(deltaY, deltaX);
	const positiveAngle = polarAngle < 0 ? polarAngle + 2 * Math.PI : polarAngle;

	return positiveAngle >= slice.startAngle && positiveAngle <= slice.endAngle;
}

const getClickSlice = (
	mapData: Slice[],
	mouseX: number,
	mouseY: number,
	ctx: CanvasRenderingContext2D
): Slice | null => {
	return (
		mapData.find(slice => {
			if (isPointInsideSlice(mouseX, mouseY, slice)) {
				return slice;
			}
			slice.drawSlice({ ctx });
		}) || null
	);
};

const handleClick = (
	e: MouseEvent,
	ctxOne: CanvasRenderingContext2D,
	ctxTwo: CanvasRenderingContext2D,
	mapData: Slice[]
) => {
	const mouseX = e.offsetX;
	const mouseY = e.offsetY;

	clearCanvas(ctxOne);
	const clickedSlice = getClickSlice(mapData, mouseX, mouseY, ctxOne);

	if (!clickedSlice) return;

	clickedSlice.clickSlice(ctxTwo);
};

const getDataForDiagram = (canvasOne: HTMLCanvasElement, canvasTwo: HTMLCanvasElement) => {
	canvasOne.style.width = WIDTH + "px";
	canvasOne.style.height = HEIGHT + "px";
	canvasOne.width = DPI_WIDTH;
	canvasOne.height = DPI_HEIGHT;

	canvasTwo.style.width = WIDTH * 1.3 + "px";
	canvasTwo.style.height = HEIGHT * 1.3 + "px";
	canvasTwo.width = DPI_WIDTH;
	canvasTwo.height = DPI_HEIGHT;

	const ctxTwo = canvasTwo.getContext("2d");
	const ctxOne = canvasOne.getContext("2d");

	if (!ctxOne || !ctxTwo) return null;

	ctxOne.imageSmoothingEnabled = true;
	ctxOne.imageSmoothingQuality = "high";

	ctxTwo.imageSmoothingEnabled = true;
	ctxTwo.imageSmoothingQuality = "high";

	const canvasWidth = canvasOne.width;
	const canvasHeight = canvasOne.height;

	const centerX = Math.round(canvasWidth / 2);
	const centerY = Math.round(canvasHeight / 2);
	const radius = centerX;

	ctxOne.lineWidth = radius;
	ctxTwo.lineWidth = radius;

	return { centerX, centerY, radius, ctxOne, ctxTwo };
};

const drawDiagramWithAnimate = (
	mapData: Slice[],
	ctx: CanvasRenderingContext2D,
	allSum: number,
	centerX: number,
	centerY: number,
	radius: number
) => {
	let currentIndex = 0;
	let animationProgress = 0;

	const animate = () => {
		let { sum, startAngle, color, drawSlice } = mapData[currentIndex];
		const targetEndAngle = (sum * circle) / allSum + startAngle;
		const currentEndAngle = startAngle + (targetEndAngle - startAngle) * animationProgress;

		drawSlice({ ctx, centerX, centerY, radius, startAngle, endAngle: currentEndAngle, color });

		animationProgress += 0.1;
		if (animationProgress < 1) {
			requestAnimationFrame(animate);
		} else {
			startAngle = targetEndAngle;
			currentIndex++;
			if (currentIndex < arr.length) {
				animationProgress = 0;
				requestAnimationFrame(animate);
			} else {
				clearCanvas(ctx);
				mapData.map(slice => slice.drawSlice({ ctx }));
			}
		}
	};
	animate();
};

export const paintCircleDiagram = (canvasOne: HTMLCanvasElement, canvasTwo: HTMLCanvasElement) => {
	const data = getDataForDiagram(canvasOne, canvasTwo);
	if (!data) return;
	const { centerX, centerY, radius, ctxOne, ctxTwo } = data;
	const { mapData, allSum } = mapDataToDiagram(arr, centerX, centerY, radius);
	drawDiagramWithAnimate(mapData, ctxOne, allSum, centerX, centerY, radius);
	canvasOne.addEventListener("click", e => handleClick(e, ctxOne, ctxTwo, mapData));
};
