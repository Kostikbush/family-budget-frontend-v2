import { useEffect, useRef, useState } from "react";

import day from "shared/img/day.jpg";
import evening from "shared/img/evn.jpg";
import night from "shared/img/night.jpg";

export const getImg = () => {
	const hour = new Date().getHours();
	if (hour >= 6 && hour < 18) {
		return day;
	}
	if (hour >= 18 && hour < 22) {
		return evening;
	}
	return night;
};

export const useLoadImg = () => {
	const [spinner, setPopout] = useState<boolean>(true);
	const src = useRef<string | null>(null);

	useEffect(() => {
		if (src.current) return;
		const handleLoad = (srcS: string) => {
			src.current = srcS;
			setPopout(false);
		};

		const image = new Image();
		image.src = getImg();
		image.addEventListener("load", () => handleLoad(getImg()));
		return () => {
			image.removeEventListener("load", () => handleLoad(getImg()));
		};
	}, []);
	return { spinner, src: src.current };
};
