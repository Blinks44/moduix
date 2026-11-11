<script lang="ts">
  import { CircleCheck as CircleCheckIcon } from '@lucide/svelte';
  import { List, ListIndicator, ListItem } from '@moduix/svelte/list';

  const tasks = [
    'Tests pass in every adapter.',
    'The registry is rebuilt from the package sources.',
    'Long items wrap next to the indicator instead of under it.',
  ];
</script>

<List marker="none">
  {#each tasks as task (task)}
    <ListItem>
      <ListIndicator><CircleCheckIcon /></ListIndicator>{task}
    </ListItem>
  {/each}
</List>