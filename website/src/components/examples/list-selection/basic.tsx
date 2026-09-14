import { createListCollection, useListSelection } from '@ark-ui/react/collection';

const teams = createListCollection({
  items: [
    { label: 'Platform', value: 'platform' },
    { label: 'Product', value: 'product' },
    { label: 'Design', value: 'design', disabled: true },
  ],
});

export default function ListSelectionDemo() {
  const selection = useListSelection({
    collection: teams,
    selectionMode: 'single',
    deselectable: true,
  });

  return (
    <section aria-labelledby="team-heading">
      <h3 id="team-heading">Choose a team</h3>
      <ul>
        {teams.items.map((team) => {
          const selected = selection.isSelected(team.value);

          return (
            <li key={team.value}>
              <button
                type="button"
                aria-pressed={selected}
                disabled={teams.getItemDisabled(team)}
                onClick={() => selection.select(team.value)}
              >
                {team.label}
              </button>
            </li>
          );
        })}
      </ul>
      <p aria-live="polite">
        {selection.firstSelectedValue
          ? `Selected: ${teams.stringify(selection.firstSelectedValue)}`
          : 'No team selected'}
      </p>
    </section>
  );
}