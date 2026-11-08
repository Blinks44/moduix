<script lang="ts">
  import { createListCollection, useListSelection } from '@ark-ui/svelte/collection';

  const teams = createListCollection({
    items: [
      { label: 'Platform', value: 'platform' },
      { label: 'Product', value: 'product' },
      { label: 'Design', value: 'design', disabled: true },
    ],
  });
  const selection = useListSelection({
    collection: teams,
    selectionMode: 'single',
    deselectable: true,
  });
  const selectedLabel = $derived.by(() => {
    const value = selection.firstSelectedValue();
    return value ? `Selected: ${teams.stringify(value)}` : 'No team selected';
  });
</script>

<section aria-labelledby="team-heading">
  <h3 id="team-heading">Choose a team</h3>
  <ul>
    {#each teams.items as team (team.value)}
      <li>
        <button
          type="button"
          aria-pressed={selection.isSelected(team.value)}
          disabled={teams.getItemDisabled(team)}
          onclick={() => selection.select(team.value)}
        >
          {team.label}
        </button>
      </li>
    {/each}
  </ul>
  <p aria-live="polite">{selectedLabel}</p>
</section>