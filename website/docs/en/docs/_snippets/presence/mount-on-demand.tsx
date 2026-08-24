import { Presence } from '@ark-ui/react/presence';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

export default function PresenceMountOnDemandDemo() {
  const [present, setPresent] = useState(false);

  return (
    <>
      <style>{`
        @keyframes presence-panel-enter {
          from {
            opacity: 0;
            transform: translateY(0.75rem);
          }
        }

        @keyframes presence-panel-exit {
          to {
            opacity: 0;
            transform: translateY(0.75rem);
          }
        }

        .presence-panel[data-state='open'] {
          animation: presence-panel-enter 180ms ease-out;
        }

        .presence-panel[data-state='closed'] {
          animation: presence-panel-exit 140ms ease-in;
        }

        @media (prefers-reduced-motion: reduce) {
          .presence-panel[data-state] {
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
          {present ? 'Close update' : 'Open update'}
        </Button>

        <Presence
          className="presence-panel"
          lazyMount
          present={present}
          style={{ inlineSize: '100%' }}
          unmountOnExit
        >
          <Card style={{ inlineSize: '100%' }}>
            <Card.Header>
              <Card.Title>New workspace update</Card.Title>
              <Card.Description>The panel mounts only while it is needed.</Card.Description>
            </Card.Header>
            <Card.Body>
              Publish the update when the release notes are ready for your team.
            </Card.Body>
          </Card>
        </Presence>
      </Stack>
    </>
  );
}