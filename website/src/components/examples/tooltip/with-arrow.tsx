import { Tooltip } from '@moduix/react/tooltip';

export default function TooltipWithArrowDemo() {
  return (
    <Tooltip>
      <Tooltip.Trigger>Hover or focus</Tooltip.Trigger>
      <Tooltip.Body>
        <Tooltip.Arrow />
        Tooltip with arrow
      </Tooltip.Body>
    </Tooltip>
  );
}