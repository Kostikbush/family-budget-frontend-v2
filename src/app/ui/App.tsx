import { ActivePanel, ActiveView } from "shared/const/ActivePanel";
import { Panel, Root, View } from "@vkontakte/vkui";

import { ErrorPage } from "page/Error";
import { Spiner } from "shared/ui/Spiner";
import { Suspense } from "react";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import { useApp } from "../hooks/useApp";
import { Panels } from "layout/Panels";

const App = () => {
	const { view: activeView, panel } = useActiveVkuiLocation();
	const { views } = useApp();

	return (
		<ErrorPage>
			<Panels>
				<Root activeView={activeView || ActiveView.auth}>
					{views.map(view => (
						<View activePanel={panel || ActivePanel.log} nav={view.nav} id={view.nav} key={view.nav}>
							{view.panels.map(({ nav, page, suspense }) => (
								<Panel id={nav} nav={nav} key={nav}>
									{suspense ? <Suspense fallback={<Spiner />}>{page}</Suspense> : <>{page}</>}
								</Panel>
							))}
						</View>
					))}
				</Root>
			</Panels>
		</ErrorPage>
	);
};

export default App;
