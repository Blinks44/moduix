import { Separator } from '@moduix/react/separator';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;

export default function SeparatorSizesDemo() {
  return (
    <div style={{ display: 'grid', width: '100%', gap: 'var(--moduix-spacing-2)' }}>
      {sizes.map((size) => (
        <div
          key={size}
          style={{
            display: 'grid',
            gridTemplateColumns: '4rem minmax(6rem, 1fr)',
            alignItems: 'center',
            gap: 'var(--moduix-spacing-3)',
          }}
        >
          <span>{size}</span>
          <Separator size={size} />
        </div>
      ))}
    </div>
  );
}