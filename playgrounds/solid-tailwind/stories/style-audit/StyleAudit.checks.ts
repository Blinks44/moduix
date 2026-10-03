import type { StoryObj } from 'storybook-solidjs-vite';
import { expect, screen, waitFor } from 'storybook/test';
type Play = NonNullable<StoryObj['play']>;

export const focusAndDisabled: Play = async ({ canvas, canvasElement, userEvent }) => {
  const standalone = canvas.getByDisplayValue('Standalone disabled input');
  const grouped = canvas.getByDisplayValue('Disabled group input');
  const nested = canvas.getByDisplayValue('Fieldset / Field / InputGroup');
  await expect(getComputedStyle(standalone).opacity).toBe('0.5');
  await expect(getComputedStyle(grouped).opacity).toBe('1');
  await expect(getComputedStyle(nested).opacity).toBe('1');
  await expect(getComputedStyle(nested.closest('[data-slot=field-root]')!).opacity).toBe('1');
  await expect(getComputedStyle(nested.closest('[data-slot=input-group-root]')!).opacity).toBe('1');
  await expect(
    getComputedStyle(canvasElement.querySelector('[data-slot=fieldset-root]')!).opacity,
  ).toBe('0.5');

  const input = canvas.getByRole('textbox', { name: 'Filter fruit' });
  const content = canvas.getByRole('listbox');
  const idleBorder = getComputedStyle(input).borderTopColor;
  const expectJoinedFocus = async () => {
    await waitFor(() => {
      const inputStyle = getComputedStyle(input);
      const contentStyle = getComputedStyle(content);
      expect(inputStyle.borderTopColor).not.toBe(idleBorder);
      expect(contentStyle.borderLeftColor).toBe(inputStyle.borderTopColor);
      expect(contentStyle.borderRightColor).toBe(inputStyle.borderTopColor);
      expect(contentStyle.borderBottomColor).toBe(inputStyle.borderTopColor);
      expect(contentStyle.borderTopColor).toBe(idleBorder);
      expect(inputStyle.borderBottomWidth).toBe('0px');
      expect(inputStyle.outlineColor).toBe('rgba(0, 0, 0, 0)');
      expect(contentStyle.outlineColor).toBe('rgba(0, 0, 0, 0)');
    });
  };
  await userEvent.click(input);
  await expectJoinedFocus();
  await userEvent.tab();
  await waitFor(() => expect(content).toHaveFocus());
  await expect(content.matches(':focus-visible')).toBe(true);
  await expectJoinedFocus();
  await userEvent.keyboard('{ArrowDown}');
  await expect(content).toHaveAttribute('aria-activedescendant');
  const pear = canvas.getByRole('option', { name: 'Pear' });
  await userEvent.click(pear);
  await expect(pear).toHaveAttribute('aria-selected', 'true');
  await expect(getComputedStyle(content).outlineColor).toBe('rgba(0, 0, 0, 0)');
  await userEvent.click(canvas.getByText(/Tab through the filter/));
  await waitFor(() => {
    expect(getComputedStyle(input).borderTopColor).toBe(idleBorder);
    expect(getComputedStyle(content).borderColor).toBe(idleBorder);
  });
};

export const switchGeometry: Play = async ({ canvasElement }) => {
  for (const root of canvasElement.querySelectorAll('[data-slot=switch-root]')) {
    const control = root.querySelector('[data-slot=switch-control]')!;
    const thumb = root.querySelector('[data-slot=switch-thumb]')!;
    const trackRect = control.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const style = getComputedStyle(control);
    const inset = parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth);
    await expect(thumbRect.width).toBeCloseTo(thumbRect.height, 1);
    await expect(thumbRect.top - trackRect.top).toBeCloseTo(inset, 1);
    await expect(trackRect.bottom - thumbRect.bottom).toBeCloseTo(inset, 1);
    const endGap =
      style.direction === 'rtl'
        ? thumbRect.left - trackRect.left
        : trackRect.right - thumbRect.right;
    await expect(endGap).toBeCloseTo(inset, 1);
  }
};

export const overlayStack: Play = async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole('button', { name: 'Open popover' }));
  await userEvent.click(await screen.findByRole('button', { name: 'Open dialog from popover' }));
  const first = await screen.findByRole('dialog', { name: 'First dialog' });
  await userEvent.click(screen.getByRole('button', { name: 'Open nested dialog' }));
  const nested = await screen.findByRole('dialog', { name: 'Nested dialog' });
  await waitFor(async () => {
    const firstZ = Number(getComputedStyle(first).zIndex);
    const nestedZ = Number(getComputedStyle(nested).zIndex);
    await expect(Number.isFinite(firstZ)).toBe(true);
    await expect(nestedZ).toBe(firstZ + 1);
    await expect(Number(getComputedStyle(nested.parentElement!).zIndex)).toBe(nestedZ);
    const backdrop = screen.getByTestId('nested-backdrop');
    await expect(Number(getComputedStyle(backdrop).zIndex)).toBe(nestedZ - 1);
  });
  await userEvent.click(screen.getByRole('button', { name: 'Close nested' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: 'Nested dialog' })).not.toBeInTheDocument(),
  );
  await userEvent.click(screen.getByRole('button', { name: 'Close first' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: 'First dialog' })).not.toBeInTheDocument(),
  );
  await userEvent.click(canvas.getByRole('button', { name: 'Open popover' }));
};

export const narrowLeftToc: Play = async ({ canvasElement }) => {
  const root = canvasElement.querySelector('[data-slot=toc-root]')!;
  const columns = getComputedStyle(root).gridTemplateColumns.split(' ').length;
  await expect(columns).toBe(window.matchMedia('(width < 48rem)').matches ? 1 : 2);
};

export const scopedThemes: Play = async ({ canvasElement }) => {
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
};

export const popupMotion: Play = async ({ canvas, userEvent }) => {
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
};

export const drawerMotion: Play = async ({ canvas, canvasElement, userEvent }) => {
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
        await userEvent.click(await canvas.findByRole('button', { name: 'Open motion drawer' }));
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
};