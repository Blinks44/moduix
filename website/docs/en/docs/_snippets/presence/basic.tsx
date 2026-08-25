import { Presence } from '@ark-ui/react/presence';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

export default function PresenceBasicDemo() {
  const [present, setPresent] = useState(true);

  return (
    <>
      <style>{`
        @keyframes presence-basic-enter {
          from {
            opacity: 0;
            transform: translateY(0.5rem) scale(0.98);
          }
        }

        @keyframes presence-basic-exit {
          to {
            opacity: 0;
            transform: translateY(-0.5rem) scale(0.98);
          }
        }

        .presence-basic-panel[data-state='open'] {
          animation: presence-basic-enter 180ms ease-out;
        }

        .presence-basic-panel[data-state='closed'] {
          animation: presence-basic-exit 140ms ease-in;
        }

        @media (prefers-reduced-motion: reduce) {
          .presence-basic-panel[data-state] {
            animation-duration: 1ms;
          }
        }
      `}</style>

      <Stack
        align="center"
        gap={6}
        style={{ inlineSize: '100%', maxInlineSize: '26rem', marginInline: 'auto' }}
      >
        <Button
          size="sm"
          type="button"
          variant="outline"
          onClick={() => setPresent((value) => !value)}
        >
          {present ? 'Hide activity' : 'Show activity'}
        </Button>

        <Presence
          className="presence-basic-panel"
          present={present}
          style={{ inlineSize: '100%' }}
          unmountOnExit
        >
          <Card style={{ inlineSize: '100%' }}>
            <Card.Header>
              <Card.Title>Import complete</Card.Title>
              <Card.Description>24 contacts are ready to review.</Card.Description>
            </Card.Header>
            <Card.Body>
              Review their fields and invite them to the workspace when you are ready.
            </Card.Body>
          </Card>
        </Presence>
      </Stack>
    </>
  );
}