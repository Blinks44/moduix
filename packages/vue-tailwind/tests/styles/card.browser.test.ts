import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import {
  Card,
  CardAction,
  CardBackground,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLink,
  CardMedia,
  CardTitle,
} from '@/index';

const cardComponents = {
  Card,
  CardAction,
  CardBackground,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLink,
  CardMedia,
  CardTitle,
};

test('merges consumer utility classes last on the root and parts', async () => {
  render({
    components: cardComponents,
    template: `
      <Card class="rounded-none">
        <CardBody class="px-2 pt-3 text-foreground">Customized body</CardBody>
      </Card>
    `,
  });

  await expect.element(page.getByText('Customized body')).toHaveCount(1);
  const body = screen.getByText('Customized body');
  const root = body.parentElement!;

  expect(root.classList.contains('rounded-none')).toBe(true);
  expect([...body.classList]).toEqual(expect.arrayContaining(['px-2', 'pt-3', 'text-foreground']));
  await expect.element(page.getByText('Customized body')).toHaveCSS('padding-left', '8px');
  await expect.element(page.getByText('Customized body')).toHaveCSS('padding-top', '12px');
  expect(getComputedStyle(root).borderRadius).toBe('0px');
});