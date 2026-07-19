import { Field, FileUpload, Textarea, useFileUpload } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';
import styles from './file-upload.module.css';

export const fileUploadExampleCss = `
  .file-upload-demo {
    width: min(28rem, 100%);
  }

  .file-upload-simple-demo {
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-4);
    background-color: color-mix(in oklab, var(--color-muted) 32%, var(--color-background));
  }

  .file-upload-stack {
    display: grid;
    gap: var(--spacing-3);
  }

  .file-upload-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    --file-upload-action-size: var(--file-upload-trigger-height, var(--button-size-md, var(--size-lg)));
  }

  .file-upload-dropzone-content {
    display: grid;
    justify-items: center;
    gap: var(--spacing-1);
  }

  .file-upload-dropzone-content [data-slot='file-upload-trigger'] {
    margin-top: var(--spacing-2);
  }

  .file-upload-dropzone-title {
    color: var(--color-foreground);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    line-height: var(--line-height-text-sm);
  }

  .file-upload-dropzone-description {
    color: var(--color-muted-foreground);
    font-size: var(--text-xs);
    line-height: var(--line-height-text-xs);
  }

  .file-upload-state,
  .file-upload-error {
    margin: 0;
    color: var(--color-muted-foreground);
    font-size: var(--text-xs);
    line-height: var(--line-height-text-xs);
  }

  .file-upload-error {
    color: var(--color-destructive);
  }

  .file-upload-submit {
    justify-self: start;
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--spacing-2) var(--spacing-3);
    background-color: var(--color-background);
    color: var(--color-foreground);
    font: inherit;
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

`;

export const fileUploadBasicData = `
  const maxFiles = 3;
`;

export const fileUploadDropzoneData = `
  const maxFiles = 5;
`;

export const fileUploadAcceptedTypesData = `
  const accept = "image/png,image/jpeg";
  const maxFiles = 4;
`;

export const fileUploadRejectedFilesData = `
  const accept = "image/*";
  const maxFiles = 2;
  const maxFileSize = 120_000;
`;

export const fileUploadErrorHandlingData = `
  const accept = "image/*";
  const maxFiles = 2;
  const maxFileSize = 120_000;
`;

export const fileUploadInitialFilesData = `
  const initialFiles = [
    new File(["Welcome to moduix"], "README.md", { type: "text/plain" }),
  ];
`;

export const fileUploadClearTriggerData = `
  const maxFiles = 3;
`;

export const fileUploadFieldData = `
  const name = "attachments";
  const maxFiles = 3;
`;

export const fileUploadFormData = `
  const name = "project-assets";
  const maxFiles = 3;
`;

export const fileUploadRootProviderData = `
  const maxFiles = 3;
  const accept = "image/*";
`;

export const fileUploadDirectoryData = `
  const maxFiles = 20;
`;

export const fileUploadMediaCaptureData = `
  const capture = "environment";
  const accept = "image/*";
  const maxFiles = 1;
`;

export const fileUploadTransformData = `
  const accept = "image/*";
`;

