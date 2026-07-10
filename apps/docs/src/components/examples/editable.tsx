import { Editable, Field, useEditable } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

const centeredExampleStyle = {
  width: 'fit-content',
} as const;

export const editableExampleCss = `
  .editable-state {
    grid-column: 1 / -1;
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

  .editable-root-provider-actions {
    display: flex;
    gap: var(--spacing-2);
    margin-top: var(--spacing-3);
  }

  .editable-root-provider-actions button {
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--color-background);
    color: var(--color-foreground);
  }

  .editable-textarea-area {
    align-items: flex-start;
  }

  .editable-textarea-root {
    --editable-control-align: start;
    --editable-width: min(24rem, calc(100vw - var(--spacing-8)));
    --editable-area-width: 100%;
  }

  .editable-textarea-input,
  .editable-textarea-preview {
    min-height: 6rem;
    white-space: pre-wrap;
  }

  .editable-custom-area {
    --editable-area-width: 16rem;
    --editable-border-color: var(--color-primary);
    --editable-focus-ring-color: var(--color-primary);
    --editable-radius: var(--radius-sm);
  }
`;

export const editableNoData = `const data = null;`;

export const editableOverrideCssProperties: CssPropertyInput[] = [
  ['--editable-area-height', 'var(--size-lg)', 'Controls the editable surface minimum height.'],
  ['--editable-area-width', '100%', 'Controls the editable surface width.'],
  ['--editable-bg', 'var(--color-background)', 'Controls the editable surface background.'],
  ['--editable-border-color', 'var(--color-border)', 'Controls default border color.'],
  [
    '--editable-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--editable-border-style', 'solid', 'Controls the editable border style.'],
  ['--editable-border-width', 'var(--border-width-sm)', 'Controls the editable border width.'],
  ['--editable-color', 'var(--color-foreground)', 'Controls editable text color.'],
  ['--editable-control-align', 'center', 'Controls vertical alignment of the trigger controls.'],
  ['--editable-control-gap', 'var(--spacing-1)', 'Controls spacing between trigger buttons.'],
  ['--editable-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--editable-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--editable-focus-ring-width',
    'var(--editable-border-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--editable-font-size', 'var(--text-md)', 'Controls input and preview font size.'],
  ['--editable-gap', 'var(--spacing-1)', 'Controls spacing between editable parts.'],
  ['--editable-input-width', '100%', 'Controls input and preview width.'],
  ['--editable-label-color', 'var(--color-foreground)', 'Controls label color.'],
  [
    '--editable-label-color-invalid',
    'var(--color-destructive)',
    'Controls label color when invalid.',
  ],
  ['--editable-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--editable-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--editable-label-gap', 'var(--spacing-1)', 'Controls spacing inside the label.'],
  ['--editable-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  [
    '--editable-line-height',
    'var(--line-height-text-md)',
    'Controls input and preview line height.',
  ],
  ['--editable-max-width', '100%', 'Controls root max width.'],
  ['--editable-padding-x', '0.875rem', 'Controls horizontal surface padding.'],
  ['--editable-padding-y', '0.5rem', 'Controls vertical surface padding.'],
  ['--editable-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--editable-preview-min-height', '1lh', 'Controls preview minimum height.'],
  ['--editable-radius', 'var(--radius-md)', 'Controls editable surface corner radius.'],
  ['--editable-textarea-min-height', '6rem', 'Controls textarea input minimum height.'],
  ['--editable-textarea-resize', 'vertical', 'Controls textarea resize behavior.'],
  ['--editable-transition', 'var(--transition-default)', 'Controls state transition timing.'],
  ['--editable-trigger-bg', 'var(--color-background)', 'Controls trigger background.'],
  [
    '--editable-trigger-bg-active',
    'var(--editable-trigger-bg-hover)',
    'Controls active trigger background.',
  ],
  ['--editable-trigger-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  ['--editable-trigger-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--editable-trigger-border-style', 'solid', 'Controls trigger border style.'],
  ['--editable-trigger-border-width', 'var(--border-width-sm)', 'Controls trigger border width.'],
  ['--editable-trigger-color', 'var(--color-foreground)', 'Controls trigger icon color.'],
  ['--editable-trigger-icon-size', '0.875rem', 'Controls default trigger icon size.'],
  ['--editable-trigger-radius', 'var(--radius-sm)', 'Controls trigger corner radius.'],
  [
    '--editable-trigger-size',
    'var(--editable-area-height, var(--size-lg))',
    'Controls trigger button size.',
  ],
  ['--editable-width', 'auto', 'Controls root width.'],
];

export function EditableCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={editableOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function EditableExample(props: ComponentProps<typeof Editable>) {
  return (
    <div style={centeredExampleStyle}>
      <Editable defaultValue="Layer name" {...props}>
        <Editable.Label>Name</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable>
    </div>
  );
}

export function ControlledEditableExample() {
  const [value, setValue] = useState('Downtown route');

  return (
    <div>
      <Editable value={value} onValueChange={(details) => setValue(details.value)}>
        <Editable.Label>Controlled value</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable>
      <div className="editable-state">Current value: {value || 'empty'}</div>
    </div>
  );
}

export function AdvancedEditableCustomizationExample() {
  return (
    <div style={centeredExampleStyle}>
      <Editable defaultValue="Service area">
        <Editable.Label>Name</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Context>
          {(editable) =>
            editable.editing ? (
              <div className="editable-state">Enter to save, Esc to cancel.</div>
            ) : (
              <Editable.Control>
                <Editable.EditTrigger />
              </Editable.Control>
            )
          }
        </Editable.Context>
      </Editable>
    </div>
  );
}

export function TextareaEditableExample() {
  return (
    <Editable
      className="editable-textarea-root"
      defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submitMode="none"
      placeholder="Enter a description"
    >
      <Editable.Label>Description</Editable.Label>
      <Editable.Area className="editable-textarea-area">
        <Editable.Input asChild className="editable-textarea-input">
          <textarea />
        </Editable.Input>
        <Editable.Preview className="editable-textarea-preview" />
      </Editable.Area>
      <Editable.Controls />
      <div className="editable-state">Double-click to edit. Press Cmd/Ctrl + Enter to save.</div>
    </Editable>
  );
}

export function FieldEditableExample() {
  return (
    <div style={centeredExampleStyle}>
      <Field invalid>
        <Editable defaultValue="" placeholder="Click to edit your bio" required>
          <Editable.Label>Bio</Editable.Label>
          <Editable.Area>
            <Editable.Input />
            <Editable.Preview />
          </Editable.Area>
          <Editable.Controls />
        </Editable>
        <Field.ErrorText>Bio is required.</Field.ErrorText>
      </Field>
    </div>
  );
}

export function RootProviderEditableExample() {
  const editable = useEditable({ activationMode: 'dblclick', defaultValue: 'Root provider value' });

  return (
    <div style={centeredExampleStyle}>
      <Editable.RootProvider value={editable}>
        <Editable.Label>External state</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable.RootProvider>
      <div className="editable-root-provider-actions">
        <button type="button" onClick={() => editable.edit()}>
          Edit
        </button>
        <button type="button" onClick={() => editable.setValue('Updated externally')}>
          Update
        </button>
      </div>
    </div>
  );
}

export function EditableGuidesExample() {
  return (
    <Editable
      defaultValue="Route"
      activationMode="click"
      autoResize
      maxLength={24}
      placeholder={{ preview: 'Click to edit', edit: 'Type a short name' }}
      translations={{
        input: 'Route name',
        edit: 'Edit route name',
        submit: 'Save route name',
        cancel: 'Cancel route name',
      }}
    >
      <Editable.Label>Auto-resizing name</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Controls />
    </Editable>
  );
}

export const editableBasicCode = `
  import { Editable as EditablePrimitive } from "@ark-ui/react/editable";
  import { Editable } from "@moduix/react";

  export function EditableDemo() {
    return (
      <Editable defaultValue="Layer name">
        <Editable.Label>Name</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Control>
          <EditablePrimitive.Context>
            {(editable) =>
              editable.editing ? (
                <>
                  <Editable.SubmitTrigger />
                  <Editable.CancelTrigger />
                </>
              ) : (
                <Editable.EditTrigger />
              )
            }
          </EditablePrimitive.Context>
        </Editable.Control>
      </Editable>
    );
  }
`;

export const editableControlledCode = `
  import { Editable as EditablePrimitive } from "@ark-ui/react/editable";
  import { Editable } from "@moduix/react";
  import { useState } from "react";

  export function ControlledEditableDemo() {
    const [value, setValue] = useState("Downtown route");

    return (
      <Editable value={value} onValueChange={(details) => setValue(details.value)}>
        <Editable.Label>Controlled value</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Control>
          <Editable.EditTrigger />
        </Editable.Control>
      </Editable>
    );
  }
`;

export const editableContextCode = `
  import { Editable } from "@moduix/react";

  export function ContextEditableDemo() {
    return (
      <Editable defaultValue="Service area">
        <Editable.Label>Name</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <EditablePrimitive.Context>
          {(editable) =>
            editable.editing ? (
              <span>Enter to save, Esc to cancel.</span>
            ) : (
              <Editable.Control>
                <Editable.EditTrigger />
              </Editable.Control>
            )
          }
        </EditablePrimitive.Context>
      </Editable>
    );
  }
`;

export const editableControlsCode = `
  import { Editable as EditablePrimitive } from "@ark-ui/react/editable";
  import { Editable } from "@moduix/react";

  export function EditableControlsDemo() {
    return (
      <Editable defaultValue="Transit corridor" submitMode="none">
        <Editable.Label>Project title</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Control>
          <EditablePrimitive.Context>
            {(editable) =>
              editable.editing ? (
                <>
                  <Editable.SubmitTrigger />
                  <Editable.CancelTrigger />
                </>
              ) : (
                <Editable.EditTrigger />
              )
            }
          </EditablePrimitive.Context>
        </Editable.Control>
      </Editable>
    );
  }
`;

export const editableTextareaCode = `
  import { Editable as EditablePrimitive } from "@ark-ui/react/editable";
  import { Editable } from "@moduix/react";

  export function TextareaEditableDemo() {
    return (
      <Editable
        className="editable-textarea-root"
        defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
        submitMode="none"
        placeholder="Enter a description"
      >
        <Editable.Label>Description</Editable.Label>
        <Editable.Area className="editable-textarea-area">
          <Editable.Input asChild className="editable-textarea-input">
            <textarea />
          </Editable.Input>
          <Editable.Preview className="editable-textarea-preview" />
        </Editable.Area>
        <Editable.Control>
          <EditablePrimitive.Context>
            {(editable) =>
              editable.editing ? (
                <>
                  <Editable.SubmitTrigger />
                  <Editable.CancelTrigger />
                </>
              ) : (
                <Editable.EditTrigger />
              )
            }
          </EditablePrimitive.Context>
        </Editable.Control>
      </Editable>
    );
  }
`;

export const editableFieldCode = `
  import { Editable, Field } from "@moduix/react";

  export function FieldEditableDemo() {
    return (
      <Field invalid>
        <Editable defaultValue="" placeholder="Click to edit your bio" required>
          <Editable.Label>Bio</Editable.Label>
          <Editable.Area>
            <Editable.Input />
            <Editable.Preview />
          </Editable.Area>
          <Editable.Control>
            <Editable.EditTrigger />
          </Editable.Control>
        </Editable>
        <Field.ErrorText>Bio is required.</Field.ErrorText>
      </Field>
    );
  }
`;

export const editableRootProviderCode = `
  import { useEditable } from "@ark-ui/react/editable";
  import { Editable as EditablePrimitive } from "@ark-ui/react/editable";
  import { Editable } from "@moduix/react";

  export function RootProviderEditableDemo() {
    const editable = useEditable({ activationMode: "dblclick", defaultValue: "Root provider value" });

    return (
      <>
        <Editable.RootProvider value={editable}>
          <Editable.Label>External state</Editable.Label>
          <Editable.Area>
            <Editable.Input />
            <Editable.Preview />
          </Editable.Area>
          <Editable.Control>
            <EditablePrimitive.Context>
              {(editable) =>
                editable.editing ? (
                  <>
                    <Editable.SubmitTrigger />
                    <Editable.CancelTrigger />
                  </>
                ) : (
                  <Editable.EditTrigger />
                )
              }
            </EditablePrimitive.Context>
          </Editable.Control>
        </Editable.RootProvider>
        <button type="button" onClick={() => editable.edit()}>
          Edit
        </button>
      </>
    );
  }
`;

export const editableGuidesCode = `
  import { Editable } from "@moduix/react";

  export function EditableGuidesDemo() {
    return (
      <Editable
        defaultValue="Route"
        activationMode="click"
        autoResize
        maxLength={24}
        placeholder={{ preview: "Click to edit", edit: "Type a short name" }}
        translations={{
          input: "Route name",
          edit: "Edit route name",
          submit: "Save route name",
          cancel: "Cancel route name",
        }}
      >
        <Editable.Label>Auto-resizing name</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Control>
          <Editable.EditTrigger />
        </Editable.Control>
      </Editable>
    );
  }
`;