import { INavItem } from './nav-item.interface';

export interface IMenu {
  pages: INavItem[];
  extra: INavItem[];
}
