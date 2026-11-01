import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import { ArrowUpRight as ArrowUpRightIcon, Plus as PlusIcon, Star as StarIcon } from 'lucide-react';

const labels = {
  create: 'Create Item',
  docs: 'Open Button Docs',
  favorite: 'Favorites',
};

export default function ButtonIconsDemo() {
  return (
    <Stack direction="row" align="center" wrap="wrap" gap="3">
      <Button>
        <PlusIcon />
        {labels.create}
      </Button>
      <Button size="icon-md" variant="outline" aria-label={labels.favorite}>
        <StarIcon />
      </Button>
      <Button variant="link">
        {labels.docs}
        <ArrowUpRightIcon />
      </Button>
    </Stack>
  );
}