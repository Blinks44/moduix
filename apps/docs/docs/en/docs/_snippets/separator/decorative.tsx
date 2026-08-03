import { Separator } from '@moduix/react/separator';

const sections = ['Personal details', 'Notifications'];

export default function DecorativeSeparatorDemo() {
  return (
    <div
      style={{
        width: '100%',
        padding: 'var(--moduix-spacing-4)',
        border: 'var(--moduix-border-width-sm) solid var(--moduix-color-border)',
        borderRadius: 'var(--moduix-radius-md)',
        backgroundColor: 'var(--moduix-color-background)',
      }}
    >
      <div style={{ display: 'grid', gap: 'var(--moduix-spacing-4)' }}>
        <span>{sections[0]}</span>
        <Separator role="presentation" />
        <span>{sections[1]}</span>
      </div>
    </div>
  );
}