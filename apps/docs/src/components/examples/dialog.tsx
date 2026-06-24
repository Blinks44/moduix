import { Button, Dialog, Menu, Portal, ScrollArea, useDialog } from '@moduix/react';
import { useRef, useState, type ReactNode } from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

export const dialogExampleCss = `
  .dialog-stack {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-2);
  }

  .dialog-form {
    display: grid;
    gap: var(--spacing-3);
    margin-top: var(--spacing-4);
  }

  .dialog-input {
    width: 100%;
    min-height: var(--size-lg);
    padding-inline: var(--spacing-3);
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-background);
    color: var(--color-foreground);
    font: inherit;
  }

  .dialog-scroll-content {
    display: grid;
    gap: var(--spacing-4);
    padding-inline-end: var(--spacing-3);
  }

  .dialog-scroll-content h3,
  .dialog-scroll-content p {
    margin: 0;
  }

  .dialog-inside-scroll {
    max-height: min(32rem, calc(100dvh - var(--spacing-8)));
  }

  .dialog-scroll-area {
    height: 16rem;
    margin-top: var(--spacing-4);
  }

  .dialog-outside-positioner {
    place-items: start center;
  }

  .dialog-outside-content {
    max-height: none;
    margin-block: var(--spacing-8);
  }

  .dialog-state {
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
  }

  .dialog-textarea {
    min-height: 7rem;
    padding-block: var(--spacing-2);
    resize: vertical;
  }
`;

export const dialogEmptyData = `// This example does not require external fixture data.`;

export const dialogScrollData = `const sections = [
  { title: 'Prepare', body: 'Confirm the release branch and generated artifacts.' },
  { title: 'Validate', body: 'Run formatting, linting, builds, and type checks.' },
  { title: 'Publish', body: 'Publish only after every required validation succeeds.' },
];`;

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
];

export const dialogUsersData = `const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
];`;

