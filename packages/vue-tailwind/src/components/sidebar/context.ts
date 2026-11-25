import { useSplitterContext } from '@ark-ui/vue/splitter';
import { computed, inject, provide, ref, type InjectionKey, type Ref } from 'vue';

export type SidebarSide = 'left' | 'right';

export interface SidebarConfig {
  isMobile: Ref<boolean>;
  openMobile: Ref<boolean>;
  panelId: Ref<string>;
  setOpenMobile: (open: boolean) => void;
  side: Ref<SidebarSide>;
}

const defaultSidebarConfig: SidebarConfig = {
  isMobile: ref(false),
  openMobile: ref(false),
  panelId: ref('sidebar'),
  setOpenMobile: () => {},
  side: ref<SidebarSide>('left'),
};

export const SidebarContextKey: InjectionKey<SidebarConfig> = Symbol('SidebarContext');

export function provideSidebarContext(config: SidebarConfig) {
  provide(SidebarContextKey, config);
}

export function useSidebarConfig() {
  return inject(SidebarContextKey, defaultSidebarConfig);
}

export function useSidebar() {
  const config = useSidebarConfig();
  const splitter = useSplitterContext();
  const collapsed = computed(() => splitter.value.isPanelCollapsed(config.panelId.value));

  return {
    collapsed,
    isMobile: config.isMobile,
    openMobile: config.openMobile,
    setOpenMobile: config.setOpenMobile,
    side: config.side,
    state: computed(() => (collapsed.value ? 'collapsed' : 'expanded')),
    toggleSidebar: () => {
      if (config.isMobile.value) {
        config.setOpenMobile(!config.openMobile.value);
      } else if (collapsed.value) {
        splitter.value.expandPanel(config.panelId.value);
      } else {
        splitter.value.collapsePanel(config.panelId.value);
      }
    },
  };
}