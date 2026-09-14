import { FocusTrap } from '@ark-ui/react/focus-trap';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import { useRef, useState } from 'react';
import styles from './focus-trap-basic.module.css';

export default function FocusTrapBasic() {
  const [isReviewing, setIsReviewing] = useState(false);
  const detailsButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Stack align="center" className={styles.root} gap={4}>
      <FocusTrap
        className={styles.trap}
        disabled={!isReviewing}
        initialFocus={() => detailsButtonRef.current}
        onDeactivate={() => setIsReviewing(false)}
      >
        <Card>
          <Card.Header>
            <Card.Title>Review mode</Card.Title>
          </Card.Header>
          <Card.Body>When active, Tab and Shift + Tab stay inside these actions.</Card.Body>
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

      <Stack align="center" direction="row" gap={2}>
        <output aria-live="polite">Focus trap: {isReviewing ? 'active' : 'inactive'}</output>
        <Button disabled={isReviewing} size="sm" type="button" onClick={() => setIsReviewing(true)}>
          Start review
        </Button>
      </Stack>
    </Stack>
  );
}