export const dialogOverrideCssProperties: CssPropertyInput[] = [
  ['--dialog-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Backdrop color.'],
  ['--dialog-backdrop-blur', '4px', 'Backdrop blur.'],
  ['--dialog-backdrop-ending-blur', 'none', 'Backdrop blur at the end of closing.'],
  ['--dialog-backdrop-ending-opacity', '0', 'Backdrop opacity at the end of closing.'],
  ['--dialog-backdrop-starting-blur', 'none', 'Backdrop blur at the start of opening.'],
  ['--dialog-backdrop-starting-opacity', '0', 'Backdrop opacity at the start of opening.'],
  ['--dialog-backdrop-transition', 'var(--transition-default)', 'Backdrop animation timing.'],
  ['--dialog-bg', 'var(--color-popover)', 'Content background.'],
  ['--dialog-border-color', 'var(--color-border)', 'Content border color.'],
  ['--dialog-border-width', 'var(--border-width-sm)', 'Content border width.'],
  ['--dialog-close-icon-bg', 'transparent', 'Close icon background.'],
  ['--dialog-close-icon-bg-hover', 'var(--color-accent)', 'Close icon hover background.'],
  ['--dialog-close-icon-color', 'var(--dialog-muted-color)', 'Close icon color.'],
  [
    '--dialog-close-icon-color-hover',
    'var(--dialog-close-icon-color, var(--dialog-color))',
    'Close icon hover color.',
  ],
  [
    '--dialog-close-icon-focus-ring-color',
    'var(--dialog-focus-ring-color)',
    'Close icon focus ring color.',
  ],
  ['--dialog-close-icon-glyph-size', '0.75rem', 'Close icon glyph size.'],
  ['--dialog-color', 'var(--color-popover-foreground)', 'Content text color.'],
  [
    '--dialog-close-icon-inset-block-start',
    'var(--spacing-4)',
    'Close icon inset from the block start edge.',
  ],
  [
    '--dialog-close-icon-inset-inline-end',
    'var(--spacing-4)',
    'Close icon inset from the inline end edge.',
  ],
  ['--dialog-close-icon-radius', 'var(--radius-md)', 'Close icon border radius.'],
  ['--dialog-close-icon-size', '1.75rem', 'Close icon control size.'],
  ['--dialog-content-ending-translate-x', '0', 'Closing animation horizontal offset.'],
  ['--dialog-content-ending-translate-y', '0', 'Closing animation vertical offset.'],
  ['--dialog-content-margin', 'var(--spacing-4) 0 0', 'Body margin.'],
  ['--dialog-content-starting-opacity', '0', 'Opening animation start opacity.'],
  ['--dialog-content-ending-opacity', '0', 'Closing animation end opacity.'],
  ['--dialog-content-starting-scale', 'var(--scale-popup)', 'Opening animation start scale.'],
  ['--dialog-content-ending-scale', 'var(--scale-popup)', 'Closing animation end scale.'],
  ['--dialog-content-starting-translate-x', '0', 'Opening animation horizontal offset.'],
  ['--dialog-content-starting-translate-y', '0', 'Opening animation vertical offset.'],
  ['--dialog-control-bg', 'var(--color-background)', 'Native trigger background.'],
  ['--dialog-control-bg-hover', 'var(--color-accent)', 'Native trigger hover background.'],
  ['--dialog-control-border-color', 'var(--color-border)', 'Native trigger border color.'],
  ['--dialog-control-border-width', 'var(--border-width-sm)', 'Native trigger border width.'],
  ['--dialog-control-color', 'var(--color-foreground)', 'Native trigger text color.'],
  ['--dialog-control-font-size', 'var(--text-md)', 'Native trigger font size.'],
  ['--dialog-control-height', 'var(--size-lg)', 'Native trigger minimum height.'],
  ['--dialog-control-line-height', 'var(--line-height-text-md)', 'Native trigger line height.'],
  ['--dialog-control-padding-x', '0.875rem', 'Native trigger horizontal padding.'],
  ['--dialog-control-padding-y', '0.5rem', 'Native trigger vertical padding.'],
  ['--dialog-control-radius', 'var(--radius-md)', 'Native trigger border radius.'],
  ['--dialog-description-color', 'var(--dialog-muted-color)', 'Description and body color.'],
  ['--dialog-description-font-size', 'var(--text-md)', 'Description and body font size.'],
  [
    '--dialog-description-line-height',
    'var(--line-height-text-md)',
    'Description and body line height.',
  ],
  ['--dialog-focus-ring-color', 'var(--color-ring)', 'Native control focus ring color.'],
  [
    '--dialog-focus-ring-width',
    'var(--dialog-control-border-width)',
    'Native control focus ring width.',
  ],
  ['--dialog-footer-gap', 'var(--spacing-2)', 'Footer action gap.'],
  ['--dialog-footer-margin-top', 'var(--spacing-6)', 'Footer top margin.'],
  ['--dialog-header-gap', 'var(--spacing-1)', 'Header gap.'],
  ['--dialog-max-width', 'calc(100vw - var(--spacing-8))', 'Content maximum width.'],
  ['--dialog-muted-color', 'var(--color-muted-foreground)', 'Muted text fallback color.'],
  ['--dialog-nested-overlay-bg', 'rgb(0 0 0 / 0.05)', 'Nested parent overlay.'],
  ['--dialog-nested-scale-step', '0.05', 'Nested parent scale step.'],
  ['--dialog-nested-transition', 'var(--dialog-transition)', 'Nested parent transition timing.'],
  ['--dialog-padding', 'var(--spacing-6)', 'Content padding.'],
  ['--dialog-positioner-padding', 'var(--spacing-4)', 'Positioner viewport padding.'],
  ['--dialog-radius', 'var(--radius-lg)', 'Content border radius.'],
  ['--dialog-shadow', 'var(--shadow-lg)', 'Content shadow.'],
  ['--dialog-title-color', 'var(--dialog-color)', 'Title color.'],
  ['--dialog-title-font-size', 'var(--text-lg)', 'Title font size.'],
  ['--dialog-title-font-weight', 'var(--weight-semibold)', 'Title font weight.'],
  ['--dialog-title-line-height', 'var(--line-height-text-lg)', 'Title line height.'],
  ['--dialog-transition', 'var(--transition-default)', 'Content animation timing.'],
  ['--dialog-width', '28rem', 'Content width.'],
];

