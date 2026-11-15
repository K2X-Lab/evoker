'use client';
import { forwardRef } from 'react';
import { partClass } from './style-utils.js';
import { Toast as BaseToast } from '@base-ui/react/toast';
import { PortalTheme } from './theme.js';

export const Toast = {
  Provider: BaseToast.Provider,
  useToastManager: BaseToast.useToastManager,
  createToastManager: BaseToast.createToastManager,
  Portal: function ToastPortal({ children, ...props }: BaseToast.Portal.Props) { return <BaseToast.Portal {...props}><PortalTheme>{children}</PortalTheme></BaseToast.Portal>; },
  Viewport: forwardRef<HTMLDivElement, BaseToast.Viewport.Props>(function ToastViewport({ className, ...props }, ref) { return <BaseToast.Viewport {...props} ref={ref} className={partClass('evoker-toast-viewport', className)} />; }),
  Root: forwardRef<HTMLDivElement, BaseToast.Root.Props>(function ToastRoot({ className, ...props }, ref) { return <BaseToast.Root {...props} ref={ref} className={partClass('evoker-toast-root', className)} />; }),
  Content: forwardRef<HTMLDivElement, BaseToast.Content.Props>(function ToastContent({ className, ...props }, ref) { return <BaseToast.Content {...props} ref={ref} className={partClass('evoker-toast-content', className)} />; }),
  Title: forwardRef<HTMLHeadingElement, BaseToast.Title.Props>(function ToastTitle({ className, ...props }, ref) { return <BaseToast.Title {...props} ref={ref} className={partClass('evoker-toast-title', className)} />; }),
  Description: forwardRef<HTMLParagraphElement, BaseToast.Description.Props>(function ToastDescription({ className, ...props }, ref) { return <BaseToast.Description {...props} ref={ref} className={partClass('evoker-toast-description', className)} />; }),
  Action: forwardRef<HTMLButtonElement, BaseToast.Action.Props>(function ToastAction({ className, ...props }, ref) { return <BaseToast.Action {...props} ref={ref} className={partClass('evoker-toast-action', className)} />; }),
  Close: forwardRef<HTMLButtonElement, BaseToast.Close.Props>(function ToastClose({ className, ...props }, ref) { return <BaseToast.Close {...props} ref={ref} className={partClass('evoker-toast-close', className)} />; }),
};
