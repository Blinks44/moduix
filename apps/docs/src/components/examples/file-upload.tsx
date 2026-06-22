import { Field, FileUpload, Textarea, useFileUpload } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
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

  .file-upload-dropzone-content {
    display: grid;
    justify-items: center;
    gap: var(--spacing-1);
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

  .file-upload-hint,
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

export const fileUploadCustomStylingCss = `
  .file-upload-custom-dropzone {
    border-color: var(--color-primary);
    background-color: color-mix(in oklab, var(--color-primary) 5%, var(--color-background));
  }

  .file-upload-custom-dropzone[data-dragging] {
    background-color: color-mix(in oklab, var(--color-primary) 12%, var(--color-background));
  }

  .file-upload-custom-trigger {
    background-color: var(--color-foreground);
    color: var(--color-background);
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

export const fileUploadCustomStylingData = `
  const maxFiles = 2;
`;

export const fileUploadOverrideCssProperties: CssPropertyInput[] = [
  ['--file-upload-width', '100%', 'Controls root width.'],
  ['--file-upload-max-width', '28rem', 'Controls root maximum width.'],
  ['--file-upload-gap', 'var(--spacing-3)', 'Controls spacing between root children.'],
  ['--file-upload-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--file-upload-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--file-upload-radius', 'var(--radius-md)', 'Controls dropzone and item radius.'],
  ['--file-upload-transition', 'var(--transition-default)', 'Controls interactive transitions.'],
  ['--file-upload-invalid-color', 'var(--color-destructive)', 'Controls invalid borders.'],
  ['--file-upload-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--file-upload-focus-ring-width', 'var(--border-width-md)', 'Controls focus ring width.'],
  ['--file-upload-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--file-upload-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--file-upload-dropzone-bg', 'var(--color-background)', 'Controls dropzone background.'],
  ['--file-upload-dropzone-bg-dragging', 'var(--color-accent)', 'Controls dragging background.'],
  ['--file-upload-dropzone-border-color', 'var(--color-border)', 'Controls dropzone border.'],
  [
    '--file-upload-dropzone-color',
    'var(--color-muted-foreground)',
    'Controls dropzone text color.',
  ],
  ['--file-upload-dropzone-icon-box-size', '2.75rem', 'Controls dropzone icon box size.'],
  ['--file-upload-dropzone-icon-size', '1.125rem', 'Controls dropzone icon size.'],
  ['--file-upload-dropzone-min-height', '8rem', 'Controls dropzone minimum height.'],
  ['--file-upload-dropzone-padding', 'var(--spacing-5)', 'Controls dropzone padding.'],
  [
    '--file-upload-trigger-bg',
    'var(--button-default-bg, var(--color-primary))',
    'Controls trigger background.',
  ],
  [
    '--file-upload-trigger-color',
    'var(--button-default-color, var(--color-primary-foreground))',
    'Controls trigger text color.',
  ],
  [
    '--file-upload-trigger-height',
    'var(--button-size-md, var(--size-lg))',
    'Controls trigger height.',
  ],
  [
    '--file-upload-trigger-padding-x',
    'var(--button-padding-x-md, 1rem)',
    'Controls trigger horizontal padding.',
  ],
  ['--file-upload-item-bg', 'var(--color-background)', 'Controls item background.'],
  ['--file-upload-item-border-color', 'var(--color-border)', 'Controls item border color.'],
  ['--file-upload-item-gap', 'var(--spacing-3)', 'Controls item content gap.'],
  ['--file-upload-item-min-height', '2.5rem', 'Controls compact item minimum height.'],
  ['--file-upload-item-preview-min-height', '3rem', 'Controls preview item minimum height.'],
  ['--file-upload-item-preview-size', '2rem', 'Controls preview box size.'],
  ['--file-upload-item-preview-bg', 'var(--color-muted)', 'Controls preview background.'],
  ['--file-upload-item-name-font-size', 'var(--text-sm)', 'Controls file name font size.'],
  [
    '--file-upload-item-size-color',
    'var(--color-muted-foreground)',
    'Controls file size text color.',
  ],
  ['--file-upload-action-size', '1.75rem', 'Controls delete and clear button size.'],
  ['--file-upload-action-color', 'var(--color-muted-foreground)', 'Controls action icon color.'],
  ['--file-upload-action-bg-hover', 'var(--color-muted)', 'Controls action hover background.'],
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

function AcceptedFileItems() {
  return (
    <FileUpload.Context>
      {({ acceptedFiles }) =>
        acceptedFiles.map((file) => (
          <FileUpload.Item key={`${file.name}-${file.size}`} file={file}>
            <FileUpload.ItemName />
            <FileUpload.ItemSizeText />
            <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
          </FileUpload.Item>
        ))
      }
    </FileUpload.Context>
  );
}

function CompactAcceptedFileItems() {
  return (
    <FileUpload.Context>
      {({ acceptedFiles }) =>
        acceptedFiles.map((file) => (
          <FileUpload.Item key={`${file.name}-${file.size}`} file={file}>
            <FileUpload.ItemName />
            <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
          </FileUpload.Item>
        ))
      }
    </FileUpload.Context>
  );
}

function RejectedFileItems({ showErrors = true }: { showErrors?: boolean }) {
  return (
    <FileUpload.Context>
      {({ rejectedFiles }) =>
        rejectedFiles.map(({ file, errors }) => (
          <FileUpload.Item key={`${file.name}-${file.size}`} file={file}>
            <FileUpload.ItemName />
            {showErrors ? <p className={styles.error}>{errors.join(', ')}</p> : null}
            <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
          </FileUpload.Item>
        ))
      }
    </FileUpload.Context>
  );
}

function CompactRejectedFileItems() {
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
    <FileUpload.Root className={`${styles.demo} ${styles.simpleDemo}`} maxFiles={3} {...props}>
      <FileUpload.Label>Attachments</FileUpload.Label>
      <FileUpload.Trigger>Choose files</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <CompactAcceptedFileItems />
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
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
        <AcceptedFileItems />
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  );
}

export function FileUploadExample() {
  return <FileUploadTriggerExample />;
}

export function FileUploadDropzoneDemo() {
  return <FileUploadDropzoneExample />;
}

export function FileUploadAcceptedTypesExample() {
  return <FileUploadDropzoneExample accept="image/png,image/jpeg" maxFiles={4} />;
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
      <FileUpload.HiddenInput />
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
          <CompactAcceptedFileItems />
        </FileUpload.ItemGroup>
        <FileUpload.ItemGroup type="rejected">
          <CompactRejectedFileItems />
        </FileUpload.ItemGroup>
        <FileUpload.HiddenInput />
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

export function FileUploadWithFieldExample() {
  return (
    <Field.Root className={`${styles.demo} ${styles.simpleDemo}`} required>
      <FileUpload.Root name="attachments" maxFiles={3}>
        <FileUpload.Label>Required attachments</FileUpload.Label>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <CompactAcceptedFileItems />
        </FileUpload.ItemGroup>
        <FileUpload.HiddenInput />
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
          <CompactAcceptedFileItems />
        </FileUpload.ItemGroup>
        <FileUpload.HiddenInput />
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
        <CompactAcceptedFileItems />
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
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
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  );
}

export function FileUploadMediaCaptureExample() {
  return <FileUploadDropzoneExample accept="image/*" capture="environment" maxFiles={1} />;
}

export function FileUploadTransformFilesExample() {
  return (
    <FileUploadTriggerExample
      accept="image/*"
      transformFiles={async (files) =>
        files.map((file) => new File([file], file.name.toLowerCase(), { type: file.type }))
      }
    />
  );
}

export function CustomStylingFileUploadExample() {
  return (
    <FileUpload.Root className={styles.demo} maxFiles={2}>
      <FileUpload.Label>Brand assets</FileUpload.Label>
      <FileUpload.Dropzone className={styles.customDropzone} disableClick>
        <FileUpload.DropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drop files here</span>
          <span className={styles.dropzoneDescription}>SVG, PNG, or PDF</span>
          <FileUpload.Trigger className={styles.customTrigger}>Browse files</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <AcceptedFileItems />
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  );
}