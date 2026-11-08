<script lang="ts">
  import { MenuItem } from '@/components/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@/components/split-button';

  let { submit }: { submit: () => void } = $props();
</script>

<form
  onsubmit={(event) => {
    event.preventDefault();
    submit();
  }}
>
  <SplitButton portalled={false}>
    <SplitButtonAction type="submit" name="intent" value="save">Save</SplitButtonAction>
    <SplitButtonTrigger />
    <SplitButtonPositioner>
      <SplitButtonContent><MenuItem value="save-draft">Save as Draft</MenuItem></SplitButtonContent>
    </SplitButtonPositioner>
  </SplitButton>
</form>