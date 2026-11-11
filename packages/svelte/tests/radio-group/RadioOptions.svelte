<script lang="ts">
  import { RadioGroupOption } from '@/components/radio-group';

  const frameworks = ['React', 'Solid', 'Vue'];
</script>

{#each frameworks as framework (framework)}
  <RadioGroupOption value={framework}>{framework}</RadioGroupOption>
{/each}