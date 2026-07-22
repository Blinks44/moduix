import { Kbd } from '@moduix/react';

const keys = ['Esc', 'Ctrl', '/'];

export default function KbdDenseDemo() {
  return (
    <div className="kbd-demo-row">
      {keys.map((key) => (
        <Kbd key={key} className="kbd-demo-dense">
          {key}
        </Kbd>
      ))}
    </div>
  );
}