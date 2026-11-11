<script lang="ts">
  import { InputGroup, InputGroupButton, InputGroupInput } from '@/components/input-group';

  let size = $state<'sm' | 'xl'>('sm');

  export const setSize = (value: 'sm' | 'xl') => (size = value);
</script>

<InputGroup {size} data-testid="responsive-group">
  <InputGroupInput aria-label="Workspace" />
  <InputGroupInput aria-label="Small workspace" size="xs" />
  <InputGroupButton>Copy</InputGroupButton>
</InputGroup>