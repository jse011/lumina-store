import { NavItem } from '../types';

export interface INavRepository {
  getNavItems(): Promise<NavItem[]>;
  saveNavItem(item: NavItem): Promise<void>;
}
