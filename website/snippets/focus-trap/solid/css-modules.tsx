import { FocusTrap } from '@ark-ui/solid/focus-trap';
import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';
import styles from '../css-modules/focus-trap-basic.module.css';

export default function FocusTrapBasic() {
  const [isReviewing, setIsReviewing] = createSignal(false);
  let detailsButtonRef: HTMLButtonElement | undefined;

  return (
    <Stack align="center" class={styles.root} gap={4}>
      <FocusTrap
        class={styles.trap}
        disabled={!isReviewing()}
        initialFocus={() => detailsButtonRef}
        onDeactivate={() => setIsReviewing(false)}
      >
        <Card>
          <Card.Header>
            <Card.Title>Review mode</Card.Title>
          </Card.Header>
          <Card.Body>When active, Tab and Shift + Tab stay inside these actions.</Card.Body>
          <Card.Footer>
            <Button
              ref={(element) => (detailsButtonRef = element)}
              size="sm"
              type="button"
              variant="outline"
            >
              Review details
            </Button>
            <Button size="sm" type="button" onClick={() => setIsReviewing(false)}>
              Finish review
            </Button>
          </Card.Footer>
        </Card>
      </FocusTrap>

      <Stack align="center" direction="row" gap={2}>
        <output aria-live="polite">Focus trap: {isReviewing() ? 'active' : 'inactive'}</output>
        <Button
          disabled={isReviewing()}
          size="sm"
          type="button"
          onClick={() => setIsReviewing(true)}
        >
          Start review
        </Button>
      </Stack>
    </Stack>
  );
}