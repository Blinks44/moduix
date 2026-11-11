<script lang="ts">
  import { MenuItem } from '@/components/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@/components/split-button';

  let { click }: { click: () => void } = $props();
  let actionRef: Element | null = $state(null);
  let contentRef: Element | null = $state(null);

  export const getRefs = () => ({ actionRef, contentRef });
</script>

<SplitButton defaultOpen portalled={false}>
  <SplitButtonAction bind:ref={actionRef} data-probe="action" onclick={click}>
    {#snippet asChild(props)}
      <a {...props()} href="#docs">Docs</a>
    {/snippet}
  </SplitButtonAction>
  <SplitButtonTrigger />
  <SplitButtonPositioner>
    <SplitButtonContent bind:ref={contentRef} data-probe="content">
      {#snippet asChild(props)}
        <section {...props()}><MenuItem value="edit">Edit</MenuItem></section>
      {/snippet}
    </SplitButtonContent>
  </SplitButtonPositioner>
</SplitButton>