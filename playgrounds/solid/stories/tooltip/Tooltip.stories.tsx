import type { JSX } from 'solid-js';
import { For, createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import {
  Tooltip,
  useTooltip,
  useTooltipContext,
  TooltipArrow,
  TooltipBody,
  TooltipContent,
  TooltipDisabledTrigger,
  TooltipPositioner,
  TooltipRootProvider,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip';
import { PlusIcon } from '@/internal/icons/ui/Icons';
import storyStyles from './Tooltip.stories.module.css';

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement>;
type IconComponent = (props: IconProps) => JSX.Element;

const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

function ShareIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...accessibilityProps}
      {...props}
    >
      <path d="M12 2v13" />
      <path d="m16 6-4-4-4 4" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    </svg>
  );
}

function InfoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...accessibilityProps} {...props}>
      <path
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function BellIcon(props: IconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" {...accessibilityProps} {...props}>
      <path d="M8 1a1 1 0 0 0-1 1v1.14A4 4 0 0 0 4 7v3.98s-.02.28-.15.54C3.72 11.78 3.56 12 3 12v1h10v-1c-.6 0-.75-.22-.87-.47-.13-.25-.13-.52-.13-.53V7a4 4 0 0 0-3-3.86V2a1 1 0 0 0-1-1Zm0 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </svg>
  );
}

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

const tooltipPlacements = ['top', 'right', 'bottom', 'left'] as const;
type TooltipPlacement = (typeof tooltipPlacements)[number];

const tooltipTools: Array<{
  id: string;
  label: string;
  shortcut: string;
  icon: IconComponent;
}> = [
  { id: 'create', label: 'Create', shortcut: 'Ctrl+N', icon: PlusIcon },
  { id: 'share', label: 'Share', shortcut: 'Ctrl+S', icon: ShareIcon },
  { id: 'details', label: 'Details', shortcut: 'Ctrl+I', icon: InfoIcon },
];

export const Default: Story = {
  name: 'Default',
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger
          aria-label="Notifications"
          asChild={(triggerProps) => (
            <Button {...triggerProps()}>
              <span class={storyStyles.triggerContent}>
                <BellIcon class={storyStyles.icon} />
                Notifications
              </span>
            </Button>
          )}
        />
        <TooltipBody>Notifications</TooltipBody>
      </Tooltip>
    );
  },
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger aria-label="Tooltip with arrow">Hover or focus</TooltipTrigger>
        <TooltipBody>
          <TooltipArrow />
          Tooltip with arrow
        </TooltipBody>
      </Tooltip>
    );
  },
};

export const Delay: Story = {
  render: () => {
    return (
      <Tooltip closeDelay={0} openDelay={0}>
        <TooltipTrigger>Immediate tooltip</TooltipTrigger>
        <TooltipBody>No open or close delay</TooltipBody>
      </Tooltip>
    );
  },
};

export const DisabledTrigger: Story = {
  name: 'Disabled Trigger',
  render: () => {
    return (
      <Tooltip>
        <TooltipDisabledTrigger aria-label="Create project is unavailable">
          <Button disabled>Create project</Button>
        </TooltipDisabledTrigger>
        <TooltipBody>Projects are unavailable while offline.</TooltipBody>
      </Tooltip>
    );
  },
};

export const Positioning: Story = {
  render: () => {
    const [placement, setPlacement] = createSignal<TooltipPlacement>('top');

    return (
      <div class={storyStyles.stack}>
        <div class={storyStyles.sideButtons}>
          <For each={tooltipPlacements}>
            {(item) => (
              <button
                type="button"
                class={storyStyles.sideButton}
                data-active={item === placement() ? '' : undefined}
                onClick={() => setPlacement(item)}
              >
                {item}
              </button>
            )}
          </For>
        </div>

        <Tooltip positioning={{ placement: placement(), offset: { mainAxis: 12 } }}>
          <TooltipTrigger
            aria-label={`Tooltip placement: ${placement()}`}
            asChild={(triggerProps) => <Button {...triggerProps()}>Hover or focus</Button>}
          />
          <TooltipBody>Placement: {placement()}</TooltipBody>
        </Tooltip>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = createSignal(false);

    return (
      <div class={storyStyles.stack}>
        <Button variant="outline" onClick={() => setOpen((value) => !value)}>
          Toggle
        </Button>
        <Tooltip open={open()} onOpenChange={(details) => setOpen(details.open)}>
          <TooltipTrigger>Controlled tooltip</TooltipTrigger>
          <TooltipBody>Open: {String(open())}</TooltipBody>
        </Tooltip>
      </div>
    );
  },
};

export const Context: Story = {
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger>Context tooltip</TooltipTrigger>
        <TooltipPositioner>
          <TooltipStateContent />
        </TooltipPositioner>
      </Tooltip>
    );
  },
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: () => {
    const tooltip = useTooltip();

    return (
      <div class={storyStyles.stack}>
        <output class={storyStyles.output}>Open: {String(tooltip().open)}</output>
        <TooltipRootProvider value={tooltip}>
          <TooltipTrigger>RootProvider tooltip</TooltipTrigger>
          <TooltipBody>State is owned outside the tree.</TooltipBody>
        </TooltipRootProvider>
      </div>
    );
  },
};

export const MultipleTriggers: Story = {
  name: 'Multiple Triggers',
  render: () => {
    const [activeTool, setActiveTool] = createSignal<(typeof tooltipTools)[number] | null>(null);

    return (
      <Tooltip
        onTriggerValueChange={(details) => {
          setActiveTool(tooltipTools.find((tool) => tool.id === details.value) ?? null);
        }}
      >
        <div class={storyStyles.toolbar}>
          <For each={tooltipTools}>
            {(tool) => (
              <TooltipTrigger
                value={tool.id}
                aria-label={tool.label}
                asChild={(triggerProps) => (
                  <Button {...triggerProps()} variant="ghost" size="icon-md">
                    {tool.icon({ class: storyStyles.icon })}
                  </Button>
                )}
              />
            )}
          </For>
        </div>
        <TooltipBody>
          {activeTool() ? (
            <>
              {activeTool()!.label}{' '}
              <span class={storyStyles.shortcut}>{activeTool()!.shortcut}</span>
            </>
          ) : null}
        </TooltipBody>
      </Tooltip>
    );
  },
};

export const WithinFixedContainer: Story = {
  name: 'Within Fixed Container',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    return (
      <div class={storyStyles.fixedContainer}>
        <Tooltip positioning={{ strategy: 'fixed' }}>
          <TooltipTrigger>Fixed strategy</TooltipTrigger>
          <TooltipBody>Positioned from a fixed container.</TooltipBody>
        </Tooltip>
      </div>
    );
  },
};

export const CustomComposition: Story = {
  name: 'Custom Composition',
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger aria-label="Custom styled tooltip" class={storyStyles.customTrigger}>
          Custom style
        </TooltipTrigger>
        <TooltipPositioner class={storyStyles.customPositioner}>
          <TooltipContent class={storyStyles.customContent}>
            Styled through explicit Ark parts
          </TooltipContent>
        </TooltipPositioner>
      </Tooltip>
    );
  },
};

function TooltipStateContent() {
  const tooltip = useTooltipContext();

  return <TooltipContent>Open from context: {tooltip().open.toString()}</TooltipContent>;
}