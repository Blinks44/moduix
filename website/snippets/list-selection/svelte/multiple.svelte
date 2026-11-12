<script lang="ts">
  import { createListCollection, useListSelection } from '@ark-ui/svelte/collection';

  const teams = createListCollection({
    items: [
      { label: 'Platform', value: 'platform' },
      { label: 'Product', value: 'product' },
      { label: 'Design', value: 'design' },
    ],
  });
  const selection = useListSelection({
    collection: teams,
    selectionMode: 'multiple',
    initialSelectedValues: ['platform'],
  });
  const toggleAll = () => {
    if (selection.isAllSelected()) selection.clear();
    else selection.setSelectedValues(teams.getValues());
  };
</script>

<section aria-labelledby="teams-heading">
  <h3 id="teams-heading">Choose teams</h3>
  <ul>
    {#each teams.items as team (team.value)}
      <li>
        <button
          type="button"
          aria-pressed={selection.isSelected(team.value)}
          onclick={() => selection.select(team.value)}
        >
          {team.label}
        </button>
      </li>
    {/each}
  </ul>
  <button type="button" onclick={toggleAll}>
    {selection.isAllSelected() ? 'Clear all' : 'Select all'}
  </button>
  <div data-preview-meta>
    <output aria-live="polite">
      {selection.isEmpty()
        ? 'No teams selected'
        : `Selected: ${teams.stringifyMany(selection.selectedValues())}`}
    </output>
  </div>
</section>