import { ReactNode, useEffect, useRef, useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";

import style from "./tooltip.module.scss";

interface TooltipProps {
	text?: ReactNode | string;
	hide: boolean;
	children?: ReactNode;
}
// использовать ref для вычисления высоты и ширины ?
export const Tooltip = ({ text, children, hide }: TooltipProps) => {
	const ref = useRef<null | HTMLDivElement>(null);
	const [to, setTo] = useState({ height: 0, width: 0 });

	useEffect(() => {
		if (!ref.current) return;
		setTo({
			height: ref.current.clientHeight,
			width: ref.current.clientWidth,
		});
	}, [ref.current, hide, children]);
	if (hide) return;

	return (
		<div
			ref={ref}
			style={{
				bottom: `-${to.height}px`,
				left: `-${to.width / 6}px`,
			}}
			className={style.tooltip}
		>
			<div className={style.tooltipChild}>
				<IoMdArrowDropup className={style.icon} />
				<span className={style.tooltipText}>
					{text} {children}
				</span>
			</div>
		</div>
	);
};