export function DialogCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={dialogOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function DialogSurface({
  children,
  contentClassName,
  positionerClassName,
  backdrop = true,
}: {
  children: ReactNode;
  contentClassName?: string;
  positionerClassName?: string;
  backdrop?: boolean;
}) {
  return (
    <Portal>
      {backdrop ? <Dialog.Backdrop /> : null}
      <Dialog.Positioner className={positionerClassName}>
        <Dialog.Content className={contentClassName}>{children}</Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}

export function DialogExample() {
  return (
    <>
      <style>{dialogExampleCss}</style>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>View notifications</Button>
        </Dialog.Trigger>
        <DialogSurface>
          <Dialog.Header>
            <Dialog.Title>Notifications</Dialog.Title>
            <Dialog.CloseIcon />
            <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button variant="outline">Close</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </DialogSurface>
      </Dialog.Root>
    </>
  );
}

export function ControlledDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
      <Dialog.Trigger asChild>
        <Button>Open controlled dialog</Button>
      </Dialog.Trigger>
      <DialogSurface>
        <Dialog.Title>Publish changes?</Dialog.Title>
        <Dialog.Description>
          This will make the latest version visible to all users.
        </Dialog.Description>
        <Dialog.Footer>
          <Dialog.CloseTrigger asChild>
            <Button variant="outline">Back to editing</Button>
          </Dialog.CloseTrigger>
        </Dialog.Footer>
      </DialogSurface>
    </Dialog.Root>
  );
}

export function RootProviderDialogExample() {
  const dialog = useDialog();

  return (
    <div className="dialog-stack">
      <style>{dialogExampleCss}</style>
      <Button onClick={() => dialog.setOpen(true)}>
        Dialog is {dialog.open ? 'open' : 'closed'}
      </Button>
      <Dialog.RootProvider value={dialog}>
        <DialogSurface>
          <Dialog.Title>Controlled externally</Dialog.Title>
          <Dialog.Description>
            State and methods are owned by the useDialog store.
          </Dialog.Description>
          <Dialog.CloseIcon />
        </DialogSurface>
      </Dialog.RootProvider>
    </div>
  );
}

export function AlertDialogExample() {
  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button>Delete account</Button>
      </Dialog.Trigger>
      <DialogSurface>
        <Dialog.Title>Are you absolutely sure?</Dialog.Title>
        <Dialog.Description>
          This action cannot be undone. Your account data will be permanently removed.
        </Dialog.Description>
        <Dialog.Footer>
          <Dialog.CloseTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.CloseTrigger>
          <Button>Delete account</Button>
        </Dialog.Footer>
      </DialogSurface>
    </Dialog.Root>
  );
}

export function LazyMountDialogExample() {
  return (
    <Dialog.Root lazyMount unmountOnExit>
      <Dialog.Trigger asChild>
        <Button>Open lazy dialog</Button>
      </Dialog.Trigger>
      <DialogSurface>
        <Dialog.Title>Lazy loaded</Dialog.Title>
        <Dialog.Description>
          Content mounts on first open and unmounts after closing.
        </Dialog.Description>
        <Dialog.CloseIcon />
      </DialogSurface>
    </Dialog.Root>
  );
}

export function InitialFocusDialogExample() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <style>{dialogExampleCss}</style>
      <Dialog.Root initialFocusEl={() => inputRef.current}>
        <Dialog.Trigger asChild>
          <Button>Edit profile</Button>
        </Dialog.Trigger>
        <DialogSurface>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>The name field receives initial focus.</Dialog.Description>
          <Dialog.Body className="dialog-form">
            <input ref={inputRef} className="dialog-input" placeholder="Name" />
            <input className="dialog-input" placeholder="Email" />
          </Dialog.Body>
        </DialogSurface>
      </Dialog.Root>
    </>
  );
}

