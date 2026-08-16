import { Card } from '@moduix/react/card';
import type { CSSProperties } from 'react';

export default function CardAdvancedCustomizationDemo() {
  return (
    <Card
      style={
        {
          '--moduix-card-bg':
            'color-mix(in oklab, var(--moduix-color-card) 94%, var(--moduix-color-primary))',
          '--moduix-card-border-color':
            'color-mix(in oklab, var(--moduix-color-primary) 35%, var(--moduix-color-border))',
          '--moduix-card-radius': 'var(--moduix-radius-md)',
          '--moduix-card-shadow': 'var(--moduix-shadow-md)',
        } as CSSProperties
      }
    >
      <div
        style={{
          overflow: 'hidden',
          borderStartStartRadius: 'var(--moduix-card-radius)',
          borderStartEndRadius: 'var(--moduix-card-radius)',
        }}
      >
        <img
          style={{ aspectRatio: '16 / 9', display: 'block', width: '100%', objectFit: 'cover' }}
          src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1280&q=80"
          alt="A warehouse with neatly stacked delivery boxes."
        />
      </div>
      <Card.Header>
        <Card.Title asChild>
          <h2>System load</h2>
        </Card.Title>
        <Card.Description>Bypasses `Card.Media` to fully control media framing.</Card.Description>
      </Card.Header>
      <Card.Body>
        <div
          style={{
            display: 'grid',
            gap: 'var(--moduix-spacing-2)',
            color: 'var(--moduix-color-foreground)',
            fontSize: 'var(--moduix-text-2xl)',
            fontWeight: 'var(--moduix-weight-semibold)',
            lineHeight: 'var(--moduix-line-height-text-2xl)',
          }}
        >
          <span>64%</span>
          <div
            style={{
              height: '0.5rem',
              overflow: 'hidden',
              borderRadius: 'var(--moduix-radius-full)',
              backgroundColor: 'var(--moduix-color-muted)',
            }}
          >
            <div
              style={{
                width: '64%',
                height: '100%',
                borderRadius: 'inherit',
                backgroundColor: 'var(--moduix-color-primary)',
              }}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}