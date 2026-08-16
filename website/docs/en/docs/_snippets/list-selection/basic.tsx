import { createListCollection, useListSelection } from '@ark-ui/react/collection';
import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';

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
      <Stack asChild direction="row" gap={8} justify="center" wrap="wrap">
        <ul>
          {teams.items.map((team) => {
            const selected = selection.isSelected(team.value);

            return (
              <li key={team.value}>
                <Button
                  type="button"
                  variant={selected ? 'secondary' : 'outline'}
                  aria-pressed={selected}
                  disabled={teams.getItemDisabled(team)}
                  onClick={() => selection.select(team.value)}
                >
                  {team.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </Stack>
      <p aria-live="polite">
        {selection.firstSelectedValue
          ? `Selected: ${teams.stringify(selection.firstSelectedValue)}`
          : 'No team selected'}
      </p>
    </section>
  );
}