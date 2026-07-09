//#region demo
import { Button, PlusIcon } from '@moduix/react';
import { ArrowUpRight as ArrowUpRightIcon, Star as StarIcon } from 'lucide-react';

const labels = {
  create: 'Create Item',
  docs: 'Open Button Docs',
  favorite: 'Favorites',
};

export function ButtonIconsDemo() {
  return (
    <div className="button-demo-row">
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
//#endregion