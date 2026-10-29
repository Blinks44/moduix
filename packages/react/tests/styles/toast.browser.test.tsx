import { expect, test } from '@rstest/core';
import { render, screen, within } from '@testing-library/react';
import { ToastToaster, createToaster } from '@/index';

test('portals by default, supports inline rendering, and accepts a custom portal target', async () => {
  const portalledToaster = createToaster({ duration: Infinity });
  const portalled = render(<ToastToaster toaster={portalledToaster} />);

  portalledToaster.create({ title: 'Portalled toast' });
  const portalledTitle = await screen.findByText('Portalled toast');
  expect(portalled.container!.contains(portalledTitle)).not.toBe(true);
  portalled.unmount();

  const inlineToaster = createToaster({ duration: Infinity });
  const inline = render(<ToastToaster toaster={inlineToaster} portalled={false} />);

  inlineToaster.create({ title: 'Inline toast' });
  const inlineTitle = await screen.findByText('Inline toast');
  expect(inline.container!.contains(inlineTitle)).toBe(true);
  inline.unmount();

  const customToaster = createToaster({ duration: Infinity });
  const portalRef = { current: document.createElement('div') };
  document.body.append(portalRef.current);
  const custom = render(<ToastToaster toaster={customToaster} portalRef={portalRef} />);
  customToaster.create({ title: 'Custom portal toast' });

  expect(
    Boolean((await within(portalRef.current).findByText('Custom portal toast'))?.isConnected),
  ).toBe(true);
  custom.unmount();
  portalRef.current.remove();
});