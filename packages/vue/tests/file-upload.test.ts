import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItems,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
  useFileUpload,
} from '../src';

const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
const imageWithoutMimeType = new File(['moduix'], 'moduix.png');

const fileUploadComponents = {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItems,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
} as Record<string, Component>;

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
    const App = defineComponent({
      components: fileUploadComponents,
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
      <FileUpload v-model:accepted-files="acceptedFiles" :disabled="disabled" :read-only="readOnly"
        @file-change="changes">
        <FileUploadClearTrigger ref="triggerRef" :as-child="asChild" :aria-label="label"
          :aria-labelledby="labelledby" class="consumer-clear" style="color: red"
          title="Clear attachments" data-testid="clear" @click="click">
          <template v-if="asChild" #default><button type="button">Custom clear</button></template>
        </FileUploadClearTrigger>
      </FileUpload>
    `,
    });

    render(App);
    const trigger = screen.getByTestId('clear');
    expect(trigger).toHaveAccessibleName('Clear files');
    expect(trigger).toBeDisabled();
    expect(triggerRef.value?.$el).toBe(trigger);
    expect(trigger).toHaveAttribute('data-slot', 'file-upload-clear-trigger');
    expect(trigger).toHaveClass('consumer-clear');
    expect(trigger).toHaveStyle({ color: 'red' });
    expect(trigger).toHaveAttribute('title', 'Clear attachments');
    expect(trigger.querySelector('svg') !== null).toBe(!asChild);
    await fireEvent.click(trigger);
    expect(changes).not.toHaveBeenCalled();
    expect(acceptedFiles.value).toEqual([file]);

    disabled.value = false;
    await waitFor(() => expect(trigger).not.toBeDisabled());
    label.value = 'Clear selected files';
    await waitFor(() => expect(trigger).toHaveAccessibleName('Clear selected files'));
    label.value = '';
    await waitFor(() => expect(trigger).toHaveAttribute('aria-label', ''));
    label.value = undefined;
    labelledby.value = 'clear-files-label';
    await waitFor(() => expect(trigger).toHaveAccessibleName('Remove attachments'));
    expect(trigger).not.toHaveAttribute('aria-label');
    labelledby.value = undefined;
    await waitFor(() => expect(trigger).toHaveAccessibleName('Clear files'));

    readOnly.value = true;
    await waitFor(() => expect(trigger).toBeDisabled());
    await fireEvent.click(trigger);
    expect(changes).not.toHaveBeenCalled();
    readOnly.value = false;
    await waitFor(() => expect(trigger).not.toBeDisabled());
    click.mockClear();
    await fireEvent.click(trigger);
    await waitFor(() => expect(acceptedFiles.value).toEqual([]));
    expect(changes).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveAttribute('hidden');
    expect(triggerRef.value?.$el).toBe(trigger);
  },
);

test('renders a keyboard-focusable dropzone and a clearly named default clear action', () => {
  render({
    components: fileUploadComponents,
    template: `
      <FileUpload :default-accepted-files="[file]">
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadDropzone data-testid="dropzone" />
        <FileUploadClearTrigger />
      </FileUpload>
    `,
    setup: () => ({ file }),
  });

  const dropzone = screen.getByTestId('dropzone');
  dropzone.focus();

  expect(dropzone).toHaveAttribute('role', 'button');
  expect(dropzone).toHaveAttribute('tabindex', '0');
  expect(dropzone).toHaveFocus();
  expect(screen.getByRole('button', { name: 'Clear files' })).toHaveAttribute(
    'data-slot',
    'file-upload-clear-trigger',
  );
});

test('forwards Dropzone disable-click to Ark', () => {
  render({
    components: fileUploadComponents,
    template: `
      <FileUpload>
        <FileUploadDropzone disable-click data-testid="dropzone" />
      </FileUpload>
    `,
  });

  const dropzone = screen.getByTestId('dropzone');
  expect(dropzone).toHaveAttribute('role', 'application');
  expect(dropzone).not.toHaveAttribute('tabindex');
});

test('keeps the default clear label when composing the trigger with asChild', () => {
  render({
    components: fileUploadComponents,
    template: `
      <FileUpload :default-accepted-files="[file]">
        <FileUploadClearTrigger as-child>
          <button data-testid="custom-clear">Clear</button>
        </FileUploadClearTrigger>
      </FileUpload>
    `,
    setup: () => ({ file }),
  });

  expect(screen.getByTestId('custom-clear')).toHaveAccessibleName('Clear files');
});

test('keeps native form, disabled, and controlled file-change contracts intact', async () => {
  const values: File[][] = [];
  const Harness = defineComponent({
    components: fileUploadComponents,
    setup() {
      const acceptedFiles = ref<File[]>([]);
      return { acceptedFiles, file, values };
    },
    template: `
      <form>
        <FileUpload v-model:accepted-files="acceptedFiles" disabled name="attachments" required :max-files="2" @file-change="values.push($event.acceptedFiles)">
          <FileUploadLabel>Attachments</FileUploadLabel>
          <FileUploadDropzone data-testid="disabled-dropzone" />
          <FileUploadTrigger>Choose files</FileUploadTrigger>
          <FileUploadHiddenInput />
        </FileUpload>
      </form>
    `,
  });

  const { container } = render(Harness);
  const input = container.querySelector<HTMLInputElement>('input[type="file"]');

  expect(input).not.toBeNull();
  expect(input).toHaveAttribute('name', 'attachments');
  expect(input).toBeRequired();
  expect(input).toHaveAttribute('multiple');
  expect(input).toHaveAttribute('aria-hidden', 'true');
  expect(screen.getByTestId('disabled-dropzone')).toHaveAttribute('aria-disabled', 'true');
  expect(screen.getByRole('button', { name: 'Choose files' })).toBeDisabled();

  await fireEvent.change(input!, { target: { files: [file] } });
  await waitFor(() => expect(values).toEqual([]));
});

test('preserves RootProvider state with an explicit hidden input', () => {
  const ProviderUpload = defineComponent({
    components: fileUploadComponents,
    setup() {
      const upload = useFileUpload({ defaultAcceptedFiles: [file] });
      return { upload };
    },
    template: `
      <FileUploadRootProvider :value="upload" data-testid="provider">
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
        <FileUploadHiddenInput />
      </FileUploadRootProvider>
    `,
  });

  render(ProviderUpload);

  expect(screen.getByTestId('provider')).toHaveAttribute('data-slot', 'file-upload-root-provider');
  expect(screen.getByText('moduix.txt')).toBeInTheDocument();
  expect(document.querySelector('input[type="file"]')).not.toBeNull();
});

test('uses a generic preview when an image filename has no image MIME type', () => {
  render({
    components: fileUploadComponents,
    template: `
      <FileUpload :default-accepted-files="[file]">
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
      </FileUpload>
    `,
    setup: () => ({ file: imageWithoutMimeType }),
  });

  expect(document.querySelector('[data-slot="file-upload-item-preview-image"]')).toBeNull();
  expect(document.querySelector('[data-slot="file-upload-item-preview-icon"]')).not.toBeNull();
  expect(screen.getByRole('button', { name: 'Remove moduix.png' })).toBeInTheDocument();
});

test('keeps Ark item name and size fallbacks when their slots are omitted', () => {
  render({
    components: fileUploadComponents,
    template: `
      <FileUpload :default-accepted-files="[file]">
        <FileUploadItemGroup>
          <FileUploadItem :file="file">
            <FileUploadItemName />
            <FileUploadItemSizeText />
          </FileUploadItem>
        </FileUploadItemGroup>
      </FileUpload>
    `,
    setup: () => ({ file }),
  });

  expect(screen.getByText('moduix.txt')).toBeInTheDocument();
  expect(document.querySelector('[data-slot="file-upload-item-size-text"]')).not.toBeNull();
});

test('preserves Root asChild composition, refs, and an explicit hidden input', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: fileUploadComponents,
    setup() {
      return { rootRef, triggerRef };
    },
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

  render(Harness);
  const root = screen.getByTestId('custom-root');

  expect(rootRef.value?.$el).toBe(root);
  expect(triggerRef.value?.$el).toBe(screen.getByRole('button', { name: 'Choose files' }));
  expect(root.querySelector('input[type="file"]')).not.toBeNull();
  expect(root).toHaveAttribute('data-slot', 'file-upload-root');
});

test('renders a custom item through the native scoped context slot', () => {
  render({
    components: fileUploadComponents,
    template: `
      <FileUpload :default-accepted-files="[file]">
        <FileUploadItemGroup>
          <FileUploadContext v-slot="{ acceptedFiles }">
            <FileUploadItem v-for="item in acceptedFiles" :key="item.name" :file="item">
              <FileUploadItemName />
            </FileUploadItem>
          </FileUploadContext>
        </FileUploadItemGroup>
      </FileUpload>
    `,
    setup: () => ({ file }),
  });

  expect(screen.getByText('moduix.txt')).toBeInTheDocument();
});

test('renders and hydrates an SSR tree with stable FileUpload anatomy', async () => {
  const Harness = defineComponent({
    components: fileUploadComponents,
    setup: () => ({ file }),
    template: `
      <FileUpload :default-accepted-files="[file]">
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadDropzone><FileUploadDropzoneIcon /></FileUploadDropzone>
        <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
        <FileUploadClearTrigger />
        <FileUploadHiddenInput />
      </FileUpload>
    `,
  });
  const markup = await renderToString(createSSRApp(Harness));
  const host = document.createElement('div');
  host.innerHTML = markup;
  document.body.append(host);
  const serverClear = host.querySelector('[data-slot="file-upload-clear-trigger"]');
  expect(serverClear).toHaveAttribute('aria-label', 'Clear files');

  const app = createSSRApp(Harness);
  app.mount(host);

  expect(host.querySelector('[data-slot="file-upload-root"]')).toBeInTheDocument();
  expect(host.querySelector('[data-slot="file-upload-dropzone-icon"]')).toBeInTheDocument();
  expect(host.querySelector('input[type="file"]')).toBeInTheDocument();
  expect(host.querySelector('[data-slot="file-upload-clear-trigger"]')).toBe(serverClear);
  app.unmount();
  host.remove();
});