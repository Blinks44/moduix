import '../../../../packages/foundation/src/presets/dense.css';
import '../../../../packages/foundation/src/presets/soft.css';
import '../../../../packages/foundation/src/presets/contrast.css';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
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

const ThemeSample = defineComponent({
  components: { Button },
  props: { name: { type: String, required: true } },
  template: `
    <div :data-sample="name" style="display: grid; gap: var(--moduix-spacing-sm); padding: var(--moduix-spacing-3-5); border-radius: var(--moduix-radius-md); background: var(--moduix-color-background); color: var(--moduix-color-foreground); border: 1px solid var(--moduix-color-border)">
      <span>{{ name }}</span><Button>{{ name }} primary</Button>
    </div>
  `,
});

const ScopedThemesDemo = defineComponent({
  components: { ThemeSample },
  setup: () => ({ presets: ['default', 'dense', 'soft', 'contrast'] }),
  template: `
      <div data-moduix-color-scheme="light" style="display: grid; gap: 1rem">
        <p>Same palette and geometry in direct and nested light/dark scopes. Theme presets remain optional CSS configurations.</p>
        <section v-for="preset in presets" :key="preset" :data-moduix-theme="preset" style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))">
          <div data-moduix-color-scheme="light"><ThemeSample :name="preset+' / light'" /><div data-moduix-color-scheme="dark"><ThemeSample :name="preset+' / dark in light'" /></div></div>
          <div data-moduix-color-scheme="dark"><ThemeSample :name="preset+' / dark'" /><div data-moduix-color-scheme="light"><ThemeSample :name="preset+' / light in dark'" /></div></div>
        </section>
        <section data-moduix-theme="custom" style="--moduix-primary: teal; --moduix-radius: 20px"><ThemeSample name="custom" /></section>
        <section data-moduix-theme="dense" data-moduix-color-scheme="dark"><section data-moduix-theme="soft" data-moduix-color-scheme="light"><ThemeSample name="soft light inside dense dark" /></section></section>
      </div>
    `,
});

export const ScopedThemes: Story = {
  play: scopedThemes,
  render: () => ScopedThemesDemo,
};
const PopupMotionDemo = defineComponent({
  components: {
    Button,
    CommandPalette,
    CommandPaletteBackdrop,
    CommandPaletteContent,
    CommandPalettePositioner,
    CommandPaletteTitle,
    CommandPaletteTrigger,
    Lightbox,
    LightboxBackdrop,
    LightboxCloseTrigger,
    LightboxContent,
    LightboxPositioner,
    LightboxTitle,
    LightboxTrigger,
  },
  template: `
      <div style="display: flex; gap: 1rem">
        <Lightbox>
          <LightboxTrigger as-child><Button>Open Lightbox motion</Button></LightboxTrigger>
          <LightboxBackdrop /><LightboxPositioner><LightboxContent style="background: var(--moduix-color-background); padding: 2rem">
            <LightboxTitle>Lightbox motion</LightboxTitle><p>Scale 0.82; 220ms. Try fast open/close and reduced motion.</p><LightboxCloseTrigger>Close Lightbox motion</LightboxCloseTrigger>
          </LightboxContent></LightboxPositioner>
        </Lightbox>
        <CommandPalette>
          <CommandPaletteTrigger as-child><Button>Open Command palette motion</Button></CommandPaletteTrigger>
          <CommandPaletteBackdrop /><CommandPalettePositioner><CommandPaletteContent><CommandPaletteTitle>Command palette motion</CommandPaletteTitle><p>Scale 0.9; translate -0.75rem; 200ms.</p><p>Press Escape to close.</p></CommandPaletteContent></CommandPalettePositioner>
        </CommandPalette>
      </div>
    `,
});

export const PopupMotion: Story = {
  play: popupMotion,
  render: () => PopupMotionDemo,
};
const DrawerMotionDemo = defineComponent({
  components: {
    Button,
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
  },
  setup() {
    const portalTarget = ref<HTMLDivElement>();
    const direction = ref<'up' | 'down' | 'start' | 'end'>('down');
    const variant = ref<'default' | 'island'>('default');
    const preset = ref('default');
    return {
      portalTarget,
      getPortal: () => portalTarget.value,
      direction,
      variant,
      preset,
      directions: ['down', 'up', 'start', 'end'],
      variants: ['default', 'island'],
      presets: ['default', 'dense', 'soft'],
    };
  },
  template: `
      <div :data-moduix-theme="preset" data-moduix-color-scheme="light">
        <div ref="portalTarget" />
        <span data-safe-area style="display: none; padding: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px)" />
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem">
          <label>Direction <select v-model="direction"><option v-for="value in directions" :key="value">{{ value }}</option></select></label>
          <label>Variant <select v-model="variant"><option v-for="value in variants" :key="value">{{ value }}</option></select></label>
          <label>Preset <select v-model="preset"><option v-for="value in presets" :key="value">{{ value }}</option></select></label>
        </div>
        <p>Check all directions, edge/island, swipes and snap points. Portal explicitly targets this CSS scope.</p>
        <Drawer :key="direction+variant" :swipe-direction="direction" :variant="variant === 'island' ? 'island' : undefined" :portal-ref="getPortal" :snap-points="[0.5, 1]" :default-snap-point="1">
          <DrawerTrigger as-child><Button>Open motion drawer</Button></DrawerTrigger>
          <DrawerBackdrop /><DrawerPositioner><DrawerContent>
            <DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber><DrawerTitle>Motion drawer</DrawerTitle>
            <DrawerBody>Swipe, release, resize the viewport and try both snap points.</DrawerBody><DrawerCloseTrigger>Close motion drawer</DrawerCloseTrigger>
          </DrawerContent></DrawerPositioner>
        </Drawer>
      </div>
    `,
});

export const DrawerMotion: Story = {
  play: drawerMotion,
  render: () => DrawerMotionDemo,
};