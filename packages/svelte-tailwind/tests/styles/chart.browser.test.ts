import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import ChartOverride from './ChartOverride.svelte';
import ChartTooltipVariables from './ChartTooltipVariables.svelte';

type MockOptions = {
  ariaLabel: string;
  className?: string;
  definition?: { tooltip?: { className?: string } };
  renderer?: { type?: string };
};

rs.mock('@tanstack/charts/motion', () => ({
  motion: () => ({ type: 'default-motion-renderer' }),
}));

rs.mock('@tanstack/charts/svg/renderer', () => ({
  svgChartRenderer: { type: 'static-svg-renderer' },
}));

rs.mock('@tanstack/charts/adapter/renderer', () => ({
  createChartRendererAdapter: (initialOptions: MockOptions) => {
    let options = initialOptions;

    return {
      prerender: () =>
        `<div role="img" aria-label="${options.ariaLabel}" class="${options.className ?? ''}" data-testid="tanstack-chart" data-renderer="${options.renderer?.type ?? ''}" data-tooltip-class="${options.definition?.tooltip?.className ?? ''}"></div>`,
      mount: () => undefined,
      update: (nextOptions: MockOptions) => {
        options = nextOptions;
      },
      destroy: () => undefined,
    };
  },
}));

test('renders the callable root with replaceable Tailwind defaults', () => {
  render(ChartOverride, { props: { root: true } });

  const root = screen.getByTestId('root');

  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['consumer-chart', 'p-0', 'bg-muted', 'shadow-none']),
  );
});

test('maps tooltip chrome to TanStack variables without rewriting the definition', () => {
  render(ChartTooltipVariables);

  expect(screen.getByTestId('tanstack-chart').getAttribute('data-tooltip-class')).toBe('!bg-muted');

  const host = getComputedStyle(document.querySelector('.ts-chart-host')!);

  for (const name of [
    'background',
    'border',
    'border-radius',
    'color',
    'font',
    'padding',
    'shadow',
  ]) {
    expect(host.getPropertyValue(`--ts-chart-tooltip-${name}`).trim()).not.toBe('');
  }
});

test('lets consumer Tailwind classes override conflicting defaults on every public part', () => {
  render(ChartOverride);

  expect([...screen.getByTestId('header')!.classList]).toEqual(expect.arrayContaining(['gap-4']));
  expect([...screen.getByTestId('title')!.classList]).toEqual(expect.arrayContaining(['text-xl']));
  expect([...screen.getByTestId('description')!.classList]).toEqual(
    expect.arrayContaining(['text-foreground']),
  );
  expect([...screen.getByTestId('legend')!.classList]).toEqual(expect.arrayContaining(['gap-1']));
  expect([...screen.getByTestId('legend-item')!.classList]).toEqual(
    expect.arrayContaining(['text-foreground']),
  );
});