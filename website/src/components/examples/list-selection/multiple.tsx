import { createListCollection, useListSelection } from '@ark-ui/react/collection';
import { PreviewMeta } from '@/components/mdx/Components';

const teams = createListCollection({
  items: [
    { label: 'Platform', value: 'platform' },
    { label: 'Product', value: 'product' },
    { label: 'Design', value: 'design' },
  ],
});

export default function ListSelectionMultipleDemo() {
  const selection = useListSelection({
    collection: teams,
    selectionMode: 'multiple',
    initialSelectedValues: ['platform'],
  });

  function toggleAll() {
    if (selection.isAllSelected()) {
      selection.clear();
      return;
    }

    selection.setSelectedValues(teams.getValues());
  }

  return (
    <section aria-labelledby="teams-heading">
      <h3 id="teams-heading">Choose teams</h3>
      <ul>
        {teams.items.map((team) => (
          <li key={team.value}>
            <button
              type="button"
              aria-pressed={selection.isSelected(team.value)}
              onClick={() => selection.select(team.value)}
            >
              {team.label}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={toggleAll}>
        {selection.isAllSelected() ? 'Clear all' : 'Select all'}
      </button>
      <PreviewMeta>
        <output aria-live="polite">
          {selection.isEmpty
            ? 'No teams selected'
            : `Selected: ${teams.stringifyMany(selection.selectedValues)}`}
        </output>
      </PreviewMeta>
    </section>
  );
}