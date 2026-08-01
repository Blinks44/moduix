import { Tooltip } from '@moduix/react/tooltip';

export default function WithinFixedTooltipDemo() {
  return (
    <div
      style={{
        inlineSize: '100%',
        blockSize: '12rem',
        overflow: 'auto',
        border: 'var(--moduix-border-width-sm) solid var(--moduix-color-border)',
        borderRadius: 'var(--moduix-radius-lg)',
        background: 'var(--moduix-color-muted)',
      }}
    >
      <div style={{ minBlockSize: '24rem', padding: 'var(--moduix-spacing-4)' }}>
        <div
          style={{
            position: 'sticky',
            top: 'var(--moduix-spacing-4)',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Tooltip
            closeOnScroll={false}
            positioning={{
              strategy: 'fixed',
            }}
          >
            <Tooltip.Trigger>Focus, then scroll</Tooltip.Trigger>
            <Tooltip.Body>Stays anchored while this panel scrolls.</Tooltip.Body>
          </Tooltip>
        </div>
        <p
          style={{
            marginBlockStart: '14rem',
            color: 'var(--moduix-color-muted-foreground)',
            textAlign: 'center',
          }}
        >
          End of scroll area
        </p>
      </div>
    </div>
  );
}