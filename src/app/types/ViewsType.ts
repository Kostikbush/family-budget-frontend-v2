import { ReactNode } from "react";
import { ActiveView } from "shared/const/ActivePanel";

export type ViewsType = {
	nav: ActiveView;
	activePanel: string;
	panels: {
		nav: string;
		page: JSX.Element | ReactNode;
		suspense: boolean;
	}[];
}[];
