import { Tooltip, useTooltip } from '@moduix/solid/tooltip';

export default function RootProviderTooltipDemo() {
  const tooltip = useTooltip();

  return (
    <>
      <Tooltip.RootProvider value={tooltip}>
        <Tooltip.Trigger>RootProvider tooltip</Tooltip.Trigger>
        <Tooltip.Body>State is owned outside the tree.</Tooltip.Body>
      </Tooltip.RootProvider>
      <output>Open: {String(tooltip().open)}</output>
    </>
  );
}