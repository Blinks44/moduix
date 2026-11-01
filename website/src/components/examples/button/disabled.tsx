import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';

const labels = {
  button: 'Disabled',
  link: 'Disabled Link',
};

export default function ButtonDisabledDemo() {
  return (
    <Stack direction="row" align="center" wrap="wrap" gap="3">
      <Button disabled>{labels.button}</Button>
      <Button asChild disabled variant="outline">
        <a href="#button">{labels.link}</a>
      </Button>
    </Stack>
  );
}