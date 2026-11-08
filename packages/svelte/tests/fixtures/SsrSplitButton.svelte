<script lang="ts">
  import { MenuItem } from '@/components/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@/components/split-button';
</script>

<SplitButton defaultOpen portalled={false} aria-label="Inline actions">
  <SplitButtonAction>
    {#snippet asChild(props)}<a {...props()} href="#docs">Docs</a>{/snippet}
  </SplitButtonAction>
  <SplitButtonTrigger aria-label="Inline options" />
  <SplitButtonPositioner>
    <SplitButtonContent><MenuItem value="draft">Save draft</MenuItem></SplitButtonContent>
  </SplitButtonPositioner>
</SplitButton>
<SplitButton aria-label="Closed actions">
  <SplitButtonAction>Save</SplitButtonAction>
  <SplitButtonTrigger aria-label="Closed options" />
  <SplitButtonPositioner>
    <SplitButtonContent><MenuItem value="draft">Save draft</MenuItem></SplitButtonContent>
  </SplitButtonPositioner>
</SplitButton>