export interface ISidebarState {
  toggleMenu: boolean;
  minimizeSidebar: boolean;
}
  
export interface ISidebarAction {
  type: string;
  payload: boolean;
}
