<script lang="ts">
  import {
    Sidebar,
    SidebarInset,
    SidebarNavigationButton,
    SidebarNavigationSubButton,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarTrigger,
  } from '@/components/sidebar';

  let current = $state<'step' | 'location'>('step');
  let label = $state('Initial label');
  let probe = $state('initial');

  export const update = () => {
    current = 'location';
    label = 'Updated label';
    probe = 'updated';
  };
</script>

<Sidebar data-probe={probe} data-testid="root">
  <SidebarPanel>
    <SidebarNavigationButton aria-current={current}>Navigation</SidebarNavigationButton>
    <SidebarNavigationSubButton aria-current={current} href="#nested"
      >Nested</SidebarNavigationSubButton
    >
  </SidebarPanel>
  <SidebarResizeTrigger aria-label={label} />
  <SidebarTrigger aria-label={label} />
  <SidebarInset />
</Sidebar>