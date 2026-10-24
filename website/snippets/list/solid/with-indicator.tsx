import { List, ListIndicator, ListItem } from '@moduix/solid/list';
import { CircleCheck as CircleCheckIcon } from 'lucide-solid';
import { For } from 'solid-js';

const tasks = [
  'Tests pass in every adapter.',
  'The registry is rebuilt from the package sources.',
  'Long items wrap next to the indicator instead of under it.',
];

export default function ListWithIndicatorDemo() {
  return (
    <List marker="none">
      <For each={tasks}>
        {(task) => (
          <ListItem>
            <ListIndicator>
              <CircleCheckIcon />
            </ListIndicator>
            {task}
          </ListItem>
        )}
      </For>
    </List>
  );
}