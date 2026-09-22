import { Button } from '@moduix/react/button';
import {
  Popover,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  usePopoverContext,
} from '@moduix/react/popover';
import { PreviewMeta } from '@/components/mdx/Components';

function PopoverState() {
  const popover = usePopoverContext();
  return (
    <PreviewMeta>
      <output>Open: {popover.open ? 'yes' : 'no'}</output>
    </PreviewMeta>
  );
}

export default function PopoverContextDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverState />
      <PopoverTrigger asChild>
        <Button>Open context example</Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Context state</PopoverTitle>
            <PopoverDescription>
              Read state from a descendant without passing props through the popup tree.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <PopoverCloseTrigger>Close</PopoverCloseTrigger>
          </PopoverFooter>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}