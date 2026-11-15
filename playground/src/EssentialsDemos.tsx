import { useId, useState } from 'react';
import type { MouseEvent } from 'react';
import { Accordion, Alert, Button, Collapsible, Combobox, Empty, Field, Input, Pagination, Popover, RadioGroup, Sheet, Skeleton, Table, Toast } from '@k2x/evoker';

export function AccordionDemo() {
  const [value, setValue] = useState<string[]>(['delivery']);
  return <div className="doc-stack"><Accordion.Root value={value} onValueChange={setValue} multiple>
    <Accordion.Item value="delivery"><Accordion.Header><Accordion.Trigger>Delivery details</Accordion.Trigger></Accordion.Header><Accordion.Content>Local pickup is available. Choose a collection point when you check out.</Accordion.Content></Accordion.Item>
    <Accordion.Item value="returns"><Accordion.Header><Accordion.Trigger>Returns and exchanges</Accordion.Trigger></Accordion.Header><Accordion.Content>Keep your receipt and contact the store within 30 days.</Accordion.Content></Accordion.Item>
    <Accordion.Item value="locked" disabled><Accordion.Header><Accordion.Trigger>Archive unavailable</Accordion.Trigger></Accordion.Header><Accordion.Content>Unavailable.</Accordion.Content></Accordion.Item>
  </Accordion.Root><output>Open: {value.join(', ') || 'none'}</output></div>;
}

export function CollapsibleDemo() {
  const [open, setOpen] = useState(false);
  return <Collapsible.Root open={open} onOpenChange={setOpen}><Collapsible.Trigger>Build details</Collapsible.Trigger><Collapsible.Content><p>Production build ready. TypeScript and accessibility checks passed.</p><a href="https://github.com/K2X-Lab/evoker">View repository</a></Collapsible.Content></Collapsible.Root>;
}

export function RadioDemo() {
  const id = useId();
  const [value, setValue] = useState('standard');
  const [submitted, setSubmitted] = useState('');
  return <form className="doc-stack" onSubmit={event => { event.preventDefault(); setSubmitted(String(new FormData(event.currentTarget).get('delivery'))); }}>
    <strong id={id}>Delivery method</strong><RadioGroup.Root aria-labelledby={id} name="delivery" value={value} onValueChange={setValue} required className="doc-stack">
      <label className="doc-row"><RadioGroup.Item value="standard"><RadioGroup.Indicator /></RadioGroup.Item>Standard delivery</label>
      <label className="doc-row"><RadioGroup.Item value="express"><RadioGroup.Indicator /></RadioGroup.Item>Express delivery</label>
      <label className="doc-row"><RadioGroup.Item value="overnight" disabled><RadioGroup.Indicator /></RadioGroup.Item>Overnight unavailable</label>
    </RadioGroup.Root><Button type="submit">Confirm delivery</Button><output aria-live="polite">{submitted && `Delivery confirmed: ${submitted}`}</output>
  </form>;
}

export function ComboboxDemo() {
  const items = ['North terminal', 'South terminal', 'West terminal'];
  const [value, setValue] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState('');
  return <form className="doc-stack" onSubmit={event => { event.preventDefault(); setSubmitted(String(new FormData(event.currentTarget).get('destination'))); }}>
    <Field.Root name="destination"><Field.Label>Destination</Field.Label><Combobox.Root items={items} value={value} onValueChange={setValue} name="destination" required>
      <div style={{ display: 'flex', gap: 4, minWidth: 0 }}><Combobox.Input placeholder="Search terminals" /><Combobox.Trigger aria-label="Show terminals">⌄</Combobox.Trigger><Combobox.Clear aria-label="Clear destination">×</Combobox.Clear></div>
      <Combobox.Portal><Combobox.Positioner sideOffset={6}><Combobox.Content><Combobox.Empty>No terminals found.</Combobox.Empty><Combobox.List>{(item: string) => <Combobox.Item key={item} value={item} disabled={item === 'West terminal'}>{item}<Combobox.ItemIndicator>✓</Combobox.ItemIndicator></Combobox.Item>}</Combobox.List></Combobox.Content></Combobox.Positioner></Combobox.Portal>
    </Combobox.Root><Field.Description>West terminal is currently closed.</Field.Description></Field.Root><Button type="submit">Confirm destination</Button><output aria-live="polite">{submitted && `Destination confirmed: ${submitted}`}</output>
  </form>;
}

export function PopoverDemo() {
  const [name, setName] = useState('Signal studio');
  return <div className="doc-stack"><Popover.Root><Popover.Trigger render={<Button variant="outline" />}>Edit workspace</Popover.Trigger><Popover.Portal><Popover.Positioner sideOffset={8}><Popover.Content className="doc-stack"><Popover.Title>Workspace</Popover.Title><Popover.Description>Changes stay in this demo.</Popover.Description><Field.Root><Field.Label>Workspace name</Field.Label><Input value={name} onValueChange={setName} /></Field.Root><Popover.Close render={<Button />}>Done</Popover.Close></Popover.Content></Popover.Positioner></Popover.Portal></Popover.Root><output>Workspace: {name}</output></div>;
}

