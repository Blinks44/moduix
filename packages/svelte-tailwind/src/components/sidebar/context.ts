import { useSplitterContext } from '@ark-ui/svelte/splitter';
import { getContext, setContext } from 'svelte';

export type SidebarSide = 'left' | 'right';

export interface SidebarConfig {
  panelId: () => string;
  side: () => SidebarSide;
}

const defaultSidebarConfig: SidebarConfig = {
  panelId: () => 'sidebar',
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
    get side() {
      return config.side();
    },
    get state() {
      return this.collapsed ? 'collapsed' : 'expanded';
    },
    toggleSidebar: () => {
      if (splitter().isPanelCollapsed(config.panelId())) splitter().expandPanel(config.panelId());
      else splitter().collapsePanel(config.panelId());
    },
  };
};