import { ActivePanel, ActiveView } from "shared/const/ActivePanel";
import { Hello, LoginForm } from "page/Auth";
import { lazy, useMemo } from "react";

import { ViewsType } from "../types/ViewsType";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

const RegistrationForm = lazy(() => import("page/Auth").then(module => ({ default: module.RegistrationForm })));
const Home = lazy(() => import("page/Home").then(module => ({ default: module.Home })));
const ErrorPage = lazy(() => import("page/Error").then(module => ({ default: module.ErrorPage })));

export const useApp = () => {
	const { panel } = useActiveVkuiLocation();
	const views: ViewsType = useMemo(
		() => [
			{
				activePanel: panel || ActivePanel.log,
				nav: ActiveView.auth,
				panels: [
					{
						nav: ActivePanel.log,
						page: <LoginForm />,
						suspense: false,
					},
					{
						nav: ActivePanel.reg,
						page: <RegistrationForm />,
						suspense: true,
					},
					{
						nav: ActivePanel.hel,
						page: <Hello />,
						suspense: true,
					},
				],
			},
			{
				activePanel: panel || ActivePanel.home,
				nav: ActiveView.home,
				panels: [
					{
						nav: ActivePanel.home,
						page: <Home />,
						suspense: true,
					},
				],
			},
		],
		[]
	);
	return { views };
};
// <View nav={ActiveView.auth} activePanel={panel || ActivePanel.log}>
// 	<Panel nav={ActivePanel.log}>
// 		<LoginForm />
// 	</Panel>
// 	<Panel nav={ActivePanel.reg}>
// 		<Suspense fallback={<ScreenSpinner state='loading' />}>
// 			<RegistrationForm />
// 		</Suspense>
// 	</Panel>
// 	<Panel nav={ActivePanel.hel}>
// 		<Hello />
// 	</Panel>
// </View>
// <View nav={ActiveView.home} activePanel={panel || ActivePanel.log}>
// 	<Panel nav={ActivePanel.home}>
// 		<Suspense fallback={<Spiner />}>
// 			<Home />
// 		</Suspense>
// 	</Panel>
// </View>
// <View activePanel={panel || ActivePanel.log} nav={ActiveView.error}>
// 	<Panel nav={ActivePanel.error}>
// 		<ErrorPage />
// 	</Panel>
// </View>

// const routeNavigator = useRouteNavigator();
// useEffect(() => {
//   const handleErrors = () => {
//     routeNavigator.replace(`/`)
//   };

//   window.addEventListener('error', handleErrors);

//   return () => {
//     window.removeEventListener('error', handleErrors);
//   };
// }, [])
