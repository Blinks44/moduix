import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group';
import { clsx } from 'clsx';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import { Checkbox } from '../Checkbox';
import styles from './CheckboxGroup.module.css';

type CheckboxGroupContextValue = {
  defaultLabelId: string;
  registerLabel: (id: string) => () => void;
};

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null);

type CheckboxGroupProps = CheckboxGroupPrimitive.Props;
type CheckboxGroupState = CheckboxGroupPrimitive.State;
type CheckboxGroupChangeEventReason = CheckboxGroupPrimitive.ChangeEventReason;
type CheckboxGroupChangeEventDetails = CheckboxGroupPrimitive.ChangeEventDetails;
type CheckboxGroupLabelProps = React.ComponentProps<'div'>;
type CheckboxGroupListProps = React.ComponentProps<'div'>;
type CheckboxGroupItemProps = React.ComponentProps<'label'> & {
  render?: React.ReactElement<{ className?: string }>;
};
type CheckboxGroupItemControlProps = React.ComponentProps<typeof Checkbox>;
type CheckboxGroupItemLabelProps = React.ComponentProps<'span'>;

function CheckboxGroup({
  className,
  children,
  'aria-labelledby': ariaLabelledby,
  ...props
}: CheckboxGroupProps) {
  const defaultLabelId = React.useId();
  const [labelId, setLabelId] = React.useState<string | undefined>(undefined);

  const registerLabel = React.useCallback((id: string) => {
    setLabelId(id);

    return () => {
      setLabelId((currentLabelId) => (currentLabelId === id ? undefined : currentLabelId));
    };
  }, []);

  return (
    <CheckboxGroupContext.Provider value={{ defaultLabelId, registerLabel }}>
      <CheckboxGroupPrimitive
        data-slot="checkbox-group-root"
        aria-labelledby={ariaLabelledby ?? labelId}
        className={mergeClassName(className, styles.root)}
        {...props}
      >
        {children}
      </CheckboxGroupPrimitive>
    </CheckboxGroupContext.Provider>
  );
}

function CheckboxGroupLabel({ className, id, ...props }: CheckboxGroupLabelProps) {
  const context = React.useContext(CheckboxGroupContext);
  const resolvedId = id ?? context?.defaultLabelId;

  React.useEffect(() => {
    if (!context || !resolvedId) {
      return undefined;
    }

    return context.registerLabel(resolvedId);
  }, [context, resolvedId]);

  return (
    <div
      data-slot="checkbox-group-label"
      id={resolvedId}
      className={clsx(styles.label, className)}
      {...props}
    />
  );
}

function CheckboxGroupList({ className, ...props }: CheckboxGroupListProps) {
  return (
    <div data-slot="checkbox-group-list" className={clsx(styles.list, className)} {...props} />
  );
}

const CheckboxGroupItem = React.forwardRef<React.ComponentRef<'label'>, CheckboxGroupItemProps>(
  function CheckboxGroupItem({ className, render, children, ...props }, ref) {
    const itemProps = {
      ref,
      'data-slot': 'checkbox-group-item',
      className: clsx(styles.item, className),
      ...props,
      children,
    };

    if (render) {
      return React.cloneElement(render, {
        ...itemProps,
        ...render.props,
        className: clsx(itemProps.className, render.props?.className),
      });
    }

    return <label {...itemProps} />;
  },
);

function CheckboxGroupItemControl(props: CheckboxGroupItemControlProps) {
  return <Checkbox data-slot="checkbox-group-item-control" {...props} />;
}

function CheckboxGroupItemLabel({ className, ...props }: CheckboxGroupItemLabelProps) {
  return (
    <span
      data-slot="checkbox-group-item-label"
      className={clsx(styles.itemLabel, className)}
      {...props}
    />
  );
}

export {
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupList,
  CheckboxGroupItem,
  CheckboxGroupItemControl,
  CheckboxGroupItemLabel,
};

export type {
  CheckboxGroupProps,
  CheckboxGroupState,
  CheckboxGroupChangeEventReason,
  CheckboxGroupChangeEventDetails,
  CheckboxGroupLabelProps,
  CheckboxGroupListProps,
  CheckboxGroupItemProps,
  CheckboxGroupItemControlProps,
  CheckboxGroupItemLabelProps,
};