export function SheetDemo() {
  const [saved, setSaved] = useState('');
  return <div className="doc-stack"><div className="doc-row">{(['right', 'left', 'top', 'bottom'] as const).map(side => <Sheet.Root key={side}><Sheet.Trigger render={<Button variant="outline" />}>Open {side} sheet</Sheet.Trigger><Sheet.Portal><Sheet.Backdrop /><Sheet.Content side={side}>
    <Sheet.Header><Sheet.Title>Session settings</Sheet.Title><Sheet.Description>Review your workspace before continuing.</Sheet.Description></Sheet.Header><Sheet.Close aria-label="Close session settings">×</Sheet.Close>
    <form className="doc-stack" onSubmit={event => { event.preventDefault(); setSaved(String(new FormData(event.currentTarget).get('session'))); }}><Field.Root><Field.Label>Session name</Field.Label><Input name="session" defaultValue="Evening build" required /></Field.Root><Popover.Root><Popover.Trigger render={<Button variant="outline" />}>More information</Popover.Trigger><Popover.Portal><Popover.Positioner sideOffset={6}><Popover.Content><Popover.Title>Local settings</Popover.Title><Popover.Description>Nothing is sent to a server.</Popover.Description><Popover.Close render={<Button />}>Got it</Popover.Close></Popover.Content></Popover.Positioner></Popover.Portal></Popover.Root><Sheet.Footer><Button type="submit">Save session</Button></Sheet.Footer><output aria-live="polite">{saved && `Saved: ${saved}`}</output></form>
  </Sheet.Content></Sheet.Portal></Sheet.Root>)}</div><output>{saved && `Session: ${saved}`}</output></div>;
}

function ToastActions() {
  const manager = Toast.useToastManager();
  const [undone, setUndone] = useState(false);
  return <div className="doc-stack"><Button onClick={() => { setUndone(false); manager.add({ title: 'Workspace saved', description: 'Your changes are stored in this demo.', actionProps: { children: 'Undo', onClick: () => setUndone(true) } }); }}>Save workspace</Button><output aria-live="polite">{undone && 'Save undone.'}</output><Toast.Portal><Toast.Viewport aria-label="Workspace notifications">{manager.toasts.map(toast => <Toast.Root key={toast.id} toast={toast}><Toast.Content><Toast.Title>{toast.title}</Toast.Title><Toast.Description>{toast.description}</Toast.Description>{toast.actionProps && <Toast.Action {...toast.actionProps} />}</Toast.Content><Toast.Close aria-label="Dismiss notification">×</Toast.Close></Toast.Root>)}</Toast.Viewport></Toast.Portal></div>;
}
export function ToastDemo() { return <Toast.Provider><ToastActions /></Toast.Provider>; }

export function AlertDemo() {
  return <div className="doc-stack"><Alert.Root><Alert.Title>Ready for review</Alert.Title><Alert.Description>Your draft is saved locally. You can keep editing.</Alert.Description></Alert.Root><Alert.Root variant="destructive"><Alert.Title>Connection unavailable</Alert.Title><Alert.Description>Your changes are still on this device. Reconnect before sharing.</Alert.Description></Alert.Root></div>;
}

export function RecordsDemo() {
  const [page, setPage] = useState(1);
  const records = ['Relay inspection', 'Signal review', 'Terminal update', 'Archive check', 'Dispatch report', 'Session summary'];
  const link = (next: number) => ({ href: `#records-page-${next}`, onClick: (event: MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); setPage(next); } });
  return <div className="doc-stack"><Table.Container tabIndex={0} role="region" aria-label="Session records"><Table.Root><Table.Caption>Session records, page {page} of 3</Table.Caption><Table.Header><Table.Row><Table.Head scope="col">Record</Table.Head><Table.Head scope="col">Status</Table.Head></Table.Row></Table.Header><Table.Body>{records.slice((page - 1) * 2, page * 2).map(record => <Table.Row key={record}><Table.Head scope="row">{record}</Table.Head><Table.Cell>Reviewed</Table.Cell></Table.Row>)}</Table.Body></Table.Root></Table.Container><Pagination.Root aria-label="Record pages"><Pagination.Content><Pagination.Item><Pagination.Previous {...link(page - 1)} disabled={page === 1} /></Pagination.Item>{[1, 2, 3].map(number => <Pagination.Item key={number}><Pagination.Link {...link(number)} active={page === number} aria-label={`Page ${number}`}>{number}</Pagination.Link></Pagination.Item>)}<Pagination.Item><Pagination.Next {...link(page + 1)} disabled={page === 3} /></Pagination.Item></Pagination.Content></Pagination.Root><output aria-live="polite">Showing page {page} of 3</output></div>;
}

export function SkeletonDemo() {
  const [loading, setLoading] = useState(true);
  return <div className="doc-stack"><div aria-busy={loading} aria-label="Workspace summary">{loading ? <div className="doc-stack"><Skeleton style={{ width: '65%', height: 24 }} /><Skeleton style={{ width: '100%', height: 16 }} /><Skeleton style={{ width: '85%', height: 16 }} /></div> : <p>Workspace ready. All records reviewed.</p>}</div><p role="status">{loading ? 'Loading workspace summary.' : 'Workspace summary loaded.'}</p><Button variant="outline" onClick={() => setLoading(value => !value)}>{loading ? 'Finish loading' : 'Show loading state'}</Button></div>;
}

export function EmptyDemo() {
  const [created, setCreated] = useState(false);
  return created ? <Alert.Root><Alert.Title>First project created</Alert.Title><Alert.Description>Your workspace is ready.</Alert.Description></Alert.Root> : <Empty.Root><Empty.Header><Empty.Media aria-hidden="true">+</Empty.Media><Empty.Title>No projects yet</Empty.Title><Empty.Description>Start with a blank workspace and make it yours.</Empty.Description></Empty.Header><Empty.Content><Button onClick={() => setCreated(true)}>Create first project</Button><a href="https://github.com/K2X-Lab/evoker">Browse source</a></Empty.Content></Empty.Root>;
}
