import { ActivePanel, ActiveView } from "./ActivePanel";

export const Routers = [
	{
		path: `/${ActivePanel.home}`,
		panel: ActivePanel.home,
		view: ActiveView.home,
	},
	{
		path: `/${ActivePanel.home}/${ActivePanel.account}`,
		panel: ActivePanel.account,
		view: ActiveView.home,
	},
	{
		path: `/${ActivePanel.home}/${ActivePanel.aim}`,
		panel: ActivePanel.aim,
		view: ActiveView.home,
	},
	{
		path: `/${ActivePanel.home}/${ActivePanel.expense}`,
		panel: ActivePanel.expense,
		view: ActiveView.home,
	},
	{
		path: `/${ActivePanel.home}/${ActivePanel.income}`,
		panel: ActivePanel.income,
		view: ActiveView.home,
	},
	{
		path: `/${ActivePanel.home}/${ActivePanel.statistics}`,
		panel: ActivePanel.statistics,
		view: ActiveView.home,
	},
];
