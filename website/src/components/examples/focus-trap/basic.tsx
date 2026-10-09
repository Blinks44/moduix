import { FocusTrap } from '@ark-ui/react/focus-trap';
import { Button } from '@moduix/react/button';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import { useRef, useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '../../../../snippets/focus-trap/css-modules/focus-trap-basic.module.css';

export default function FocusTrapBasicPreview() {
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
          <CardHeader>
            <CardTitle>Review mode</CardTitle>
          </CardHeader>
          <CardBody>When active, Tab and Shift + Tab stay inside these actions.</CardBody>
          <CardFooter>
            <Button ref={detailsButtonRef} size="sm" type="button" variant="outline">
              Review details
            </Button>
            <Button size="sm" type="button" onClick={() => setIsReviewing(false)}>
              Finish review
            </Button>
          </CardFooter>
        </Card>
      </FocusTrap>

      <PreviewMeta>
        <output aria-live="polite">Focus trap: {isReviewing ? 'active' : 'inactive'}</output>
        <Button disabled={isReviewing} size="sm" type="button" onClick={() => setIsReviewing(true)}>
          Start review
        </Button>
      </PreviewMeta>
    </Stack>
  );
}