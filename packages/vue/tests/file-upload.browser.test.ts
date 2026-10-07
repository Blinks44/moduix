import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItems,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
  useFileUpload,
} from '../src';
import TestFileUpload from './fixtures/TestFileUpload.vue';

const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
const imageWithoutMimeType = new File(['moduix'], 'moduix.png');

const image = new File(
  [
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24"><rect width="32" height="24" fill="red"/></svg>',
  ],
  'photo.svg',
  { type: 'image/svg+xml' },
);
const components = {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItems,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
};

test('uses MIME type or FILE for filenames without an extension', async () => {
  const files = [
    new File(['readme'], 'README', { type: 'text/plain' }),
    new File(['license'], 'LICENSE'),
  ];
  render({
    components,
    setup: () => ({ files }),
    template:
      '<FileUpload :default-accepted-files="files" :max-files="2"><FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup></FileUpload>',
  });
  const metadata = page.locator('[data-slot="file-upload-item-metadata"]');
  await expect.element(metadata.nth(0)).toContainText('text/plain');
  await expect.element(metadata.nth(1)).toContainText('FILE');
});

test.each([false, true])(
  'preserves clear state, labels, attrs, and refs with asChild=%s',
  async (asChild) => {
    const acceptedFiles = ref([file]);
    const disabled = ref(true);
    const readOnly = ref(false);
    const label = ref<string>();
    const labelledby = ref<string>();
    const triggerRef = ref<ComponentPublicInstance>();
    const changes = rs.fn();
    const click = rs.fn();
    const { container } = render({
      components,
      setup: () => ({
        acceptedFiles,
        disabled,
        readOnly,
        label,
        labelledby,
        triggerRef,
        changes,
        click,
        asChild,
      }),
      template: `
      <span id="clear-files-label">Remove attachments</span>
      <FileUpload v-model:accepted-files="acceptedFiles" :disabled="disabled" :read-only="readOnly" @file-change="changes">
        <FileUploadClearTrigger ref="triggerRef" :as-child="asChild" :aria-label="label" :aria-labelledby="labelledby"
          class="consumer-clear" style="color: red" title="Clear attachments" data-testid="clear" @click="click">
          <template v-if="asChild" #default><button type="button">Custom clear</button></template>
        </FileUploadClearTrigger>
      </FileUpload>
    `,
    });
    const clear = page.getByTestId('clear');
    await expect.element(page.getByRole('button', { name: 'Clear files' })).toHaveCount(1);
    await expect.element(clear).toBeDisabled();
    await expect.element(clear).toHaveAttribute('data-slot', 'file-upload-clear-trigger');
    await expect.element(clear).toHaveAttribute('title', 'Clear attachments');
    await expect.element(clear).toHaveCSS('color', 'rgb(255, 0, 0)');
    const trigger = container.querySelector('[data-testid="clear"]')!;
    expect(triggerRef.value?.$el).toBe(trigger);
    expect(trigger.classList.contains('consumer-clear')).toBe(true);
    expect(trigger.querySelector('svg') !== null).toBe(!asChild);
    // Deliberate dispatch verifies Ark's guard even for a programmatic disabled click.
    await clear.dispatchEvent('click');
    expect(changes).not.toHaveBeenCalled();
    expect(acceptedFiles.value).toEqual([file]);
    disabled.value = false;
    await expect.element(clear).toBeEnabled();
    label.value = 'Clear selected files';
    await expect.element(page.getByRole('button', { name: 'Clear selected files' })).toHaveCount(1);
    label.value = '';
    await expect.element(clear).toHaveAttribute('aria-label', '');
    label.value = undefined;
    labelledby.value = 'clear-files-label';
    await expect.element(page.getByRole('button', { name: 'Remove attachments' })).toHaveCount(1);
    await expect.element(clear).not.toHaveAttribute('aria-label');
    labelledby.value = undefined;
    await expect.element(page.getByRole('button', { name: 'Clear files' })).toHaveCount(1);
    readOnly.value = true;
    await expect.element(clear).toBeDisabled();
    await clear.dispatchEvent('click');
    expect(changes).not.toHaveBeenCalled();
    readOnly.value = false;
    await expect.element(clear).toBeEnabled();
    click.mockClear();
    await page.getByRole('button', { name: 'Clear files' }).click();
    await expect.poll(() => acceptedFiles.value).toEqual([]);
    expect(changes).toHaveBeenCalledTimes(1);
    expect(changes).toHaveBeenCalledWith({ acceptedFiles: [], rejectedFiles: [] });
    expect(click).toHaveBeenCalledTimes(1);
    await expect.element(clear).toHaveAttribute('hidden', '');
    expect(triggerRef.value?.$el).toBe(trigger);
  },
);

test('focuses the dropzone and forwards disable-click to Ark', async () => {
  const disableClick = ref(false);
  render({
    components,
    setup: () => ({ disableClick }),
    template:
      '<FileUpload><FileUploadDropzone :disable-click="disableClick" data-testid="dropzone" /></FileUpload>',
  });
  const dropzone = page.getByTestId('dropzone');
  await expect.element(dropzone).toHaveAttribute('role', 'button');
  await expect.element(dropzone).toHaveAttribute('tabindex', '0');
  await dropzone.focus();
  await expect.element(dropzone).toBeFocused();
  disableClick.value = true;
  await expect.element(dropzone).toHaveAttribute('role', 'application');
  await expect.element(dropzone).not.toHaveAttribute('tabindex');
});

