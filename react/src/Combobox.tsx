'use client';
import { forwardRef } from 'react';
import { partClass } from './style-utils.js';
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { PortalTheme } from './theme.js';

export const Combobox = {
  Root: BaseCombobox.Root,
  Value: BaseCombobox.Value,
  List: BaseCombobox.List,
  Portal: function ComboboxPortal({ children, ...props }: BaseCombobox.Portal.Props) { return <BaseCombobox.Portal {...props}><PortalTheme>{children}</PortalTheme></BaseCombobox.Portal>; },
  Input: forwardRef<HTMLInputElement, BaseCombobox.Input.Props>(function ComboboxInput({ className, ...props }, ref) { return <BaseCombobox.Input {...props} ref={ref} className={partClass('evoker-input evoker-combobox-input', className)} />; }),
  Trigger: forwardRef<HTMLButtonElement, BaseCombobox.Trigger.Props>(function ComboboxTrigger({ className, ...props }, ref) { return <BaseCombobox.Trigger {...props} ref={ref} className={partClass('evoker-combobox-trigger', className)} />; }),
  Clear: forwardRef<HTMLButtonElement, BaseCombobox.Clear.Props>(function ComboboxClear({ className, ...props }, ref) { return <BaseCombobox.Clear {...props} ref={ref} className={partClass('evoker-combobox-clear', className)} />; }),
  Positioner: forwardRef<HTMLDivElement, BaseCombobox.Positioner.Props>(function ComboboxPositioner({ className, ...props }, ref) { return <BaseCombobox.Positioner {...props} ref={ref} className={partClass('evoker-popover-positioner', className)} />; }),
  Content: forwardRef<HTMLDivElement, BaseCombobox.Popup.Props>(function ComboboxContent({ className, ...props }, ref) { return <BaseCombobox.Popup {...props} ref={ref} className={partClass('evoker-combobox-content', className)} />; }),
  Item: forwardRef<HTMLDivElement, BaseCombobox.Item.Props>(function ComboboxItem({ className, ...props }, ref) { return <BaseCombobox.Item {...props} ref={ref} className={partClass('evoker-combobox-item', className)} />; }),
  ItemIndicator: forwardRef<HTMLSpanElement, BaseCombobox.ItemIndicator.Props>(function ComboboxItemIndicator({ className, ...props }, ref) { return <BaseCombobox.ItemIndicator {...props} ref={ref} className={partClass('evoker-combobox-indicator', className)} />; }),
  Empty: forwardRef<HTMLDivElement, BaseCombobox.Empty.Props>(function ComboboxEmpty({ className, ...props }, ref) { return <BaseCombobox.Empty {...props} ref={ref} className={partClass('evoker-combobox-empty', className)} />; }),
};
