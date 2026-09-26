import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
import { Spinner } from '../src';

test('dump asChild svg host html', () => {
  const Harness = defineComponent({
    components: { Spinner },
    template: `
      <Spinner
        as-child
        size="lg"
        aria-label="Loading report"
        class="animate-[var(--moduix-animation-spin)] text-primary motion-reduce:animate-none"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" opacity="0.22" />
          <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" stroke-width="2" />
        </svg>
      </Spinner>
    `,
  });

  const { container } = render(Harness);
  const svg = container.querySelector('svg');
  require('node:fs').writeFileSync(
    '/var/folders/tn/qshr4wlx6kqddym0vrn60hgh0000gn/T/kilo/aschild-dump.txt',
    [container.innerHTML, svg?.getAttribute('class') ?? ''].join('\n---\n'),
  );
  expect(svg).toBeTruthy();
});