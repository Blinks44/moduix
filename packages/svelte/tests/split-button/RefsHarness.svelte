<script lang="ts">
  import { MenuItem } from '@/components/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@/components/split-button';

  let rootRef: HTMLDivElement | null = $state(null);
  let actionRef: Element | null = $state(null);
  let triggerRef: Element | null = $state(null);
  let size = $state<'lg' | 'sm'>('lg');

  export const getRefs = () => ({ rootRef, actionRef, triggerRef });
  export const setSize = (value: 'lg' | 'sm') => (size = value);
</script>

<SplitButton bind:ref={rootRef} aria-label="Project actions" {size} variant="destructive">
  <SplitButtonAction bind:ref={actionRef}>Delete project</SplitButtonAction>
  <SplitButtonTrigger bind:ref={triggerRef} aria-label="More project actions" />
  <SplitButtonPositioner>
    <SplitButtonContent><MenuItem value="save-draft">Save as Draft</MenuItem></SplitButtonContent>
  </SplitButtonPositioner>
</SplitButton>