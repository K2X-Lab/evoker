import { StrictMode, createRef } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { Accordion, Alert, Collapsible, Empty, Pagination, RadioGroup, Skeleton, Table, Theme, Toast } from '@k2x/evoker';

export async function runEssentialsChecks() {
  const host = document.createElement('div');
  document.body.append(host);
  const root = createRoot(host);
  const check = (condition: unknown, message: string) => { if (!condition) throw new Error(message); };
  const render = (children: ReactNode) => flushSync(() => root.render(<StrictMode><Theme reducedMotion>{children}</Theme></StrictMode>));
  const click = (element: Element | null) => { check(element, 'Expected an interactive element'); flushSync(() => (element as HTMLElement).click()); };
  const waitFor = async (condition: () => boolean, message: string) => { const start = performance.now(); while (!condition()) { if (performance.now() - start > 3000) throw new Error(message); await new Promise(resolve => setTimeout(resolve, 10)); } };
  try {
    let values: string[] = [];
    const trigger = createRef<HTMLButtonElement>();
    render(<Accordion.Root multiple onValueChange={next => { values = next; }}><Accordion.Item value="one"><Accordion.Header><Accordion.Trigger ref={trigger} className={state => state.open ? 'open-trigger' : 'closed-trigger'}>One</Accordion.Trigger></Accordion.Header><Accordion.Content>First details</Accordion.Content></Accordion.Item><Accordion.Item value="two"><Accordion.Header><Accordion.Trigger>Two</Accordion.Trigger></Accordion.Header><Accordion.Content>Second details</Accordion.Content></Accordion.Item><Accordion.Item value="locked" disabled><Accordion.Header><Accordion.Trigger>Locked</Accordion.Trigger></Accordion.Header><Accordion.Content>Hidden details</Accordion.Content></Accordion.Item></Accordion.Root>);
    check(trigger.current?.classList.contains('evoker-accordion-trigger') && trigger.current.classList.contains('closed-trigger'), 'Accordion must compose state-aware classes and forward refs');
    click(trigger.current); click(host.querySelectorAll('button')[1]);
    check(values.join(',') === 'one,two', 'Accordion must preserve multiple expansion and typed callback values');
    click(host.querySelectorAll('button')[2]);
    check(values.join(',') === 'one,two' && trigger.current?.getAttribute('aria-expanded') === 'true', 'Disabled accordion must not change expansion');

    render(<Collapsible.Root><Collapsible.Trigger>Details</Collapsible.Trigger><Collapsible.Content>Linked details</Collapsible.Content></Collapsible.Root>);
    click(host.querySelector('button'));
    check(host.querySelector('button')?.getAttribute('aria-expanded') === 'true' && document.getElementById(host.querySelector('button')!.getAttribute('aria-controls')!)?.textContent === 'Linked details', 'Collapsible must retain linked expanded semantics');

    render(<form><RadioGroup.Root name="mode" defaultValue="one" aria-label="Mode"><label><RadioGroup.Item value="one"><RadioGroup.Indicator /></RadioGroup.Item>One</label><label><RadioGroup.Item value="two"><RadioGroup.Indicator /></RadioGroup.Item>Two</label><RadioGroup.Item value="locked" disabled aria-label="Locked" /></RadioGroup.Root></form>);
    click(host.querySelectorAll('[role="radio"]')[1]);
    check(new FormData(host.querySelector('form')!).get('mode') === 'two', 'RadioGroup must submit its selected native form value');
    click(host.querySelectorAll('[role="radio"]')[2]);
    check(new FormData(host.querySelector('form')!).get('mode') === 'two', 'Disabled radio must not affect form state');

    let activations = 0;
    render(<Pagination.Root><Pagination.Content><Pagination.Item><Pagination.Previous disabled href="/unreachable" onClick={() => activations++} /></Pagination.Item><Pagination.Item><Pagination.Link href="#page-1" active onClick={event => { event.preventDefault(); activations++; }}>1</Pagination.Link></Pagination.Item><Pagination.Item><Pagination.Ellipsis /></Pagination.Item></Pagination.Content></Pagination.Root>);
    click(host.querySelector('[aria-disabled="true"]'));
    check(activations === 0 && !host.querySelector('[aria-disabled="true"]')?.hasAttribute('href') && host.querySelector('[aria-disabled="true"]')?.getAttribute('tabindex') === '-1', 'Disabled pagination must remove destination, focus and activation');
    click(host.querySelector('[aria-current="page"]'));
    check(activations === 1 && host.querySelector('nav')?.getAttribute('aria-label') === 'Pagination', 'Pagination must expose current page and forward active-link events');

    const table = createRef<HTMLTableElement>();
    render(<><Table.Container tabIndex={0} role="region" aria-label="Records"><Table.Root ref={table}><Table.Caption>Records</Table.Caption><Table.Header><Table.Row><Table.Head scope="col">Name</Table.Head></Table.Row></Table.Header><Table.Body><Table.Row><Table.Cell>Signal</Table.Cell></Table.Row></Table.Body><Table.Footer><Table.Row><Table.Cell>One record</Table.Cell></Table.Row></Table.Footer></Table.Root></Table.Container><Alert.Root variant="destructive"><Alert.Title>Offline</Alert.Title><Alert.Description>Saved locally.</Alert.Description></Alert.Root><Skeleton aria-hidden={false} /><Empty.Root><Empty.Header><Empty.Media aria-hidden="true">+</Empty.Media><Empty.Title>No records</Empty.Title><Empty.Description>Create one.</Empty.Description></Empty.Header><Empty.Content><button onClick={() => activations++}>Create</button></Empty.Content></Empty.Root></>);
    check(table.current?.tagName === 'TABLE' && table.current.caption?.textContent === 'Records' && table.current.querySelector('th')?.scope === 'col' && !!table.current.tFoot, 'Table must preserve native elements, refs and heading scope');
    check(host.querySelector('.evoker-alert')?.getAttribute('role') === 'status' && host.querySelector('.evoker-skeleton')?.getAttribute('aria-hidden') === 'true', 'Alert defaults to polite status; Skeleton remains decorative');
    check(getComputedStyle(host.querySelector('.evoker-skeleton')!).animationName === 'none', 'Skeleton must honor reduced motion');
    click(host.querySelector('.evoker-empty-content button'));
    check(activations === 2, 'Empty must preserve supplied action behavior');

    const manager = Toast.createToastManager();
    function Notifications() {
      const { toasts } = Toast.useToastManager();
      return <Toast.Portal><Toast.Viewport aria-label="Test notifications">{toasts.map(toast => <Toast.Root key={toast.id} toast={toast}><Toast.Content><Toast.Title>{toast.title}</Toast.Title><Toast.Description>{toast.description}</Toast.Description></Toast.Content><Toast.Close aria-label="Dismiss">×</Toast.Close></Toast.Root>)}</Toast.Viewport></Toast.Portal>;
    }
    render(<Toast.Provider toastManager={manager} timeout={180}><Notifications /></Toast.Provider>);
    flushSync(() => manager.add({ id: 'timed', title: 'Timed notice', description: 'Expires automatically.' }));
    await waitFor(() => !!document.querySelector('.evoker-toast-root'), 'Toast did not mount');
    check(document.querySelector('.evoker-toast-root')?.closest('[data-reduced-motion="true"]'), 'Toast portal must preserve motion preferences');
    const viewport = document.querySelector('[aria-label="Test notifications"]')!;
    flushSync(() => viewport.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, relatedTarget: document.body })));
    await new Promise(resolve => setTimeout(resolve, 240));
    check(document.querySelector('.evoker-toast-title')?.textContent === 'Timed notice', 'Hovering the toast viewport must pause its timer');
    flushSync(() => viewport.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: document.body })));
    await waitFor(() => !document.querySelector('.evoker-toast-root'), 'Toast must resume and auto-dismiss after leaving');
    flushSync(() => manager.add({ id: 'persistent', title: 'Persistent notice', timeout: 0 }));
    await waitFor(() => !!document.querySelector('.evoker-toast-root'), 'Persistent toast did not mount');
    flushSync(() => manager.update('persistent', { title: 'Updated notice' }));
    await waitFor(() => document.querySelector('.evoker-toast-title')?.textContent === 'Updated notice', 'Toast update must render');
    click(document.querySelector('.evoker-toast-close'));
    await waitFor(() => !document.querySelector('.evoker-toast-root'), 'Toast close must dismiss');
    return 'Essentials passed: disclosures, state-aware classes/refs, native radio forms, disabled pagination, table semantics, feedback, reduced motion and toast lifecycle.';
  } finally { flushSync(() => root.unmount()); host.remove(); }
}
