import { createListCollection, useListSelection } from '@ark-ui/solid/collection';
import { For } from 'solid-js';

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

  const selectedLabel = () => {
    const value = selection.firstSelectedValue();
    return value ? `Selected: ${teams.stringify(value)}` : 'No team selected';
  };

  return (
    <section aria-labelledby="team-heading">
      <h3 id="team-heading">Choose a team</h3>
      <ul>
        <For each={teams.items}>
          {(team) => (
            <li>
              <button
                type="button"
                aria-pressed={selection.isSelected(team.value)}
                disabled={teams.getItemDisabled(team)}
                onClick={() => selection.select(team.value)}
              >
                {team.label}
              </button>
            </li>
          )}
        </For>
      </ul>
      <p aria-live="polite">{selectedLabel()}</p>
    </section>
  );
}