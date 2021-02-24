export interface INavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: INavItem[];
}
