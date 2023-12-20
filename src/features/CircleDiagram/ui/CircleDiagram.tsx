import { useCircleDiagram } from "../hooks/useCircleDiagram";

import style from "./circleDiagram.module.scss";

export const CircleDiagram = () => {
	const { refOne, refTwo } = useCircleDiagram();

	return (
		<div className={style.wrapper}>
			<div style={{ width: "100%", height: "100px" }}></div>
			<div className={style.wrapperCanvas}>
				<canvas className={style.canvasAnimate} ref={refTwo} />
				<canvas className={style.canvas} ref={refOne} />
			</div>
		</div>
	);
};

//диаграмма при рендере не сразу заполняется,
//а то постепенно заполняется после загрузки всех данных
