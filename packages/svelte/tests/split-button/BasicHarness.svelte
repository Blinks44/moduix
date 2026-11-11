<script lang="ts">
  import { MenuItem } from '@/components/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
    type SplitButtonActionProps,
    type SplitButtonRootProps,
    type SplitButtonTriggerProps,
  } from '@/components/split-button';

  let {
    action = {},
    actionLabel = 'Save',
    content = {},
    popup = true,
    positioner = {},
    root = {},
    trigger = {},
  }: {
    action?: Partial<SplitButtonActionProps>;
    actionLabel?: string;
    content?: Record<string, unknown>;
    popup?: boolean;
    positioner?: Record<string, unknown>;
    root?: Partial<SplitButtonRootProps>;
    trigger?: Partial<SplitButtonTriggerProps>;
  } = $props();
</script>

<SplitButton {...root}>
  <SplitButtonAction {...action}>{actionLabel}</SplitButtonAction>
  <SplitButtonTrigger {...trigger} />
  {#if popup}
    <SplitButtonPositioner {...positioner}>
      <SplitButtonContent {...content}>
        <MenuItem value="save-draft">Save as Draft</MenuItem>
      </SplitButtonContent>
    </SplitButtonPositioner>
  {/if}
</SplitButton>