test('preserves native input attributes and ignores change while disabled', async () => {
  const acceptedFiles = ref<File[]>([]);
  const changes: File[][] = [];
  const { container } = render({
    components,
    setup: () => ({ acceptedFiles, changes }),
    template: `
      <form>
        <FileUpload v-model:accepted-files="acceptedFiles" disabled name="attachments" required :max-files="2" @file-change="changes.push($event.acceptedFiles)">
          <FileUploadLabel>Attachments</FileUploadLabel>
          <FileUploadDropzone data-testid="disabled-dropzone" />
          <FileUploadTrigger>Choose files</FileUploadTrigger>
          <FileUploadHiddenInput />
        </FileUpload>
      </form>
    `,
  });
  const input = page.locator('input[type="file"]');
  await expect.element(input).toHaveAttribute('name', 'attachments');
  await expect.element(input).toHaveAttribute('required', '');
  await expect.element(input).toHaveAttribute('multiple', '');
  await expect.element(input).toHaveAttribute('aria-hidden', 'true');
  await expect
    .element(page.getByTestId('disabled-dropzone'))
    .toHaveAttribute('aria-disabled', 'true');
  await expect.element(page.getByRole('button', { name: 'Choose files' })).toBeDisabled();
  const transfer = new DataTransfer();
  transfer.items.add(file);
  container.querySelector<HTMLInputElement>('input[type="file"]')!.files = transfer.files;
  await input.dispatchEvent('change');
  expect(changes).toEqual([]);
  expect(acceptedFiles.value).toEqual([]);
});

test('preserves provider refs, one preview per file, MIME fallback, and removal', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const { container } = render({
    components,
    setup: () => ({
      rootRef,
      upload: useFileUpload({
        defaultAcceptedFiles: [image, file, imageWithoutMimeType],
        maxFiles: 3,
      }),
    }),
    template: `
      <FileUploadRootProvider ref="rootRef" :value="upload" data-testid="provider">
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
        <FileUploadHiddenInput />
      </FileUploadRootProvider>
    `,
  });
  await expect
    .element(page.getByTestId('provider'))
    .toHaveAttribute('data-slot', 'file-upload-root-provider');
  expect(rootRef.value?.$el).toBe(container.querySelector('[data-testid="provider"]'));
  await expect.element(page.locator('input[type="file"]')).toHaveCount(1);
  await expect.element(page.getByText('moduix.txt', { exact: true })).toBeVisible();
  await expect.element(page.locator('[data-slot="file-upload-item"]')).toHaveCount(3);
  const items = container.querySelectorAll('[data-slot="file-upload-item"]');
  for (const [index, item] of [...items].entries()) {
    expect(item.querySelectorAll('[data-slot="file-upload-item-preview"]')).toHaveLength(1);
    expect(item.querySelector('[data-slot="file-upload-item-preview-image"]') !== null).toBe(
      index === 0,
    );
    expect(item.querySelector('[data-slot="file-upload-item-preview-icon"]') !== null).toBe(
      index !== 0,
    );
  }
  const preview = items[0]!.querySelector<HTMLImageElement>('img')!;
  await expect.poll(() => preview.naturalWidth).toBe(32);

  await page.getByRole('button', { name: 'Remove moduix.png' }).click();
  await expect.element(page.getByRole('button', { name: 'Remove moduix.png' })).toHaveCount(0);
  await expect.element(page.locator('[data-slot="file-upload-item"]')).toHaveCount(2);
});

test('renders native scoped context with omitted item name and size slots', async () => {
  render({
    components,
    setup: () => ({ file }),
    template: `
      <FileUpload :default-accepted-files="[file]">
        <FileUploadItemGroup>
          <FileUploadContext v-slot="{ acceptedFiles }">
            <FileUploadItem v-for="item in acceptedFiles" :key="item.name" :file="item">
              <FileUploadItemName /><FileUploadItemSizeText />
            </FileUploadItem>
          </FileUploadContext>
        </FileUploadItemGroup>
      </FileUpload>
    `,
  });
  await expect.element(page.getByText('moduix.txt', { exact: true })).toBeVisible();
  await expect
    .element(page.locator('[data-slot="file-upload-item-size-text"]'))
    .toHaveText('6 byte');
});

test('preserves Root asChild refs and an explicit hidden input', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const { container } = render({
    components,
    setup: () => ({ rootRef, triggerRef }),
    template: `
      <FileUpload ref="rootRef" as-child>
        <div data-testid="custom-root">
          <FileUploadLabel>Attachments</FileUploadLabel>
          <FileUploadTrigger ref="triggerRef">Choose files</FileUploadTrigger>
          <FileUploadHiddenInput />
        </div>
      </FileUpload>
    `,
  });
  await expect.element(page.getByRole('button', { name: 'Choose files' })).toBeVisible();
  const root = container.querySelector('[data-testid="custom-root"]')!;
  expect(rootRef.value?.$el).toBe(root);
  expect(triggerRef.value?.$el).toBe(root.querySelector('button'));
  expect(root.querySelectorAll('input[type="file"]')).toHaveLength(1);
  expect(root.getAttribute('data-slot')).toBe('file-upload-root');
});

test('hydrates stable hosts and ids and still clears files', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestFileUpload));
  document.body.append(host);
  const parts = [...host.querySelectorAll('[data-slot]')];
  const ids = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestFileUpload);
  try {
    app.mount(host);
    await expect.element(page.getByRole('button', { name: 'Clear files' })).toBeVisible();
    const hydrated = [...host.querySelectorAll('[data-slot]')];
    expect(hydrated).toHaveLength(parts.length);
    hydrated.forEach((element, index) => expect(element).toBe(parts[index]));
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(ids);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(host.querySelector('input[type="file"]')).not.toBeNull();
    await page.getByRole('button', { name: 'Clear files' }).click();
    await expect.element(page.getByText('moduix.txt', { exact: true })).toHaveCount(0);
    await expect
      .element(page.locator('[data-slot="file-upload-clear-trigger"]'))
      .toHaveAttribute('hidden', '');
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});