import { Kbd } from '@moduix/react';

const key = {
  label: 'Esc',
  title: 'Escape',
};

export default function KbdAsChildDemo() {
  return (
    <Kbd asChild>
      <kbd title={key.title}>{key.label}</kbd>
    </Kbd>
  );
}