import { useSplitterContext } from '@ark-ui/vue/splitter';
import { computed, inject, provide, ref, type InjectionKey, type Ref } from 'vue';

export type SidebarSide = 'left' | 'right';

export interface SidebarConfig {
  panelId: Ref<string>;
  side: Ref<SidebarSide>;
}

const defaultSidebarConfig: SidebarConfig = {
  panelId: ref('sidebar'),
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

  const toggleSidebar = () => {
    if (collapsed.value) {
      splitter.value.expandPanel(config.panelId.value);
    } else {
      splitter.value.collapsePanel(config.panelId.value);
    }
  };

  return {
    collapsed,
    side: config.side,
    state: computed(() => (collapsed.value ? 'collapsed' : 'expanded')),
    toggleSidebar,
  };
}