# SignaturePad (Vue)

## Upstream reference

[Ark SignaturePad](https://ark-ui.com/docs/components/signature-pad).

## Public contract

SignaturePad and its prefixed parts preserve Ark drawing, callback details and v-model:paths.
SignaturePadCanvas supplies the default control, SVG segment, guide and clear action.
Compose SignaturePadHiddenInput explicitly with a serialized value for form submission.

useSignaturePad returns a computed API whose value has a reactive readOnly boolean.
Pass it to SignaturePadRootProvider through Vue's normal ref unwrapping.
The provider also accepts an unmodified Ark API with optional readOnly metadata.
Absent metadata defaults to false for moduix's clear-button guard; use the moduix hook
when that guard must track read-only state. SignaturePadRootProviderProps describes this local contract.

## Preservation notes

The hook derives readOnly from current props or Field; explicit false overrides inherited true.
It accepts Ark's optional second emit argument and forwards it directly alongside prop callbacks.
Do not mutate Ark API objects or replace the computed return with a setup-time snapshot.
The typed injection-key Symbol is normal Vue context, not hidden API metadata to remove.
Clear is disabled in read-only mode, while programmatic clear remains available.
Native Vue refs, single semantic asChild hosts, controlled paths and SSR/hydration remain intact.
The existing skipped direct-Ark controlled drawEnd regression is an upstream gap, not locally patched.

## Styling and accessibility

Parts accept class and expose data-slot / Ark attributes. Tailwind has utility overrides;
CSS Modules uses the SignaturePad token contract. Ark owns drawing and pointer capture.

## Local changelog

- 2026-10-04: Preserve Ark's optional hook emit argument.
- 2026-10-03: Provider props accept native Ark APIs without mandatory read-only metadata.