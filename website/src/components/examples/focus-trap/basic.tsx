import { FocusTrap } from '@ark-ui/react/focus-trap';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import { useRef, useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function FocusTrapBasicDemo() {
  const [isReviewing, setIsReviewing] = useState(false);
  const detailsButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Stack
      align="center"
      gap={4}
      style={{ inlineSize: '100%', maxInlineSize: '26rem', marginInline: 'auto' }}
    >
      <FocusTrap
        disabled={!isReviewing}
        initialFocus={() => detailsButtonRef.current}
        style={{ inlineSize: '100%' }}
      >
        <Card>
          <Card.Header>
            <Card.Title>Review mode</Card.Title>
          </Card.Header>
          <Card.Body>
            When active, use Tab and Shift + Tab to move only between these actions.
          </Card.Body>
          <Card.Footer>
            <Button ref={detailsButtonRef} size="sm" type="button" variant="outline">
              Review details
            </Button>
            <Button size="sm" type="button" onClick={() => setIsReviewing(false)}>
              Finish review
            </Button>
          </Card.Footer>
        </Card>
      </FocusTrap>

      <PreviewMeta>
        <output>Focus trap: {isReviewing ? 'active' : 'inactive'}</output>
        <Button disabled={isReviewing} size="sm" type="button" onClick={() => setIsReviewing(true)}>
          Start review
        </Button>
      </PreviewMeta>
    </Stack>
  );
}