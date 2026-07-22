import { Separator } from '@moduix/react';

const labels = ['Before native rule', 'After native rule'];

export default function SeparatorAsChildDemo() {
  return (
    <div className="section">
      <span className="text">{labels[0]}</span>
      <Separator asChild>
        <hr className="nativeRule" />
      </Separator>
      <span className="text">{labels[1]}</span>
    </div>
  );
}