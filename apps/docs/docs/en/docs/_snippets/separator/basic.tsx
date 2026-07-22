import { Separator } from '@moduix/react';

const sections = ['Account settings', 'Billing details'];

export default function SeparatorDemo() {
  return (
    <div className="card">
      <div className="stack">
        <span className="text">{sections[0]}</span>
        <Separator />
        <span className="text">{sections[1]}</span>
      </div>
    </div>
  );
}