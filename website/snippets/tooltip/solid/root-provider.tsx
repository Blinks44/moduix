import {
  useTooltip,
  TooltipPanel,
  TooltipRootProvider,
  TooltipTrigger,
} from '@moduix/solid/tooltip';

export default function RootProviderTooltipDemo() {
  const tooltip = useTooltip();

  return (
    <>
      <TooltipRootProvider value={tooltip}>
        <TooltipTrigger>RootProvider tooltip</TooltipTrigger>
        <TooltipPanel>State is owned outside the tree.</TooltipPanel>
      </TooltipRootProvider>
      <div data-preview-meta>
        <output>Open: {String(tooltip().open)}</output>
      </div>
    </>
  );
}