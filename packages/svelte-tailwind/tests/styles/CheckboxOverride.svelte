<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@/components/checkbox';
</script>

<Checkbox class="gap-4 text-primary" data-testid="root">
  <CheckboxControl class="rounded-md bg-muted p-1" />
  <CheckboxLabel>Notifications</CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>