import '../../../../packages/foundation/src/presets/dense.css';
import '../../../../packages/foundation/src/presets/soft.css';
import '../../../../packages/foundation/src/presets/contrast.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState, type CSSProperties } from 'react';
import { expect, screen, waitFor } from 'storybook/test';
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

const meta = { title: 'Review/Foundation', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function ThemeSample({ name }: { name: string }) {
  return (
    <div
      data-sample={name}
      style={{
        display: 'grid',
        gap: 'var(--moduix-spacing-sm)',
        padding: 'var(--moduix-spacing-3-5)',
        borderRadius: 'var(--moduix-radius-md)',
        background: 'var(--moduix-color-background)',
        color: 'var(--moduix-color-foreground)',
        border: '1px solid var(--moduix-color-border)',
      }}
    >
      <span>{name}</span>
      <Button>{name} primary</Button>
    </div>
  );
}

export const ScopedThemes: Story = {
  play: async ({ canvasElement }) => {
    const sample = (name: string) =>
      canvasElement.querySelector<HTMLElement>(`[data-sample="${name}"]`)!;
    for (const [preset, radius, padding] of [
      ['default', 8, 14],
      ['dense', 5.76, 12],
      ['soft', 12.8, 16],
      ['contrast', 4.8, 14],
    ] as const) {
      const light = sample(`${preset} / light`);
      const dark = sample(`${preset} / dark`);
      const nestedLight = sample(`${preset} / light in dark`);
      const nestedDark = sample(`${preset} / dark in light`);
      await expect(getComputedStyle(light).backgroundColor).not.toBe(
        getComputedStyle(dark).backgroundColor,
      );
      await expect(getComputedStyle(light).backgroundColor).toBe(
        getComputedStyle(nestedLight).backgroundColor,
      );
      await expect(getComputedStyle(dark).backgroundColor).toBe(
        getComputedStyle(nestedDark).backgroundColor,
      );
      await expect(getComputedStyle(light.querySelector('button')!).backgroundColor).toBe(
        getComputedStyle(nestedLight.querySelector('button')!).backgroundColor,
      );
      await expect(parseFloat(getComputedStyle(dark).borderRadius)).toBeCloseTo(radius, 1);
      await expect(parseFloat(getComputedStyle(dark).paddingTop)).toBeCloseTo(padding, 1);
    }
    await expect(getComputedStyle(sample('custom').querySelector('button')!).backgroundColor).toBe(
      'rgb(0, 128, 128)',
    );
    await expect(parseFloat(getComputedStyle(sample('custom')).borderRadius)).toBe(16);
  },
  render: () => (
    <div data-moduix-color-scheme="light" style={{ display: 'grid', gap: '1rem' }}>
      <p>
        Same palette and geometry in direct and nested light/dark scopes. Theme presets remain
        optional CSS configurations.
      </p>
      {['default', 'dense', 'soft', 'contrast'].map((preset) => (
        <section
          key={preset}
          data-moduix-theme={preset}
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
        >
          <div data-moduix-color-scheme="light">
            <ThemeSample name={`${preset} / light`} />
            <div data-moduix-color-scheme="dark">
              <ThemeSample name={`${preset} / dark in light`} />
            </div>
          </div>
          <div data-moduix-color-scheme="dark">
            <ThemeSample name={`${preset} / dark`} />
            <div data-moduix-color-scheme="light">
              <ThemeSample name={`${preset} / light in dark`} />
            </div>
          </div>
        </section>
      ))}
      <section
        data-moduix-theme="custom"
        style={{ '--moduix-primary': 'teal', '--moduix-radius': '20px' } as CSSProperties}
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
  play: async ({ canvas, userEvent }) => {
    for (const [name, scale, translate] of [
      ['Lightbox motion', '0.82', '0px'],
      ['Command palette motion', '0.9', '0px -12px'],
    ] as const) {
      await userEvent.click(canvas.getByRole('button', { name: `Open ${name}` }));
      const content = await screen.findByRole('dialog', { name });
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduced) {
        const animation = content.getAnimations()[0];
        await expect(animation).toBeDefined();
        const first = (animation.effect as KeyframeEffect).getKeyframes()[0];
        await expect(first.scale).toBe(scale);
        await expect(first.translate).toBe(translate);
        await expect(getComputedStyle(content).animationDuration).toBe(
          name === 'Lightbox motion' ? '0.22s' : '0.2s',
        );
      }
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(screen.queryByRole('dialog', { name })).not.toBeInTheDocument());
    }
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Lightbox>
        <LightboxTrigger asChild>
          <Button>Open Lightbox motion</Button>
        </LightboxTrigger>
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
        <CommandPaletteTrigger asChild>
          <Button>Open Command palette motion</Button>
        </CommandPaletteTrigger>
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
  const portalRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<'up' | 'down' | 'start' | 'end'>('down');
  const [variant, setVariant] = useState<'default' | 'island'>('default');
  const [preset, setPreset] = useState('default');
  return (
    <div ref={portalRef} data-moduix-theme={preset} data-moduix-color-scheme="light">
      <span
        data-safe-area
        style={{
          display: 'none',
          padding:
            'env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px)',
        }}
      />
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <label>
          Direction{' '}
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as typeof direction)}
          >
            {['down', 'up', 'start', 'end'].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Variant{' '}
          <select value={variant} onChange={(e) => setVariant(e.target.value as typeof variant)}>
            {['default', 'island'].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Preset{' '}
          <select value={preset} onChange={(e) => setPreset(e.target.value)}>
            {['default', 'dense', 'soft'].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>
      <p>
        Check all directions, edge/island, swipes and snap points. Portal explicitly targets this
        CSS scope.
      </p>
      <Drawer
        key={direction + variant}
        swipeDirection={direction}
        variant={variant === 'island' ? 'island' : undefined}
        portalRef={portalRef}
        snapPoints={[0.5, 1]}
        defaultSnapPoint={1}
      >
        <DrawerTrigger asChild>
          <Button>Open motion drawer</Button>
        </DrawerTrigger>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerGrabber>
              <DrawerGrabberIndicator />
            </DrawerGrabber>
            <DrawerTitle>Motion drawer</DrawerTitle>
            <DrawerBody>Swipe, release, resize the viewport and try both snap points.</DrawerBody>
            <DrawerCloseTrigger>Close motion drawer</DrawerCloseTrigger>
          </DrawerContent>
        </DrawerPositioner>
      </Drawer>
    </div>
  );
}

export const DrawerMotion: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    for (const [preset, inset, bleed] of [
      ['default', 16, 48],
      ['dense', 14, 44],
      ['soft', 18, 52],
    ] as const) {
      await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Preset' }), preset);
      for (const variant of ['default', 'island']) {
        await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Variant' }), variant);
        for (const direction of ['down', 'up', 'start', 'end']) {
          await userEvent.selectOptions(
            canvas.getByRole('combobox', { name: 'Direction' }),
            direction,
          );
          await userEvent.click(canvas.getByRole('button', { name: 'Open motion drawer' }));
          const content = await screen.findByRole('dialog', { name: 'Motion drawer' });
          const style = getComputedStyle(content);
          const physical = content.getAttribute('data-swipe-direction') as
            | 'down'
            | 'up'
            | 'left'
            | 'right';
          const positioner = content.closest('[data-slot=drawer-positioner]')!;
          const edge = {
            down: 'paddingBottom',
            up: 'paddingTop',
            left: 'paddingLeft',
            right: 'paddingRight',
          }[physical] as 'paddingBottom' | 'paddingTop' | 'paddingLeft' | 'paddingRight';
          const islandInset = Math.max(
            inset,
            parseFloat(getComputedStyle(canvasElement.querySelector('[data-safe-area]')!)[edge]),
          );
          await expect(parseFloat(getComputedStyle(positioner)[edge])).toBe(
            variant === 'island' ? islandInset : 0,
          );
          await expect(parseFloat(style.getPropertyValue('--_drawer-bleed'))).toBe(bleed);
          if (!reduced) {
            await expect(style.animationName).toBe('moduix-drawer-content-in-' + physical);
            const frames = (content.getAnimations()[0].effect as KeyframeEffect).getKeyframes();
            const distance = variant === 'island' ? islandInset : 0;
            const sign = physical === 'up' || physical === 'left' ? '-' : '';
            const movement = distance
              ? `calc(${sign}100% ${sign ? '-' : '+'} ${distance}px)`
              : `${sign}100%`;
            await expect(frames[0].transform).toBe(
              physical === 'up' || physical === 'down'
                ? `translate3d(0px, ${movement}, 0px)`
                : `translate3d(${movement}, 0px, 0px)`,
            );
            await expect(style.animationDuration).toBe('0.45s');
          }
          await userEvent.click(screen.getByRole('button', { name: 'Close motion drawer' }));
          if (!reduced) {
            await expect(getComputedStyle(content).animationName).toBe(
              'moduix-drawer-content-out-' + physical,
            );
            const distance =
              (variant === 'island' ? islandInset : 0) + (physical === 'up' ? bleed : 0);
            const sign = physical === 'up' || physical === 'left' ? '-' : '';
            const movement = distance
              ? `calc(${sign}100% ${sign ? '-' : '+'} ${distance}px)`
              : `${sign}100%`;
            const frames = (content.getAnimations()[0].effect as KeyframeEffect).getKeyframes();
            await expect(frames.at(-1)!.transform).toBe(
              physical === 'up' || physical === 'down'
                ? `translate3d(0px, ${movement}, 0px)`
                : `translate3d(${movement}, 0px, 0px)`,
            );
          }
          await waitFor(() =>
            expect(screen.queryByRole('dialog', { name: 'Motion drawer' })).not.toBeInTheDocument(),
          );
        }
      }
    }
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Preset' }), 'default');
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Variant' }), 'default');
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Direction' }), 'down');
  },
  render: () => <DrawerMotionDemo />,
};