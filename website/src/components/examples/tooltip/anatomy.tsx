import { Button } from '@moduix/react/button';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from '@moduix/react/tooltip';

// Anatomy scene: the tooltip stays open and inline so every part can be outlined.
export default function TooltipAnatomy() {
  return (
    <div
      style={{
        minHeight: 140,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Tooltip open portalled={false}>
        <TooltipTrigger asChild>
          <Button variant="outline">Notifications</Button>
        </TooltipTrigger>
        <TooltipPositioner>
          <TooltipContent>
            <TooltipArrow />
            Three unread messages
          </TooltipContent>
        </TooltipPositioner>
      </Tooltip>
    </div>
  );
}