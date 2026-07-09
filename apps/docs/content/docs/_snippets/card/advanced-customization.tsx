//#region demo
import type { CSSProperties } from 'react';
import { Card } from '@moduix/react';

export function CardAdvancedCustomizationDemo() {
  return (
    <Card
      className="card"
      style={
        {
          '--card-bg': 'color-mix(in oklab, var(--color-card) 94%, var(--color-primary))',
          '--card-border-color':
            'color-mix(in oklab, var(--color-primary) 35%, var(--color-border))',
          '--card-radius': 'var(--radius-md)',
          '--card-shadow': 'var(--shadow-md)',
        } as CSSProperties
      }
    >
      <div className="mediaShell">
        <img
          className="image"
          src="/warehouse.jpg"
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
//#endregion