import { Card } from '@moduix/react';
import type { CSSProperties } from 'react';

export default function CardAdvancedCustomizationDemo() {
  return (
    <Card
      className="card"
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
      <div className="mediaShell">
        <img
          className="image"
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
        <div className="capacity">
          <span>64%</span>
          <div className="capacityBar">
            <div className="capacityFill" />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}