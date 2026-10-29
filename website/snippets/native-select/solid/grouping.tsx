import { NativeSelect } from '@moduix/solid/native-select';
import { For } from 'solid-js';

const groups = [
  { label: 'Frontend', options: ['React', 'Solid', 'Vue'] },
  { label: 'Backend', options: ['Node.js', 'Go', 'Rust'] },
];

export default function GroupingNativeSelectDemo() {
  return (
    <NativeSelect aria-label="Technology">
      <For each={groups}>
        {(group) => (
          <optgroup label={group.label}>
            <For each={group.options}>{(option) => <option value={option}>{option}</option>}</For>
          </optgroup>
        )}
      </For>
    </NativeSelect>
  );
}