import { Kbd } from '@moduix/solid/kbd';

const key = {
  label: 'Esc',
  title: 'Escape',
};

export default function KbdAsChildDemo() {
  return (
    <Kbd
      asChild={(props) => (
        <kbd {...props()} title={key.title}>
          {key.label}
        </kbd>
      )}
    />
  );
}