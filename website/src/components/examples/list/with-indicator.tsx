import { List, ListIndicator, ListItem } from '@moduix/react/list';
import { CircleCheck as CircleCheckIcon } from 'lucide-react';

const tasks = [
  'Tests pass in every adapter.',
  'The registry is rebuilt from the package sources.',
  'Long items wrap next to the indicator instead of under it.',
];

export default function ListWithIndicatorDemo() {
  return (
    <List marker="none">
      {tasks.map((task) => (
        <ListItem key={task}>
          <ListIndicator>
            <CircleCheckIcon />
          </ListIndicator>
          {task}
        </ListItem>
      ))}
    </List>
  );
}