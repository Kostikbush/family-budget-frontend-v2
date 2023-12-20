import { ReactNode } from "react";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { ActiveView } from "shared/const/ActivePanel";

import { NavMenu } from "widgets/NavMenu";

import style from "./panels.module.scss";
import { FixedLayout } from "@vkontakte/vkui";

interface PanelsProps {
	children: ReactNode;
}

export const Panels = ({ children }: PanelsProps) => {
	const { view: activeView } = useActiveVkuiLocation();
	const canViewHeaderAndNav = activeView !== ActiveView.auth && activeView !== ActiveView.error;
	return (
		<section className={style.wrapper}>
			{canViewHeaderAndNav && (
				<FixedLayout vertical='bottom' filled>
					<NavMenu />
				</FixedLayout>
			)}
			{children}
		</section>
	);
};
