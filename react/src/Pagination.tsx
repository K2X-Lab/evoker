'use client';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { cx } from './style-utils.js';

export interface PaginationLinkProps extends ComponentPropsWithoutRef<'a'> { active?: boolean; disabled?: boolean }
const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(function PaginationLink({ active = false, disabled = false, className, href, tabIndex, onClick, ...props }, ref) {
  return <a {...props} ref={ref} href={disabled ? undefined : href} tabIndex={disabled ? -1 : tabIndex} aria-current={active ? 'page' : undefined} aria-disabled={disabled || undefined} className={cx('evoker-pagination-link', className)} onClick={event => { if (disabled) { event.preventDefault(); return; } onClick?.(event); }} />;
});
export const Pagination = {
  Root: forwardRef<HTMLElement, ComponentPropsWithoutRef<'nav'>>(function PaginationRoot({ className, 'aria-label': label = 'Pagination', ...props }, ref) { return <nav {...props} ref={ref} aria-label={label} className={cx('evoker-pagination', className)} />; }),
  Content: forwardRef<HTMLUListElement, ComponentPropsWithoutRef<'ul'>>(function PaginationContent({ className, ...props }, ref) { return <ul {...props} ref={ref} className={cx('evoker-pagination-content', className)} />; }),
  Item: forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(function PaginationItem({ className, ...props }, ref) { return <li {...props} ref={ref} className={cx('evoker-pagination-item', className)} />; }),
  Link: PaginationLink,
  Previous: forwardRef<HTMLAnchorElement, PaginationLinkProps>(function PaginationPrevious({ children = 'Previous', 'aria-label': label = 'Previous page', ...props }, ref) { return <PaginationLink {...props} ref={ref} aria-label={label}>{children}</PaginationLink>; }),
  Next: forwardRef<HTMLAnchorElement, PaginationLinkProps>(function PaginationNext({ children = 'Next', 'aria-label': label = 'Next page', ...props }, ref) { return <PaginationLink {...props} ref={ref} aria-label={label}>{children}</PaginationLink>; }),
  Ellipsis: forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(function PaginationEllipsis({ className, children = '…', ...props }, ref) { return <span {...props} ref={ref} aria-hidden="true" className={cx('evoker-pagination-ellipsis', className)}>{children}</span>; }),
};
