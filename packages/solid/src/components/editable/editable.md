# Editable

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/editable

## Purpose

`Editable` switches a short text value between preview and editing modes.

## Public contract

The flat API includes `Editable`, `EditableRootProvider`, `EditableLabel`, `EditableArea`, `EditableInput`, `EditablePreview`, `EditableControl`, `EditableControls`, `EditableEditTrigger`, `EditableSubmitTrigger`, `EditableCancelTrigger`, `EditableContext`, `useEditable`, and `useEditableContext`. It supports controlled and uncontrolled value and edit state; activation defaults to `dblclick`.

## Preservation notes

- Preserve Ark commit, cancel, keyboard, Field / Fieldset inheritance, and details-object callbacks.
- Keep the compact controls composition as local sugar; retain the lower-level parts.
- Use Solid's native children and `class` props, preserving the component's reactive preview behavior.

## Styling and accessibility

Keep Ark's input labeling, IDs, focus transfer, and state attributes. Parts expose `data-slot` hooks and accept consumer classes.