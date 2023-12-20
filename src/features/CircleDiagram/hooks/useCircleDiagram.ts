import { useEffect, useRef } from "react";

import { paintCircleDiagram } from "../lib/paintCircleDiagram";

export const useCircleDiagram = () => {
	const refOne = useRef<null | HTMLCanvasElement>(null);
	const refTwo = useRef<null | HTMLCanvasElement>(null);

	useEffect(() => {
		if (!refOne.current || !refTwo.current) return;

		paintCircleDiagram(refOne.current, refTwo.current);
	}, []);

	return { refOne, refTwo };
};
