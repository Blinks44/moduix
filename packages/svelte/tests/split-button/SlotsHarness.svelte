<script lang="ts">
  import { MenuItem } from '@/components/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@/components/split-button';

  let { actions }: { actions: string[] } = $props();
</script>

<SplitButton
  aria-labelledby="document-actions-label"
  portalled={false}
  onSelect={(details) => actions.push(details.value)}
>
  <span id="document-actions-label">Document actions</span>
  <SplitButtonAction onclick={() => actions.push('save')}>Save</SplitButtonAction>
  <SplitButtonTrigger>Options</SplitButtonTrigger>
  <SplitButtonPositioner>
    <SplitButtonContent><MenuItem value="duplicate">Duplicate</MenuItem></SplitButtonContent>
  </SplitButtonPositioner>
</SplitButton>