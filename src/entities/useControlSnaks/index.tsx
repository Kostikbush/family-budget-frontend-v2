import { Icon28CheckCircleOutline, Icon28ErrorCircleOutline, Icon28WarningTriangleOutline } from "@vkontakte/icons";
import { Snackbar } from "@vkontakte/vkui";
import { useEffect, useRef, useState } from "react";

interface SnackInfo {
	message: string;
	type: "ok" | "error" | "warn";
	onclick?: () => void;
}

const Icons = {
	ok: <Icon28CheckCircleOutline fill='var(--vkui--color_icon_positive)' />,
	error: <Icon28ErrorCircleOutline fill='var(--vkui--color_icon_negative)' />,
	warn: <Icon28WarningTriangleOutline fill='var(--vkui--color_accent_orange--active)' />,
};

export const useControlSnaks = () => {
	const [vieState, setVieState] = useState<React.JSX.Element | null>(null);
	const snacksVie = useRef<React.JSX.Element[]>([]);

	const handleClose = () => {
		setVieState(null);
	};

	useEffect(() => {
		if (vieState) return;

		const currentSnacks = snacksVie.current;

		if (currentSnacks.length > 0) {
			const currentSnack = currentSnacks.shift();
			currentSnack && setVieState(currentSnack);
		}
	});

	const setNewState = (snack: SnackInfo) => {
		const snackComp = (
			<Snackbar
				duration={3000}
				onClose={() => {
					handleClose();
					if (snack?.onclick) {
						snack?.onclick();
					}
				}}
				before={Icons[snack.type]}
			>
				{snack.message}
			</Snackbar>
		);

		setVieState(prev => {
			if (!prev && snacksVie.current.length === 0) {
				return snackComp;
			} else {
				snacksVie.current.push(snackComp);
				return prev;
			}
		});
	};

	return {
		Snack: vieState,
		setSnack: setNewState,
	};
};