export function FinalFocusDialogExample() {
  const finalFocusRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="dialog-stack">
      <style>{dialogExampleCss}</style>
      <Button ref={finalFocusRef}>Final focus target</Button>
      <Dialog.Root finalFocusEl={() => finalFocusRef.current}>
        <Dialog.Trigger asChild>
          <Button>Open dialog</Button>
        </Dialog.Trigger>
        <DialogSurface>
          <Dialog.Title>Focus redirect</Dialog.Title>
          <Dialog.Description>
            Focus returns to the explicit target after closing.
          </Dialog.Description>
          <Dialog.CloseIcon />
        </DialogSurface>
      </Dialog.Root>
    </div>
  );
}

export function NonModalDialogExample() {
  return (
    <Dialog.Root modal={false}>
      <Dialog.Trigger asChild>
        <Button>Open non-modal dialog</Button>
      </Dialog.Trigger>
      <DialogSurface backdrop={false}>
        <Dialog.Title>Non-modal dialog</Dialog.Title>
        <Dialog.Description>
          The page remains interactive while this dialog is open.
        </Dialog.Description>
        <Dialog.CloseIcon />
      </DialogSurface>
    </Dialog.Root>
  );
}

export function ScrollableDialogExample() {
  return (
    <>
      <style>{dialogExampleCss}</style>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Open long content</Button>
        </Dialog.Trigger>
        <DialogSurface contentClassName="dialog-inside-scroll">
          <Dialog.Header>
            <Dialog.Title>Release checklist</Dialog.Title>
            <Dialog.CloseIcon />
            <Dialog.Description>
              The header stays visible while the body scrolls.
            </Dialog.Description>
          </Dialog.Header>
          <ScrollArea className="dialog-scroll-area">
            <ScrollArea.Viewport>
              <ScrollArea.Content>
                <div className="dialog-scroll-content">
                  {insideScrollSections.map((item) => (
                    <section key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </section>
                  ))}
                </div>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea>
        </DialogSurface>
      </Dialog.Root>
    </>
  );
}

export function OutsideScrollDialogExample() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style>{dialogExampleCss}</style>
      <Dialog.Root initialFocusEl={() => contentRef.current}>
        <Dialog.Trigger asChild>
          <Button>Open privacy policy</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner className="dialog-outside-positioner">
            <Dialog.Content ref={contentRef} className="dialog-outside-content">
              <Dialog.Title>Privacy policy</Dialog.Title>
              <Dialog.Description>
                The positioner scrolls while the dialog can extend beyond the viewport.
              </Dialog.Description>
              <Dialog.Body className="dialog-scroll-content">
                {insideScrollSections.map((item) => (
                  <section key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </section>
                ))}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}

export function ContextDialogExample() {
  return (
    <>
      <style>{dialogExampleCss}</style>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Open status dialog</Button>
        </Dialog.Trigger>
        <DialogSurface>
          <Dialog.Title>Status</Dialog.Title>
          <Dialog.Description>
            <Dialog.Context>
              {(dialog) => <>Dialog is {dialog.open ? 'open' : 'closed'}</>}
            </Dialog.Context>
          </Dialog.Description>
        </DialogSurface>
      </Dialog.Root>
    </>
  );
}

export function NestedDialogExample() {
  const parentDialog = useDialog();
  const childDialog = useDialog();

  return (
    <>
      <Button onClick={() => parentDialog.setOpen(true)}>Open parent dialog</Button>
      <Dialog.RootProvider value={parentDialog}>
        <DialogSurface>
          <Dialog.Title>Parent dialog</Dialog.Title>
          <Dialog.Description>Open a nested dialog to see layered state.</Dialog.Description>
          <Dialog.Body>
            <Button onClick={() => childDialog.setOpen(true)}>Open nested dialog</Button>
          </Dialog.Body>
        </DialogSurface>
      </Dialog.RootProvider>
      <Dialog.RootProvider value={childDialog}>
        <DialogSurface>
          <Dialog.Title>Nested dialog</Dialog.Title>
          <Dialog.Description>Ark UI manages the nested layer stack.</Dialog.Description>
          <Dialog.CloseIcon />
        </DialogSurface>
      </Dialog.RootProvider>
    </>
  );
}

