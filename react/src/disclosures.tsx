'use client';
import { forwardRef } from 'react';
import { partClass } from './style-utils.js';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';

export const Accordion = {
  Root: BaseAccordion.Root,
  Item: forwardRef<HTMLDivElement, BaseAccordion.Item.Props>(function AccordionItem({ className, ...props }, ref) { return <BaseAccordion.Item {...props} ref={ref} className={partClass('evoker-accordion-item', className)} />; }),
  Header: forwardRef<HTMLHeadingElement, BaseAccordion.Header.Props>(function AccordionHeader({ className, ...props }, ref) { return <BaseAccordion.Header {...props} ref={ref} className={partClass('evoker-accordion-header', className)} />; }),
  Trigger: forwardRef<HTMLElement, BaseAccordion.Trigger.Props>(function AccordionTrigger({ className, ...props }, ref) { return <BaseAccordion.Trigger {...props} ref={ref} className={partClass('evoker-accordion-trigger', className)} />; }),
  Content: forwardRef<HTMLDivElement, BaseAccordion.Panel.Props>(function AccordionContent({ className, ...props }, ref) { return <BaseAccordion.Panel {...props} ref={ref} className={partClass('evoker-accordion-content', className)} />; }),
};

export const Collapsible = {
  Root: forwardRef<HTMLDivElement, BaseCollapsible.Root.Props>(function CollapsibleRoot({ className, ...props }, ref) { return <BaseCollapsible.Root {...props} ref={ref} className={partClass('evoker-collapsible-root', className)} />; }),
  Trigger: forwardRef<HTMLButtonElement, BaseCollapsible.Trigger.Props>(function CollapsibleTrigger({ className, ...props }, ref) { return <BaseCollapsible.Trigger {...props} ref={ref} className={partClass('evoker-collapsible-trigger', className)} />; }),
  Content: forwardRef<HTMLDivElement, BaseCollapsible.Panel.Props>(function CollapsibleContent({ className, ...props }, ref) { return <BaseCollapsible.Panel {...props} ref={ref} className={partClass('evoker-collapsible-content', className)} />; }),
};
