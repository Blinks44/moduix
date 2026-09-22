import {
  useTooltip,
  TooltipBody,
  TooltipRootProvider,
  TooltipTrigger,
} from '@moduix/solid/tooltip';

export default function RootProviderTooltipDemo() {
  const tooltip = useTooltip();

  return (
    <>
      <TooltipRootProvider value={tooltip}>
        <TooltipTrigger>RootProvider tooltip</TooltipTrigger>
        <TooltipBody>State is owned outside the tree.</TooltipBody>
      </TooltipRootProvider>
      <output>Open: {String(tooltip().open)}</output>
    </>
  );
}