export function MultipleTriggersDialogExample() {
  const [activeUser, setActiveUser] = useState<(typeof users)[number] | null>(null);

  return (
    <div className="dialog-stack">
      <style>{dialogExampleCss}</style>
      <Dialog.Root
        onTriggerValueChange={(details) => {
          setActiveUser(users.find((user) => user.id === details.value) ?? null);
        }}
      >
        {users.map((user) => (
          <Dialog.Trigger key={user.id} value={user.id} asChild>
            <Button variant="outline">Edit {user.name}</Button>
          </Dialog.Trigger>
        ))}
        <DialogSurface>
          <Dialog.Title>Edit user</Dialog.Title>
          <Dialog.Description>Content is selected from the trigger value.</Dialog.Description>
          {activeUser ? (
            <Dialog.Body className="dialog-form">
              <input className="dialog-input" value={activeUser.name} readOnly />
              <input className="dialog-input" value={activeUser.email} readOnly />
            </Dialog.Body>
          ) : null}
          <Dialog.CloseIcon />
        </DialogSurface>
      </Dialog.Root>
    </div>
  );
}

export function OpenFromMenuDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Menu>
        <Menu.Trigger asChild>
          <Button variant="outline">
            Actions
            <Menu.Indicator />
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="edit">Edit</Menu.Item>
              <Menu.Item value="duplicate">Duplicate</Menu.Item>
              <Menu.Item value="delete" tone="destructive" onClick={() => setOpen(true)}>
                Delete...
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu>

      <Dialog.Root open={open} onOpenChange={(details) => setOpen(details.open)} role="alertdialog">
        <DialogSurface>
          <Dialog.Title>Confirm delete</Dialog.Title>
          <Dialog.Description>This action cannot be undone.</Dialog.Description>
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.CloseTrigger>
            <Button>Delete</Button>
          </Dialog.Footer>
        </DialogSurface>
      </Dialog.Root>
    </>
  );
}

export function ConfirmationDialogExample() {
  const [formContent, setFormContent] = useState('');
  const [open, setOpen] = useState(false);
  const confirmDialog = useDialog();
  const parentDialog = useDialog({
    open,
    onOpenChange(details) {
      if (!details.open && formContent.trim()) {
        confirmDialog.setOpen(true);
        return;
      }

      setOpen(details.open);
    },
  });

  const handleDiscard = () => {
    setFormContent('');
    confirmDialog.setOpen(false);
    setOpen(false);
  };

  return (
    <>
      <style>{dialogExampleCss}</style>
      <Button onClick={() => setOpen(true)}>Open form</Button>

      <Dialog.RootProvider value={parentDialog}>
        <DialogSurface>
          <Dialog.Title>Edit content</Dialog.Title>
          <Dialog.CloseIcon />
          <Dialog.Description>
            Unsaved changes ask for confirmation before closing.
          </Dialog.Description>
          <Dialog.Body>
            <textarea
              className="dialog-input dialog-textarea"
              value={formContent}
              onChange={(event) => setFormContent(event.currentTarget.value)}
              placeholder="Enter some text..."
            />
          </Dialog.Body>
        </DialogSurface>
      </Dialog.RootProvider>

      <Dialog.RootProvider value={confirmDialog}>
        <DialogSurface>
          <Dialog.Title>Discard changes?</Dialog.Title>
          <Dialog.Description>You have unsaved changes.</Dialog.Description>
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button variant="outline">Keep editing</Button>
            </Dialog.CloseTrigger>
            <Button onClick={handleDiscard}>Discard</Button>
          </Dialog.Footer>
        </DialogSurface>
      </Dialog.RootProvider>
    </>
  );
}