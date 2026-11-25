import { useSplitterContext } from '@ark-ui/svelte/splitter';
import { getContext, setContext } from 'svelte';

export type SidebarSide = 'left' | 'right';

export interface SidebarConfig {
  isMobile: () => boolean;
  openMobile: () => boolean;
  panelId: () => string;
  setOpenMobile: (open: boolean) => void;
  side: () => SidebarSide;
}

const defaultSidebarConfig: SidebarConfig = {
  isMobile: () => false,
  openMobile: () => false,
  panelId: () => 'sidebar',
  setOpenMobile: () => {},
  side: () => 'left',
};

const sidebarContextKey = Symbol('SidebarContext');

export const provideSidebarContext = (config: SidebarConfig) =>
  setContext(sidebarContextKey, config);

export const useSidebarConfig = () =>
  getContext<SidebarConfig | undefined>(sidebarContextKey) ?? defaultSidebarConfig;

export const useSidebar = () => {
  const config = useSidebarConfig();
  const splitter = useSplitterContext();

  return {
    get collapsed() {
      return splitter().isPanelCollapsed(config.panelId());
    },
    get isMobile() {
      return config.isMobile();
    },
    get openMobile() {
      return config.openMobile();
    },
    setOpenMobile: (open: boolean) => {
      config.setOpenMobile(open);
    },
    get side() {
      return config.side();
    },
    get state() {
      return this.collapsed ? 'collapsed' : 'expanded';
    },
    toggleSidebar: () => {
      if (config.isMobile()) {
        config.setOpenMobile(!config.openMobile());
      } else if (splitter().isPanelCollapsed(config.panelId())) {
        splitter().expandPanel(config.panelId());
      } else {
        splitter().collapsePanel(config.panelId());
      }
    },
  };
};