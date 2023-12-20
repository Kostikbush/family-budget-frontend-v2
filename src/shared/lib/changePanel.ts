import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { ActivePanel } from '../const/ActivePanel';

export const useChangePanel = () => {
  const routeNavigator = useRouteNavigator();
  return (str: ActivePanel, action: 'p' | 'r') => {
    if (action === 'p') {
      routeNavigator.push(str);
      return;
    }
    routeNavigator.replace(`/${str}`);
  };
};
