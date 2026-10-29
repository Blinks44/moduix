import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Highlight } from '@/index';

test('forwards mark attrs and native listeners to every matched segment', async () => {
  let clicks = 0;
  render({
    components: { Highlight },
    setup: () => ({ handleClick: () => clicks++ }),
    template: `
      <Highlight
        class="custom-highlight"
        data-testid="highlight"
        match-all
        query="component"
        text="component component"
        title="Matched query"
        style="color: red"
        @click="handleClick"
      />
    `,
  });

  const marks = screen.getAllByTestId('highlight');

  expect(marks).toHaveLength(2);
  for (const [index, mark] of marks.entries()) {
    expect(mark.classList.contains('custom-highlight')).toBe(true);
    expect(mark.getAttribute('title')).toBe('Matched query');
    expect(getComputedStyle(mark).color).toBe('rgb(255, 0, 0)');
    await page.getByTestId('highlight').nth(index).click();
  }
  expect(clicks).toBe(2);
});

// Blocked by the same upstream fragment attr-forwarding defect.

test('lets consumer utilities replace conflicting defaults', async () => {
  render({
    components: { Highlight },
    template: `
      <Highlight
        class="rounded-none bg-primary px-4 py-2 font-bold text-primary"
        data-testid="highlight"
        query="text"
        text="Highlight text"
      />
    `,
  });

  const mark = screen.getByTestId('highlight');

  expect([...mark.classList]).toEqual(
    expect.arrayContaining([
      'px-4',
      'py-2',
      'rounded-none',
      'bg-primary',
      'font-bold',
      'text-primary',
    ]),
  );
  await expect.element(page.getByTestId('highlight')).toHaveCSS('padding', '8px 16px');
  await expect.element(page.getByTestId('highlight')).toHaveCSS('border-radius', '0px');
  await expect.element(page.getByTestId('highlight')).toHaveCSS('font-weight', '700');
});