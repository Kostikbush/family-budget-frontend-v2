import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import bridge from "@vkontakte/vk-bridge";
import "@vkontakte/vkui/dist/components.css";
import "@vkontakte/vkui-tokens/themes/vkCom/cssVars/declarations/onlyVariables.css";
import "@vkontakte/vkui-tokens/themes/vkComDark/cssVars/declarations/onlyVariablesLocal.css";
import { RouteWithoutRoot, RouterProvider, createHashRouter } from "@vkontakte/vk-mini-apps-router";
import { AdaptivityProvider, AppRoot, ConfigProvider, Platform } from "@vkontakte/vkui";

import { ActivePanel, ActiveView } from "shared/const/ActivePanel";

import App from "./app/ui/App";

import "./app/ui/custom-tokens.css";
import { Routers } from "shared/const/Routers";

const client = new ApolloClient({
	uri: "http://localhost:3002/graphql",
	cache: new InMemoryCache(),
});

const routers: RouteWithoutRoot[] = [
	{
		path: `/`,
		panel: ActivePanel.log,
		view: ActiveView.auth,
	},
	{
		path: `/${ActivePanel.reg}`,
		panel: ActivePanel.reg,
		view: ActiveView.auth,
	},
	{
		path: `/${ActivePanel.hel}`,
		panel: ActivePanel.hel,
		view: ActiveView.auth,
	},
	...Routers,
	{
		path: `/${ActivePanel.error}`,
		panel: ActivePanel.error,
		view: ActiveView.error,
	},
];

const width = window.innerWidth;

const router = createHashRouter(routers);

const root = createRoot(document.getElementById("root") as HTMLElement);

bridge.send("VKWebAppInit");

root.render(
	<ApolloProvider client={client}>
		<ConfigProvider
			platform={width > 768 ? Platform.VKCOM : Platform.IOS}
			appearance='light'
			transitionMotionEnabled={true}
			hasCustomPanelHeaderAfter={false}
		>
			<AdaptivityProvider>
				<AppRoot>
					<RouterProvider router={router}>
						<App />
					</RouterProvider>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	</ApolloProvider>
);
