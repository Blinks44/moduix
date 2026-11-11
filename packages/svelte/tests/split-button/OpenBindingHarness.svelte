<script lang="ts">
  import { MenuItem } from '@/components/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@/components/split-button';

  let open = $state(false);

  export const getOpen = () => open;
</script>

<SplitButton bind:open portalled={false} size="lg" variant="destructive">
  <SplitButtonAction size="xs" variant="outline">Save</SplitButtonAction>
  <SplitButtonTrigger />
  <SplitButtonPositioner>
    <SplitButtonContent><MenuItem value="save-draft">Save as Draft</MenuItem></SplitButtonContent>
  </SplitButtonPositioner>
</SplitButton>