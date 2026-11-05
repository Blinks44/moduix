<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@/components/checkbox';
</script>

<Checkbox>
  {#snippet asChild(props)}
    <label {...props()} aria-label="Accept terms">
      <CheckboxControl />
      <CheckboxHiddenInput />
      <CheckboxLabel>Accept terms</CheckboxLabel>
    </label>
  {/snippet}
</Checkbox>