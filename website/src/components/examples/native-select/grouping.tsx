import { NativeSelect } from '@moduix/react/native-select';

const groups = [
  { label: 'Frontend', options: ['React', 'Solid', 'Vue'] },
  { label: 'Backend', options: ['Node.js', 'Go', 'Rust'] },
];

export default function GroupingNativeSelectDemo() {
  return (
    <NativeSelect aria-label="Technology">
      {groups.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </optgroup>
      ))}
    </NativeSelect>
  );
}