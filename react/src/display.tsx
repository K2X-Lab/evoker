'use client';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { cx } from './style-utils.js';

export interface AlertProps extends ComponentPropsWithoutRef<'div'> { variant?: 'default' | 'destructive' }
export const Alert = {
  Root: forwardRef<HTMLDivElement, AlertProps>(function AlertRoot({ variant = 'default', className, role = 'status', ...props }, ref) { return <div {...props} ref={ref} role={role} className={cx('evoker-alert', `evoker-alert--${variant}`, className)} />; }),
  Title: forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h3'>>(function AlertTitle({ className, ...props }, ref) { return <h3 {...props} ref={ref} className={cx('evoker-alert-title', className)} />; }),
  Description: forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'>>(function AlertDescription({ className, ...props }, ref) { return <p {...props} ref={ref} className={cx('evoker-description', className)} />; }),
};

export const Table = {
  Container: forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(function TableContainer({ className, ...props }, ref) { return <div {...props} ref={ref} className={cx('evoker-table-container', className)} />; }),
  Root: forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(function TableRoot({ className, ...props }, ref) { return <table {...props} ref={ref} className={cx('evoker-table', className)} />; }),
  Caption: forwardRef<HTMLTableCaptionElement, ComponentPropsWithoutRef<'caption'>>(function TableCaption({ className, ...props }, ref) { return <caption {...props} ref={ref} className={cx('evoker-table-caption', className)} />; }),
  Header: forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'thead'>>(function TableHeader({ className, ...props }, ref) { return <thead {...props} ref={ref} className={cx('evoker-table-header', className)} />; }),
  Body: forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'tbody'>>(function TableBody({ className, ...props }, ref) { return <tbody {...props} ref={ref} className={cx('evoker-table-body', className)} />; }),
  Footer: forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'tfoot'>>(function TableFooter({ className, ...props }, ref) { return <tfoot {...props} ref={ref} className={cx('evoker-table-footer', className)} />; }),
  Row: forwardRef<HTMLTableRowElement, ComponentPropsWithoutRef<'tr'>>(function TableRow({ className, ...props }, ref) { return <tr {...props} ref={ref} className={cx('evoker-table-row', className)} />; }),
  Head: forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'th'>>(function TableHead({ className, ...props }, ref) { return <th {...props} ref={ref} className={cx('evoker-table-head', className)} />; }),
  Cell: forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'td'>>(function TableCell({ className, ...props }, ref) { return <td {...props} ref={ref} className={cx('evoker-table-cell', className)} />; }),
};

export const Skeleton = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(function Skeleton({ className, ...props }, ref) { return <div {...props} ref={ref} aria-hidden="true" className={cx('evoker-skeleton', className)} />; });

export const Empty = {
  Root: forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(function EmptyRoot({ className, ...props }, ref) { return <div {...props} ref={ref} className={cx('evoker-empty-root', className)} />; }),
  Header: forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(function EmptyHeader({ className, ...props }, ref) { return <div {...props} ref={ref} className={cx('evoker-empty-header', className)} />; }),
  Media: forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(function EmptyMedia({ className, ...props }, ref) { return <div {...props} ref={ref} className={cx('evoker-empty-media', className)} />; }),
  Title: forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h3'>>(function EmptyTitle({ className, ...props }, ref) { return <h3 {...props} ref={ref} className={cx('evoker-empty-title', className)} />; }),
  Description: forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'>>(function EmptyDescription({ className, ...props }, ref) { return <p {...props} ref={ref} className={cx('evoker-empty-description', className)} />; }),
  Content: forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(function EmptyContent({ className, ...props }, ref) { return <div {...props} ref={ref} className={cx('evoker-empty-content', className)} />; }),
};
