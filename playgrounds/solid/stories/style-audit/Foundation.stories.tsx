import '../../../../packages/foundation/src/presets/dense.css';
import '../../../../packages/foundation/src/presets/soft.css';
import '../../../../packages/foundation/src/presets/contrast.css';
import { createSignal, Show } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button';
import {
  CommandPalette,
  CommandPaletteBackdrop,
  CommandPaletteContent,
  CommandPalettePositioner,
  CommandPaletteTitle,
  CommandPaletteTrigger,
} from '@/components/command-palette';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/drawer';
import {
  Lightbox,
  LightboxBackdrop,
  LightboxCloseTrigger,
  LightboxContent,
  LightboxPositioner,
  LightboxTitle,
  LightboxTrigger,
} from '@/components/lightbox';
import { scopedThemes, popupMotion, drawerMotion } from './StyleAudit.checks';

const meta = { title: 'Review/Foundation', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function ThemeSample(props: { name: string }) {
  return (
    <div
      data-sample={props.name}
      style={{
        display: 'grid',
        gap: 'var(--moduix-spacing-sm)',
        padding: 'var(--moduix-spacing-3-5)',
        'border-radius': 'var(--moduix-radius-md)',
        background: 'var(--moduix-color-background)',
        color: 'var(--moduix-color-foreground)',
        border: '1px solid var(--moduix-color-border)',
      }}
    >
      <span>{props.name}</span>
      <Button>{props.name} primary</Button>
    </div>
  );
}
export const ScopedThemes: Story = {
  play: scopedThemes,
  render: () => (
    <div data-moduix-color-scheme="light" style={{ display: 'grid', gap: '1rem' }}>
      <p>
        Same palette and geometry in direct and nested light/dark scopes. Theme presets remain
        optional CSS configurations.
      </p>
      {['default', 'dense', 'soft', 'contrast'].map((preset) => (
        <section
          data-moduix-theme={preset}
          style={{
            display: 'grid',
            gap: '1rem',
            'grid-template-columns': 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
        >
          <div data-moduix-color-scheme="light">
            <ThemeSample name={preset + ' / light'} />
            <div data-moduix-color-scheme="dark">
              <ThemeSample name={preset + ' / dark in light'} />
            </div>
          </div>
          <div data-moduix-color-scheme="dark">
            <ThemeSample name={preset + ' / dark'} />
            <div data-moduix-color-scheme="light">
              <ThemeSample name={preset + ' / light in dark'} />
            </div>
          </div>
        </section>
      ))}
      <section
        data-moduix-theme="custom"
        style={{ '--moduix-primary': 'teal', '--moduix-radius': '20px' }}
      >
        <ThemeSample name="custom" />
      </section>
      <section data-moduix-theme="dense" data-moduix-color-scheme="dark">
        <section data-moduix-theme="soft" data-moduix-color-scheme="light">
          <ThemeSample name="soft light inside dense dark" />
        </section>
      </section>
    </div>
  ),
};
export const PopupMotion: Story = {
  play: popupMotion,
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Lightbox>
        <LightboxTrigger asChild={(props) => <Button {...props()}>Open Lightbox motion</Button>} />
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxContent
            style={{ background: 'var(--moduix-color-background)', padding: '2rem' }}
          >
            <LightboxTitle>Lightbox motion</LightboxTitle>
            <p>Scale 0.82; 220ms. Try fast open/close and reduced motion.</p>
            <LightboxCloseTrigger>Close Lightbox motion</LightboxCloseTrigger>
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
      <CommandPalette>
        <CommandPaletteTrigger
          asChild={(props) => <Button {...props()}>Open Command palette motion</Button>}
        />
        <CommandPaletteBackdrop />
        <CommandPalettePositioner>
          <CommandPaletteContent>
            <CommandPaletteTitle>Command palette motion</CommandPaletteTitle>
            <p>Scale 0.9; translate -0.75rem; 200ms.</p>
            <p>Press Escape to close.</p>
          </CommandPaletteContent>
        </CommandPalettePositioner>
      </CommandPalette>
    </div>
  ),
};
function DrawerMotionDemo() {
  let portalTarget: HTMLDivElement | undefined;
  const [direction, setDirection] = createSignal<'up' | 'down' | 'start' | 'end'>('down');
  const [variant, setVariant] = createSignal<'default' | 'island'>('default');
  const [preset, setPreset] = createSignal('default');
  return (
    <div
      ref={(element) => {
        portalTarget = element;
      }}
      data-moduix-theme={preset()}
      data-moduix-color-scheme="light"
    >
      <span
        data-safe-area
        style={{
          display: 'none',
          padding:
            'env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px)',
        }}
      />
      <div style={{ display: 'flex', gap: '1rem', 'flex-wrap': 'wrap', 'margin-bottom': '1rem' }}>
        <label>
          Direction{' '}
          <select
            value={direction()}
            onChange={(e) => setDirection(e.currentTarget.value as ReturnType<typeof direction>)}
          >
            {['down', 'up', 'start', 'end'].map((value) => (
              <option>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Variant{' '}
          <select
            value={variant()}
            onChange={(e) => setVariant(e.currentTarget.value as ReturnType<typeof variant>)}
          >
            {['default', 'island'].map((value) => (
              <option>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Preset{' '}
          <select value={preset()} onChange={(e) => setPreset(e.currentTarget.value)}>
            {['default', 'dense', 'soft'].map((value) => (
              <option>{value}</option>
            ))}
          </select>
        </label>
      </div>
      <p>
        Check all directions, edge/island, swipes and snap points. Portal explicitly targets this
        CSS scope.
      </p>
      <Show when={direction() + variant()} keyed>
        {(_key) => (
          <Drawer
            swipeDirection={direction()}
            variant={variant() === 'island' ? 'island' : undefined}
            portalRef={() => portalTarget}
            snapPoints={[0.5, 1]}
            defaultSnapPoint={1}
          >
            <DrawerTrigger asChild={(props) => <Button {...props()}>Open motion drawer</Button>} />
            <DrawerBackdrop />
            <DrawerPositioner>
              <DrawerContent>
                <DrawerGrabber>
                  <DrawerGrabberIndicator />
                </DrawerGrabber>
                <DrawerTitle>Motion drawer</DrawerTitle>
                <DrawerBody>
                  Swipe, release, resize the viewport and try both snap points.
                </DrawerBody>
                <DrawerCloseTrigger>Close motion drawer</DrawerCloseTrigger>
              </DrawerContent>
            </DrawerPositioner>
          </Drawer>
        )}
      </Show>
    </div>
  );
}
export const DrawerMotion: Story = { play: drawerMotion, render: () => <DrawerMotionDemo /> };