import { Spinner } from '@moduix/react/spinner';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SpinnerSizesDemo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--moduix-spacing-4)' }}>
      {sizes.map((size) => (
        <Spinner key={size} decorative size={size} />
      ))}
    </div>
  );
}