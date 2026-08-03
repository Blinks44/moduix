import { Button } from '@moduix/react/button';
import { ArrowUpRight as ArrowUpRightIcon, Plus as PlusIcon, Star as StarIcon } from 'lucide-react';

const labels = {
  create: 'Create Item',
  docs: 'Open Button Docs',
  favorite: 'Favorites',
};

export default function ButtonIconsDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--moduix-spacing-3)',
      }}
    >
      <Button>
        <PlusIcon data-icon="inline-start" />
        {labels.create}
      </Button>
      <Button size="icon-md" variant="outline" aria-label={labels.favorite}>
        <StarIcon />
      </Button>
      <Button variant="link">
        {labels.docs}
        <ArrowUpRightIcon data-icon="inline-end" />
      </Button>
    </div>
  );
}