export const fileUploadOverrideCssProperties: CssPropertyInput[] = [
  ['--file-upload-action-bg', 'transparent', 'Controls delete and clear button background.'],
  [
    '--file-upload-action-bg-hover',
    'var(--color-muted)',
    'Controls delete and clear button hover background.',
  ],
  [
    '--file-upload-action-color',
    'var(--color-muted-foreground)',
    'Controls delete and clear button color.',
  ],
  [
    '--file-upload-action-color-hover',
    'var(--color-foreground)',
    'Controls delete and clear button hover color.',
  ],
  ['--file-upload-action-icon-size', '1rem', 'Controls delete and clear icon size.'],
  ['--file-upload-action-radius', 'var(--radius-sm)', 'Controls delete and clear button radius.'],
  ['--file-upload-action-size', '2rem', 'Controls delete and clear button size.'],
  [
    '--file-upload-clear-trigger-color',
    'var(--color-muted-foreground)',
    'Controls clear trigger text color.',
  ],
  ['--file-upload-clear-trigger-font-size', 'var(--text-sm)', 'Controls clear trigger font size.'],
  ['--file-upload-clear-trigger-gap', 'var(--spacing-2)', 'Controls clear trigger content gap.'],
  [
    '--file-upload-clear-trigger-line-height',
    'var(--line-height-text-sm)',
    'Controls clear trigger line height.',
  ],
  [
    '--file-upload-clear-trigger-padding-x',
    'var(--spacing-2)',
    'Controls clear trigger horizontal padding.',
  ],
  ['--file-upload-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--file-upload-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--file-upload-dropzone-bg', 'var(--color-background)', 'Controls dropzone background.'],
  [
    '--file-upload-dropzone-bg-dragging',
    'var(--color-accent)',
    'Controls dropzone background while dragging.',
  ],
  ['--file-upload-dropzone-border-color', 'var(--color-border)', 'Controls dropzone border color.'],
  [
    '--file-upload-dropzone-border-color-dragging',
    'var(--color-primary)',
    'Controls dropzone border color while dragging.',
  ],
  [
    '--file-upload-dropzone-border-width',
    'var(--border-width-sm)',
    'Controls dropzone border width.',
  ],
  [
    '--file-upload-dropzone-color',
    'var(--color-muted-foreground)',
    'Controls dropzone text color.',
  ],
  [
    '--file-upload-dropzone-color-dragging',
    'var(--color-foreground)',
    'Controls dropzone text color while dragging.',
  ],
  ['--file-upload-dropzone-gap', 'var(--spacing-3)', 'Controls dropzone content gap.'],
  ['--file-upload-dropzone-icon-bg', 'var(--color-muted)', 'Controls dropzone icon background.'],
  [
    '--file-upload-dropzone-icon-border-color',
    'var(--color-border)',
    'Controls dropzone icon border color.',
  ],
  [
    '--file-upload-dropzone-icon-border-width',
    'var(--border-width-sm)',
    'Controls dropzone icon border width.',
  ],
  ['--file-upload-dropzone-icon-box-size', '2.5rem', 'Controls dropzone icon box size.'],
  ['--file-upload-dropzone-icon-color', 'var(--color-foreground)', 'Controls dropzone icon color.'],
  ['--file-upload-dropzone-icon-radius', 'var(--radius-full)', 'Controls dropzone icon radius.'],
  ['--file-upload-dropzone-icon-size', '1rem', 'Controls dropzone icon size.'],
  ['--file-upload-dropzone-min-height', '8rem', 'Controls dropzone minimum height.'],
  ['--file-upload-dropzone-padding', 'var(--spacing-5)', 'Controls dropzone padding.'],
  ['--file-upload-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--file-upload-focus-ring-offset',
    'var(--border-width-sm)',
    'Controls action focus ring offset.',
  ],
  ['--file-upload-focus-ring-width', 'var(--border-width-md)', 'Controls focus ring width.'],
  ['--file-upload-gap', 'var(--spacing-3)', 'Controls spacing between root children.'],
  [
    '--file-upload-invalid-color',
    'var(--color-destructive)',
    'Controls invalid and rejected borders.',
  ],
  ['--file-upload-item-bg', 'var(--color-background)', 'Controls item background.'],
  ['--file-upload-item-border-color', 'var(--color-border)', 'Controls item border color.'],
  ['--file-upload-item-border-width', 'var(--border-width-sm)', 'Controls item border width.'],
  ['--file-upload-item-color', 'var(--color-foreground)', 'Controls item text color.'],
  ['--file-upload-item-gap', 'var(--spacing-3)', 'Controls item column gap.'],
  ['--file-upload-item-group-gap', 'var(--spacing-2)', 'Controls item group gap.'],
  ['--file-upload-item-min-height', '2.5rem', 'Controls compact item minimum height.'],
  ['--file-upload-item-name-color', 'currentColor', 'Controls file name color.'],
  ['--file-upload-item-name-font-size', 'var(--text-sm)', 'Controls file name font size.'],
  [
    '--file-upload-item-name-font-weight',
    'var(--weight-medium)',
    'Controls file name font weight.',
  ],
  [
    '--file-upload-item-name-line-height',
    'var(--line-height-text-sm)',
    'Controls file name line height.',
  ],
  ['--file-upload-item-padding-x', 'var(--spacing-3)', 'Controls item horizontal padding.'],
  ['--file-upload-item-padding-y', 'var(--spacing-2)', 'Controls item vertical padding.'],
  ['--file-upload-item-preview-bg', 'var(--color-muted)', 'Controls preview background.'],
  [
    '--file-upload-item-preview-color',
    'var(--color-muted-foreground)',
    'Controls preview icon color.',
  ],
  ['--file-upload-item-preview-min-height', '3rem', 'Controls preview item minimum height.'],
  [
    '--file-upload-item-preview-padding-y',
    'var(--spacing-2)',
    'Controls preview item vertical padding.',
  ],
  ['--file-upload-item-preview-radius', 'var(--radius-sm)', 'Controls preview box radius.'],
  ['--file-upload-item-preview-size', 'var(--spacing-10)', 'Controls preview box size.'],
  ['--file-upload-item-radius', 'var(--radius-md)', 'Controls item radius.'],
  ['--file-upload-item-row-gap', 'var(--spacing-1)', 'Controls item row gap.'],
  [
    '--file-upload-item-size-color',
    'var(--color-muted-foreground)',
    'Controls file size text color.',
  ],
  ['--file-upload-item-size-font-size', 'var(--text-xs)', 'Controls file size font size.'],
  [
    '--file-upload-item-size-line-height',
    'var(--line-height-text-xs)',
    'Controls file size line height.',
  ],
  [
    '--file-upload-label-color',
    'var(--file-upload-color, var(--color-foreground))',
    'Controls label color.',
  ],
  ['--file-upload-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--file-upload-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--file-upload-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--file-upload-max-width', '28rem', 'Controls root maximum width.'],
  ['--file-upload-radius', 'var(--radius-md)', 'Controls shared dropzone and item radius.'],
  ['--file-upload-transition', 'var(--transition-default)', 'Controls interactive transitions.'],
  [
    '--file-upload-trigger-bg',
    'var(--button-default-bg, var(--color-primary))',
    'Controls trigger background.',
  ],
  [
    '--file-upload-trigger-bg-hover',
    'var(--button-default-bg-hover, var(--color-foreground))',
    'Controls trigger hover background.',
  ],
  [
    '--file-upload-trigger-border-color',
    'var(--button-default-border-color, var(--color-primary))',
    'Controls trigger border color.',
  ],
  [
    '--file-upload-trigger-border-width',
    'var(--button-border-width, var(--border-width-sm))',
    'Controls trigger border width.',
  ],
  [
    '--file-upload-trigger-color',
    'var(--button-default-color, var(--color-primary-foreground))',
    'Controls trigger text color.',
  ],
  [
    '--file-upload-trigger-font-size',
    'var(--button-font-size, var(--text-sm))',
    'Controls trigger font size.',
  ],
  [
    '--file-upload-trigger-font-weight',
    'var(--button-font-weight, var(--weight-medium))',
    'Controls trigger font weight.',
  ],
  [
    '--file-upload-trigger-gap',
    'var(--button-content-gap, var(--spacing-2))',
    'Controls trigger content gap.',
  ],
  [
    '--file-upload-trigger-height',
    'var(--button-size-md, var(--size-lg))',
    'Controls trigger height.',
  ],
  [
    '--file-upload-trigger-line-height',
    'var(--button-line-height, var(--line-height-text-sm))',
    'Controls trigger line height.',
  ],
  [
    '--file-upload-trigger-padding-x',
    'var(--button-padding-x-md, 1rem)',
    'Controls trigger horizontal padding.',
  ],
  [
    '--file-upload-trigger-radius',
    'var(--button-radius, var(--radius-md))',
    'Controls trigger radius.',
  ],
  ['--file-upload-width', '100%', 'Controls root width.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function FileUploadCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={fileUploadOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function getInitialFiles() {
  return [new File(['Welcome to moduix'], 'README.md', { type: 'text/plain' })];
}

function getPreviewFiles() {
  return [
    new File(
      [
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" fill="#dbeafe"/><circle cx="78" cy="86" r="28" fill="#60a5fa"/><path d="M0 190l68-66 45 42 35-30 92 92v12H0z" fill="#2563eb"/></svg>`,
      ],
      'workspace.svg',
      { type: 'image/svg+xml' },
    ),
    new File(['Project brief'], 'project-brief.pdf', { type: 'application/pdf' }),
  ];
}

const isImageFile = (file: File) =>
  file.type.startsWith('image/') || /\.(avif|bmp|gif|jpe?g|png|svg|webp)$/i.test(file.name);

function AcceptedFileItems() {
  return (
    <FileUpload.Context>
      {({ acceptedFiles }) =>
        acceptedFiles.map((file) => (
          <FileUpload.Item key={`${file.name}-${file.size}`} file={file}>
            {isImageFile(file) ? (
              <FileUpload.ItemPreview>
                <FileUpload.ItemPreviewImage />
              </FileUpload.ItemPreview>
            ) : (
              <FileUpload.ItemPreview>
                <FileUpload.ItemPreviewIcon />
              </FileUpload.ItemPreview>
            )}
            <FileUpload.ItemName />
            <FileUpload.ItemMetadata file={file} />
            <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
          </FileUpload.Item>
        ))
      }
    </FileUpload.Context>
  );
}

function RejectedFileItems() {
  return (
    <FileUpload.Context>
      {({ rejectedFiles }) =>
        rejectedFiles.map(({ file, errors }) => (
          <FileUpload.Item key={`${file.name}-${file.size}`} file={file}>
            <FileUpload.ItemName />
            <p className={styles.error}>{errors.join(', ')}</p>
            <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
          </FileUpload.Item>
        ))
      }
    </FileUpload.Context>
  );
}

function FileUploadTriggerExample(props: ComponentProps<typeof FileUpload.Root>) {
  return (
    <FileUpload.Root className={`${styles.demo} ${styles.simpleDemo}`} {...props}>
      <FileUpload.Label>Attachments</FileUpload.Label>
      <FileUpload.Trigger>Choose files</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
}

function FileUploadDropzoneExample(props: ComponentProps<typeof FileUpload.Root>) {
  return (
    <FileUpload.Root className={styles.demo} maxFiles={5} {...props}>
      <FileUpload.Label>Project files</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drag and drop files here</span>
          <span className={styles.dropzoneDescription}>or browse from your device</span>
          <FileUpload.Trigger>Browse files</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
}

export function FileUploadAdvancedCustomizationExample() {
  return (
    <FileUpload.Root className={styles.demo} maxFiles={5}>
      <FileUpload.Label>Project files</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drag and drop files here</span>
          <span className={styles.dropzoneDescription}>or browse from your device</span>
          <FileUpload.Trigger>Browse files</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <AcceptedFileItems />
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
}

export function FileUploadPreviewExample() {
  return (
    <FileUpload.Root className={styles.demo} defaultAcceptedFiles={getPreviewFiles()} maxFiles={4}>
      <FileUpload.Label>Project attachments</FileUpload.Label>
      <FileUpload.Trigger>Add files</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
}

export function FileUploadExample() {
  return <FileUploadTriggerExample maxFiles={3} />;
}

export function FileUploadDropzoneDemo() {
  return <FileUploadDropzoneExample />;
}

export function FileUploadAcceptedTypesExample() {
  return (
    <FileUpload.Root className={styles.demo} accept="image/png,image/jpeg" maxFiles={4}>
      <FileUpload.Label>Images</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drop PNG or JPEG files here</span>
          <span className={styles.dropzoneDescription}>Only PNG and JPEG files are accepted</span>
          <FileUpload.Trigger>Select images</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <AcceptedFileItems />
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
}

export function FileUploadRejectedFilesExample() {
  return (
    <FileUpload.Root className={styles.demo} accept="image/*" maxFiles={2} maxFileSize={120_000}>
      <FileUpload.Label>Images</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drop image files here</span>
          <span className={styles.dropzoneDescription}>PNG or JPEG, up to 120 KB</span>
          <FileUpload.Trigger>Select images</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <AcceptedFileItems />
      </FileUpload.ItemGroup>
      <FileUpload.ItemGroup type="rejected">
        <RejectedFileItems />
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
}

export function FileUploadErrorHandlingExample() {
  const [message, setMessage] = useState('');

  return (
    <div className={styles.stack}>
      <FileUpload.Root
        className={`${styles.demo} ${styles.simpleDemo}`}
        accept="image/*"
        maxFiles={2}
        maxFileSize={120_000}
        onFileReject={(details) => setMessage(`${details.files.length} file(s) rejected`)}
        onFileAccept={() => setMessage('Files accepted')}
      >
        <FileUpload.Label>Images</FileUpload.Label>
        <FileUpload.Trigger>Select images</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <FileUpload.Items />
        </FileUpload.ItemGroup>
        <FileUpload.ItemGroup type="rejected">
          <RejectedFileItems />
        </FileUpload.ItemGroup>
      </FileUpload.Root>
      <p className={styles.state}>{message || 'No files selected'}</p>
    </div>
  );
}

export function ControlledFileUploadExample() {
  const [files, setFiles] = useState<File[]>(getInitialFiles());

  return (
    <div className={styles.stack}>
      <FileUploadTriggerExample
        acceptedFiles={files}
        onFileChange={(details) => setFiles(details.acceptedFiles)}
      />
      <p className={styles.state}>Selected files: {files.length}</p>
    </div>
  );
}

export function FileUploadInitialFilesExample() {
  return <FileUploadTriggerExample defaultAcceptedFiles={getInitialFiles()} />;
}

export function FileUploadClearTriggerExample() {
  return (
    <FileUpload.Root className={`${styles.demo} ${styles.simpleDemo}`} maxFiles={3}>
      <FileUpload.Label>Attachments</FileUpload.Label>
      <div className={styles.actions}>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        <FileUpload.ClearTrigger>Clear files</FileUpload.ClearTrigger>
      </div>
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
}

export function FileUploadWithFieldExample() {
  return (
    <Field.Root className={`${styles.demo} ${styles.simpleDemo}`} required>
      <FileUpload.Root name="attachments" maxFiles={3}>
        <FileUpload.Label>Required attachments</FileUpload.Label>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <FileUpload.Items />
        </FileUpload.ItemGroup>
      </FileUpload.Root>
      <Field.HelperText>Upload up to three files.</Field.HelperText>
      <Field.ErrorText>Upload at least one file.</Field.ErrorText>
    </Field.Root>
  );
}

export function FileUploadFormExample() {
  return (
    <form className={styles.stack} onSubmit={(event) => event.preventDefault()}>
      <FileUpload.Root
        className={`${styles.demo} ${styles.simpleDemo}`}
        name="project-assets"
        maxFiles={3}
      >
        <FileUpload.Label>Project assets</FileUpload.Label>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <FileUpload.Items />
        </FileUpload.ItemGroup>
      </FileUpload.Root>
      <button className={styles.submit} type="submit">
        Submit
      </button>
    </form>
  );
}

export function FileUploadRootProviderExample() {
  const fileUpload = useFileUpload({ maxFiles: 3, accept: 'image/*' });

  return (
    <FileUpload.RootProvider className={`${styles.demo} ${styles.simpleDemo}`} value={fileUpload}>
      <FileUpload.Label>Images</FileUpload.Label>
      <Textarea
        placeholder="Paste an image here"
        onPaste={(event) => fileUpload.setClipboardFiles(event.clipboardData)}
      />
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    </FileUpload.RootProvider>
  );
}

export function FileUploadDirectoryExample() {
  return (
    <FileUpload.Root className={`${styles.demo} ${styles.simpleDemo}`} directory maxFiles={20}>
      <FileUpload.Label>Folder</FileUpload.Label>
      <FileUpload.Trigger>Choose folder</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={`${file.name}-${file.size}`} file={file}>
                <FileUpload.ItemName>{file.webkitRelativePath || file.name}</FileUpload.ItemName>
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
}

export function FileUploadMediaCaptureExample() {
  return (
    <FileUpload.Root className={styles.demo} accept="image/*" capture="environment" maxFiles={1}>
      <FileUpload.Label>Photo</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drop an image or open the camera</span>
          <span className={styles.dropzoneDescription}>One image from the environment camera</span>
          <FileUpload.Trigger>Open camera</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <AcceptedFileItems />
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
}

export function FileUploadTransformFilesExample() {
  return (
    <FileUpload.Root
      className={`${styles.demo} ${styles.simpleDemo}`}
      accept="image/*"
      transformFiles={async (files) =>
        files.map((file) => new File([file], file.name.toLowerCase(), { type: file.type }))
      }
    >
      <FileUpload.Label>Images</FileUpload.Label>
      <FileUpload.Trigger>Choose images</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
}