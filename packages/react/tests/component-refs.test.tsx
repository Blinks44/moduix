import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, type RefObject } from 'react';
import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderMarks,
  CommandPaletteKbd,
  DateInputSeparator,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  FileUploadItemPreviewIcon,
  ListboxFilter,
  MenuTriggerIcon,
  MenuTriggerItemIcon,
  PinInputSeparator,
} from '../src';

test.each(['object', 'callback'] as const)(
  'forwards %s refs through public DOM helpers',
  (kind) => {
    const refs = {
      dial: createRef<HTMLDivElement>(),
      marks: createRef<HTMLDivElement>(),
      kbd: createRef<HTMLElement>(),
      dateSeparator: createRef<HTMLSpanElement>(),
      pinSeparator: createRef<HTMLSpanElement>(),
      previewIcon: createRef<SVGSVGElement>(),
      filter: createRef<HTMLDivElement>(),
      triggerIcon: createRef<HTMLSpanElement>(),
      triggerItemIcon: createRef<HTMLSpanElement>(),
      header: createRef<HTMLDivElement>(),
      body: createRef<HTMLDivElement>(),
      footer: createRef<HTMLDivElement>(),
    };
    const nodes: Record<string, Element | null> = {};
    const getRef = <T extends Element>(name: string, objectRef: RefObject<T | null>) =>
      kind === 'object'
        ? objectRef
        : (node: T | null) => {
            nodes[name] = node;
          };

    render(
      <>
        <AngleSlider>
          <AngleSliderDial ref={getRef('dial', refs.dial)} data-testid="dial">
            <AngleSliderMarks
              ref={getRef('marks', refs.marks)}
              data-testid="marks"
              values={[0, 90]}
            />
          </AngleSliderDial>
        </AngleSlider>
        <CommandPaletteKbd ref={getRef('kbd', refs.kbd)} data-testid="kbd">
          K
        </CommandPaletteKbd>
        <DateInputSeparator
          ref={getRef('dateSeparator', refs.dateSeparator)}
          data-testid="dateSeparator"
        />
        <PinInputSeparator
          ref={getRef('pinSeparator', refs.pinSeparator)}
          data-testid="pinSeparator"
        />
        <FileUploadItemPreviewIcon
          ref={getRef('previewIcon', refs.previewIcon)}
          data-testid="previewIcon"
        />
        <ListboxFilter ref={getRef('filter', refs.filter)} data-testid="filter" />
        <MenuTriggerIcon ref={getRef('triggerIcon', refs.triggerIcon)} data-testid="triggerIcon" />
        <MenuTriggerItemIcon
          ref={getRef('triggerItemIcon', refs.triggerItemIcon)}
          data-testid="triggerItemIcon"
        />
        <DrawerHeader ref={getRef('header', refs.header)} data-testid="header" />
        <DrawerBody ref={getRef('body', refs.body)} data-testid="body" />
        <DrawerFooter ref={getRef('footer', refs.footer)} data-testid="footer" />
      </>,
    );

    for (const [name, ref] of Object.entries(refs)) {
      expect(kind === 'object' ? ref.current : nodes[name]).toBe(screen.getByTestId(name));
    }
  },
);

test('composes Drawer helper refs with an asChild host ref', () => {
  const headerRef = createRef<HTMLDivElement>();
  const hostRef = createRef<HTMLElement>();
  render(
    <DrawerHeader ref={headerRef} asChild>
      <section ref={hostRef} data-testid="custom-header">
        Custom header
      </section>
    </DrawerHeader>,
  );
  expect(headerRef.current).toBe(screen.getByTestId('custom-header'));
  expect(hostRef.current).toBe(headerRef.current);
});