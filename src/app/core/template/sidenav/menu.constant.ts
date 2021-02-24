import { IMenu } from './interfaces/menu.interface';

export const MENU: IMenu = {
  pages: [
    {
      displayName: 'Dashboard',
      iconName: 'bar_chart',
      route: 'dashboard',
    },
    {
      displayName: 'Scheduler',
      iconName: 'calendar_today',
      route: 'scheduler',
    },
  ],
  extra: [
    {
      displayName: 'Settings',
      iconName: 'settings',
    },
    {
      displayName: 'Logout',
      iconName: 'logout',
    },
  ],
};
