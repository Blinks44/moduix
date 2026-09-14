import type { JSX } from 'solid-js';
import { For, createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { Tooltip, useTooltip, useTooltipContext } from '@/components/tooltip/Tooltip';
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
        <Tooltip.Trigger
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
        <Tooltip.Body>Notifications</Tooltip.Body>
      </Tooltip>
    );
  },
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: () => {
    return (
      <Tooltip>
        <Tooltip.Trigger aria-label="Tooltip with arrow">Hover or focus</Tooltip.Trigger>
        <Tooltip.Body>
          <Tooltip.Arrow />
          Tooltip with arrow
        </Tooltip.Body>
      </Tooltip>
    );
  },
};

export const Delay: Story = {
  render: () => {
    return (
      <Tooltip closeDelay={0} openDelay={0}>
        <Tooltip.Trigger>Immediate tooltip</Tooltip.Trigger>
        <Tooltip.Body>No open or close delay</Tooltip.Body>
      </Tooltip>
    );
  },
};

export const DisabledTrigger: Story = {
  name: 'Disabled Trigger',
  render: () => {
    return (
      <Tooltip>
        <Tooltip.DisabledTrigger aria-label="Create project is unavailable">
          <Button disabled>Create project</Button>
        </Tooltip.DisabledTrigger>
        <Tooltip.Body>Projects are unavailable while offline.</Tooltip.Body>
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
          <Tooltip.Trigger
            aria-label={`Tooltip placement: ${placement()}`}
            asChild={(triggerProps) => <Button {...triggerProps()}>Hover or focus</Button>}
          />
          <Tooltip.Body>Placement: {placement()}</Tooltip.Body>
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
          <Tooltip.Trigger>Controlled tooltip</Tooltip.Trigger>
          <Tooltip.Body>Open: {String(open())}</Tooltip.Body>
        </Tooltip>
      </div>
    );
  },
};

export const Context: Story = {
  render: () => {
    return (
      <Tooltip>
        <Tooltip.Trigger>Context tooltip</Tooltip.Trigger>
        <Tooltip.Positioner>
          <TooltipStateContent />
        </Tooltip.Positioner>
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
        <Tooltip.RootProvider value={tooltip}>
          <Tooltip.Trigger>RootProvider tooltip</Tooltip.Trigger>
          <Tooltip.Body>State is owned outside the tree.</Tooltip.Body>
        </Tooltip.RootProvider>
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
              <Tooltip.Trigger
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
        <Tooltip.Body>
          {activeTool() ? (
            <>
              {activeTool()!.label}{' '}
              <span class={storyStyles.shortcut}>{activeTool()!.shortcut}</span>
            </>
          ) : null}
        </Tooltip.Body>
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
          <Tooltip.Trigger>Fixed strategy</Tooltip.Trigger>
          <Tooltip.Body>Positioned from a fixed container.</Tooltip.Body>
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
        <Tooltip.Trigger aria-label="Custom styled tooltip" class={storyStyles.customTrigger}>
          Custom style
        </Tooltip.Trigger>
        <Tooltip.Positioner class={storyStyles.customPositioner}>
          <Tooltip.Content class={storyStyles.customContent}>
            Styled through explicit Ark parts
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip>
    );
  },
};

function TooltipStateContent() {
  const tooltip = useTooltipContext();

  return <Tooltip.Content>Open from context: {tooltip().open.toString()}</Tooltip.Content>;
}