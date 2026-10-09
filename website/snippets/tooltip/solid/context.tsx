import {
  Tooltip,
  useTooltipContext,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from '@moduix/solid/tooltip';

function TooltipStateContent() {
  const tooltip = useTooltipContext();
  return <TooltipContent>Open from context: {tooltip().open.toString()}</TooltipContent>;
}

export default function ContextTooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger>Context tooltip</TooltipTrigger>
      <TooltipPositioner>
        <TooltipStateContent />
      </TooltipPositioner>
    </Tooltip>
  );
}