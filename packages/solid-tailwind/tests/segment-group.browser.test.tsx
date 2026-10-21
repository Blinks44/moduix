import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal, For } from 'solid-js';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupLabel,
  SegmentGroupRootProvider,
  useSegmentGroup,
} from '../src';

const frameworks = ['React', 'Solid', 'Vue'];
const frameworkItems = frameworks.map((value) => ({ value, label: value }));

function SegmentItems() {
  return (
    <>
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworkItems} />
    </>
  );
}

function ControlledSegmentGroup() {
  const [value, setValue] = createSignal<string | null>('React');

  return (
    <SegmentGroup value={value()} onValueChange={(details) => setValue(details.value)}>
      <SegmentItems />
    </SegmentGroup>
  );
}

function ProviderSegmentGroup() {
  const segmentGroup = useSegmentGroup({ defaultValue: 'Solid' });

  return (
    <SegmentGroupRootProvider value={segmentGroup}>
      <SegmentItems />
    </SegmentGroupRootProvider>
  );
}

test('submits through explicit Ark item inputs', async () => {
  const changes: (string | null)[] = [];
  const { container } = render(() => (
    <form>
      <SegmentGroup
        defaultValue="React"
        name="framework"
        onValueChange={(details) => changes.push(details.value)}
      >
        <SegmentItems />
      </SegmentGroup>
    </form>
  ));

  const form = container.querySelector('form') as HTMLFormElement;

  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('type', 'radio');
  expect(new FormData(form).get('framework')).toBe('React');

  await page.getByText('Solid', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  expect(new FormData(form).get('framework')).toBe('Solid');
  expect(changes).toEqual(['Solid']);
});

test('keeps asChild composition semantic with an explicit item input', () => {
  render(() => (
    <SegmentGroup defaultValue="React">
      <SegmentGroupItem
        asChild={(props) => <label data-testid="custom-item" {...props()} />}
        value="React"
      >
        <>
          <SegmentGroupItemHiddenInput />
          <SegmentGroupItemText>React</SegmentGroupItemText>
        </>
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  const item = screen.getByTestId('custom-item');
  expect(item.tagName).toBe('LABEL');
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});

test('keeps asChild item state reactive after selection changes', async () => {
  render(() => (
    <SegmentGroup defaultValue="Monthly">
      <SegmentGroupIndicator data-testid="indicator" />
      <SegmentGroupItem
        value="Monthly"
        asChild={(props) => <label data-testid="monthly" {...props()} />}
      >
        <>
          <SegmentGroupItemText>Monthly</SegmentGroupItemText>
          <SegmentGroupItemHiddenInput />
        </>
      </SegmentGroupItem>
      <SegmentGroupItem
        value="Annual"
        asChild={(props) => <label data-testid="annual" {...props()} />}
      >
        <>
          <SegmentGroupItemText>Annual</SegmentGroupItemText>
          <SegmentGroupItemHiddenInput />
        </>
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  const annual = screen.getByTestId('annual');

  await expect.element(page.getByTestId('monthly')).toHaveAttribute('data-state', 'checked');
  await page.getByTestId('annual').click();

  await expect.element(page.getByTestId('annual')).toHaveAttribute('data-state', 'checked');
  await expect.element(page.getByTestId('monthly')).not.toHaveAttribute('data-state', 'checked');
  await expect
    .poll(() => parseFloat(screen.getByTestId('indicator').style.getPropertyValue('--left')))
    .toBe(annual.offsetLeft);
  await expect
    .poll(() => parseFloat(screen.getByTestId('indicator').style.getPropertyValue('--width')))
    .toBe(annual.offsetWidth);
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let itemRef: HTMLLabelElement | undefined;

  render(() => (
    <SegmentGroup>
      <SegmentGroupItem
        ref={(element) => (itemRef = element)}
        asChild={(props) => <label {...props()} />}
        value="React"
      >
        <>
          <SegmentGroupItemHiddenInput />
          <SegmentGroupItemText>React</SegmentGroupItemText>
        </>
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  expect(itemRef).toBeUndefined();
});

test('preserves native radio semantics and disabled items', async () => {
  render(() => (
    <SegmentGroup defaultValue="React" name="framework">
      <SegmentGroupIndicator />
      <SegmentGroupItem value="React">
        <SegmentGroupItemText>React</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
      <SegmentGroupItem value="Solid" disabled>
        <SegmentGroupItemText>Solid</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
      <SegmentGroupItem value="Vue">
        <SegmentGroupItemText>Vue</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  const reactRadio = page.getByRole('radio', { name: 'React', exact: true });
  await expect.element(reactRadio).toHaveAttribute('type', 'radio');
  await expect.element(reactRadio).toHaveAttribute('name', 'framework');
  await expect.element(reactRadio).toBeChecked();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeDisabled();

  await expect.element(reactRadio).toBeChecked();

  await page.getByText('Vue', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Vue', exact: true })).toBeChecked();
});

test('propagates group disabled state to every native input', async () => {
  render(() => (
    <SegmentGroup defaultValue="React" disabled>
      <SegmentItems />
    </SegmentGroup>
  ));

  await expect.element(page.getByRole('radiogroup')).toHaveAttribute('data-disabled');
  for (const item of screen
    .getAllByRole('radio')
    .map((radio) => radio.closest('[data-slot="segment-group-item"]'))) {
    expect([...item!.classList]).toEqual(
      expect.arrayContaining(['group-not-data-disabled/segment-group:data-disabled:opacity-50']),
    );
  }
  for (const radio of screen.getAllByRole('radio')) {
    expect((radio as HTMLInputElement).disabled).toBe(true);
  }
});

test('forwards refs through the root, item, and indicator wrappers', () => {
  let rootRef!: HTMLDivElement;
  let itemRef!: HTMLLabelElement;
  let indicatorRef!: HTMLDivElement;

  render(() => (
    <SegmentGroup ref={(element) => (rootRef = element)} defaultValue="React">
      <SegmentGroupIndicator ref={(element) => (indicatorRef = element)} />
      <SegmentGroupItem ref={(element) => (itemRef = element)} value="React">
        <SegmentGroupItemText>React</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  expect(rootRef).toBe(screen.getByRole('radiogroup'));
  expect(itemRef?.tagName).toBe('LABEL');
  expect(indicatorRef.getAttribute('data-slot')).toBe('segment-group-indicator');
});

test('keeps read-only inputs checked and outside keyboard navigation', async () => {
  render(() => (
    <>
      <button type="button">Before group</button>
      <SegmentGroup defaultValue="React" readOnly>
        <SegmentItems />
      </SegmentGroup>
      <button type="button">After group</button>
    </>
  ));
  const react = page.getByRole('radio', { name: 'React', exact: true });
  const solid = page.getByRole('radio', { name: 'Solid', exact: true });
  await expect.element(react).toBeDisabled();
  await expect.element(solid).toBeDisabled();
  await page.getByRole('button', { name: 'Before group', exact: true }).click();
  await page.getByRole('button', { name: 'Before group', exact: true }).press('Tab');
  await expect
    .element(page.getByRole('button', { name: 'After group', exact: true }))
    .toBeFocused();
  await expect.element(react).toBeChecked();
  await expect.element(solid).not.toBeChecked();
});
test('preserves controlled and provider composition paths', async () => {
  const { unmount } = render(() => <ControlledSegmentGroup />);

  const solidRadio = page.getByRole('radio', { name: 'Solid', exact: true });
  await page.getByText('Solid', { exact: true }).click();
  await expect.element(solidRadio).toBeChecked();

  unmount();
  render(() => <ProviderSegmentGroup />);
  await expect.element(solidRadio).toBeChecked();
});

test('preserves vertical orientation for Ark navigation', async () => {
  render(() => (
    <SegmentGroup defaultValue="React" orientation="vertical">
      <SegmentItems />
    </SegmentGroup>
  ));

  await expect
    .element(page.getByRole('radiogroup'))
    .toHaveAttribute('data-orientation', 'vertical');
  expect(
    screen.getByRole('radio', { name: 'React' }).parentElement!.getAttribute('data-orientation'),
  ).toBe('vertical');
});

test('applies native utilities to component-owned visual parts', () => {
  render(() => (
    <SegmentGroup defaultValue="React">
      <SegmentGroupLabel>Framework</SegmentGroupLabel>
      <SegmentGroupIndicator data-testid="indicator" />
      <SegmentGroupItem value="React">
        <SegmentGroupItemText>React</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  const root = screen.getByRole('radiogroup');
  const label = screen.getByText('Framework');
  const item = root.querySelector('[data-slot="segment-group-item"]')!;
  const indicator = screen.getByTestId('indicator');

  expect([...root.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'max-w-full',
      'gap-1',
      'rounded-lg',
      'border',
      'bg-muted',
    ]),
  );
  expect([...label.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'leading-5', 'font-semibold']),
  );
  expect([...item!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'px-3.5', 'gap-2', 'rounded-md']),
  );
  expect([...item!.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'font-medium', 'text-muted-foreground']),
  );
  expect([...indicator!.classList]).toEqual(
    expect.arrayContaining(['-z-1', 'rounded-md', 'bg-background', 'shadow-sm']),
  );
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <SegmentGroup class="gap-4 text-primary" data-testid="root">
      <SegmentGroupIndicator class="rounded-full bg-primary" data-testid="indicator" />
      <SegmentGroupItem value="React" class="gap-4 text-primary">
        <SegmentGroupItemText>React</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  const root = screen.getByTestId('root');
  const indicator = screen.getByTestId('indicator');
  const item = screen.getByRole('radio', { name: 'React' }).parentElement!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect(['gap-1', 'text-foreground'].some((name) => root.classList.contains(name))).toBe(false);
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['rounded-full', 'bg-primary']));
  expect(['rounded-md', 'bg-background'].some((name) => indicator.classList.contains(name))).toBe(
    false,
  );
  expect([...item!.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect(['gap-2', 'text-muted-foreground'].some((name) => item.classList.contains(name))).toBe(
    false,
  );
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect.element(page.locator('[data-slot="segment-group-item"]')).toHaveCSS('gap', '16px');
});

test('preserves the native Root asChild host without emulating ref forwarding', async () => {
  let rootRef: HTMLDivElement | undefined;
  render(() => (
    <SegmentGroup
      defaultValue="React"
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} data-testid="custom-root" />}
    >
      <SegmentItems />
    </SegmentGroup>
  ));
  await expect
    .element(page.getByTestId('custom-root'))
    .toHaveAttribute('data-slot', 'segment-group-root');
  await expect.element(page.getByRole('radio', { name: 'React', exact: true })).toBeChecked();
  expect(rootRef).toBeUndefined();
});

test('defaults the root and the hook to horizontal orientation', async () => {
  function Provider() {
    const segmentGroup = useSegmentGroup({ defaultValue: 'React' });
    return (
      <SegmentGroupRootProvider value={segmentGroup} data-testid="provider">
        <SegmentItems />
      </SegmentGroupRootProvider>
    );
  }

  render(() => (
    <>
      <SegmentGroup defaultValue="React" orientation={undefined} data-testid="root">
        <SegmentItems />
      </SegmentGroup>
      <Provider />
    </>
  ));

  await expect.element(page.getByTestId('root')).toHaveAttribute('data-orientation', 'horizontal');
  await expect
    .element(page.getByTestId('provider'))
    .toHaveAttribute('data-orientation', 'horizontal');
});

test('stretches vertical items to the group width', () => {
  render(() => (
    <SegmentGroup defaultValue="List" orientation="vertical">
      <SegmentGroupIndicator />
      <SegmentGroupItems
        items={['List', 'Calendar view'].map((value) => ({ value, label: value }))}
      />
    </SegmentGroup>
  ));

  const [short, long] = screen
    .getAllByRole('radio')
    .map((radio) => radio.closest<HTMLElement>('[data-slot="segment-group-item"]')!);
  expect(short.offsetWidth).toBe(long.offsetWidth);
});

test('does not animate the indicator before the selection changes', async () => {
  render(() => (
    <SegmentGroup defaultValue="React">
      <SegmentGroupIndicator data-testid="indicator" />
      <SegmentGroupItems items={frameworkItems} />
    </SegmentGroup>
  ));

  await expect.element(page.getByTestId('indicator')).toBeVisible();
  expect(getComputedStyle(screen.getByTestId('indicator')).transitionDuration).toBe('0s');
});

test('keeps a consumer checked color while the checked item is hovered', async () => {
  render(() => (
    <SegmentGroup defaultValue="React">
      <SegmentGroupItem value="React" class="data-[state=checked]:text-destructive">
        <SegmentGroupItemText>React</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    </SegmentGroup>
  ));

  const item = screen.getByRole('radio', { name: 'React' }).parentElement!;
  const checkedColor = getComputedStyle(item).color;
  await page.getByText('React', { exact: true }).hover();
  expect(getComputedStyle(item).color).toBe(checkedColor);
});

test('sizes the whole group to the matching control height', () => {
  render(() => (
    <For each={['sm', 'md', 'lg'] as const}>
      {(size) => (
        <SegmentGroup size={size} defaultValue="React" data-testid={size}>
          <SegmentGroupIndicator />
          <SegmentGroupItems items={frameworks} />
        </SegmentGroup>
      )}
    </For>
  ));

  expect(screen.getByTestId('sm').offsetHeight).toBe(32);
  expect(screen.getByTestId('md').offsetHeight).toBe(36);
  expect(screen.getByTestId('lg').offsetHeight).toBe(40);
});

test('renders string items with the string as value and label', async () => {
  const { container } = render(() => (
    <form>
      <SegmentGroup name="framework" defaultValue="Solid">
        <SegmentGroupItems items={frameworks} />
      </SegmentGroup>
    </form>
  ));

  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  expect(new FormData(container.querySelector('form')!).get('framework')).toBe('Solid');
});