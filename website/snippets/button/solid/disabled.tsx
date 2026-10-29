import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';

const labels = {
  button: 'Disabled',
  link: 'Disabled Link',
};

export default function ButtonDisabledDemo() {
  return (
    <Stack direction="row" align="center" wrap="wrap" gap="3">
      <Button disabled>{labels.button}</Button>
      <Button
        asChild={(props) => (
          <a {...props()} href="#button">
            {labels.link}
          </a>
        )}
        disabled
        variant="outline"
      />
    </Stack>
  );
}