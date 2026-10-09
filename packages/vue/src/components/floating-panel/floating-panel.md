# FloatingPanel (Vue)

## Upstream reference

[Ark Floating Panel](https://ark-ui.com/docs/components/floating-panel).

## Public contract

Use the flat FloatingPanel-prefixed parts and top-level useFloatingPanel hook.
FloatingPanelCloseTrigger is the primitive composition path; FloatingPanelCloseIcon
composes it with CloseButton and supplies the standard close icon when no slot is provided.
The close-icon convenience owns its button host, not a consumer asChild host.

## Preservation notes

FloatingPanelCloseIcon uses one CloseButton for both default and custom slot content.
Forward a default slot only when supplied, so CloseButton can render its own fallback.
Changing slot content must preserve the button host, native ref target and focus.

Keep attrs and listeners on the Ark close trigger, consumer class last on CloseButton,
and aria-label on the composed button. The local label defaults to 'Close panel';
an explicit empty label is not replaced. aria-labelledby and native attrs still fall through.
Do not replace Ark dismissal, disabled handling, keyboard navigation or state callbacks.

## Styling and accessibility

CSS Modules and Tailwind share this behavior, with component tokens and utility overrides
respectively. Preserve data-slot, native button semantics and the existing visual defaults.