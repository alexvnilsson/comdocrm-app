import { VerticalNavigationItemComponent } from './../../vertical-nav/nav-item/nav-item.component';
/**
 * State of navigation (vertical navigation, tabs, etc.).
 * 
 * 
 */
export interface NavigationState {
  type: NavigationStateTypes;
  id: string;
}

export enum NavigationStateTypes {
  VerticalNavigation = 1
};


export class VerticalNavigationState implements NavigationState {
  readonly type = NavigationStateTypes.VerticalNavigation; 

  constructor(
    public id: string,
    public active?: string
  ) {}
}

