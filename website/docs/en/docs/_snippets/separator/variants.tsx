import { Separator } from '@moduix/react/separator';

const variants = ['solid', 'dashed', 'dotted'] as const;

export default function SeparatorVariantsDemo() {
  return (
    <div style={{ display: 'grid', width: '100%', gap: 'var(--moduix-spacing-2)' }}>
      {variants.map((variant) => (
        <div
          key={variant}
          style={{
            display: 'grid',
            gridTemplateColumns: '4rem minmax(6rem, 1fr)',
            alignItems: 'center',
            gap: 'var(--moduix-spacing-3)',
          }}
        >
          <span>{variant}</span>
          <Separator variant={variant} />
        </div>
      ))}
    </div>
  );
}