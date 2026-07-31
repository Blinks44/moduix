import { Separator } from '@moduix/react/separator';

const labels = ['Before native rule', 'After native rule'];

export default function SeparatorAsChildDemo() {
  return (
    <div style={{ display: 'grid', width: '100%', gap: 'var(--moduix-spacing-2)' }}>
      <span>{labels[0]}</span>
      <Separator asChild>
        <hr />
      </Separator>
      <span>{labels[1]}</span>
    </div>
  );
}