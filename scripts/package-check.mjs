import assert from 'node:assert/strict';
import ts from 'typescript';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const fromRegistry = process.argv.includes('--registry');
const consumer = mkdtempSync(resolve(tmpdir(), 'evoker-consumer-'));
try {
  const core = JSON.parse(readFileSync(resolve(root, 'core/package.json')));
  const ui = JSON.parse(readFileSync(resolve(root, 'react/package.json')));
  writeFileSync(resolve(consumer, 'package.json'), JSON.stringify({ name: 'evoker-independent-consumer', private: true, type: 'module', version: '0.0.0' }));
  const packages = fromRegistry ? [`${ui.name}@beta`] : [
    resolve(root, `artifacts/npm/k2x-evoker-core-${core.version}.tgz`), resolve(root, `artifacts/npm/k2x-evoker-${ui.version}.tgz`),
  ];
  execFileSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', ...(fromRegistry ? ['--registry=https://registry.npmjs.org/'] : []), ...packages,
    'react@18.3.1', 'react-dom@18.3.1', '@types/react@18.3.12', '@types/react-dom@18.3.1'], { cwd: consumer, stdio: 'pipe' });
  writeFileSync(resolve(consumer, 'index.html'), '<!doctype html><html><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>');
  writeFileSync(resolve(consumer, 'main.tsx'), `
import { createRoot } from 'react-dom/client';
import { Theme, Field, Input, Card, Select, Checkbox, Switch, Slider, PartyPanel, ResultSummary, MessageLog, ActionBar, StatusDialog, CodeBlock } from '@k2x/evoker';
import type { PartyMember, PartyPanelProps, ResultSummaryProps, MessageLogProps, ActionBarProps, StatusDialogProps, QuestRequirement, CodeBlockProps } from '@k2x/evoker';
import { Button } from '@k2x/evoker/button';
import { Dialog } from '@k2x/evoker/dialog';
import { Tabs } from '@k2x/evoker/tabs';
import { InspectorList, QuestBrief, PartyPanel as BlockPartyPanel, ResultSummary as BlockResultSummary, MessageLog as BlockMessageLog, ActionBar as BlockActionBar, StatusDialog as BlockStatusDialog, CodeBlock as BlockCodeBlock } from '@k2x/evoker/blocks';
import type { PartyGauge, ResultMetric, ResultReward, MessageLogEntry, ActionBarItem, PartyPanelProps as BlockPartyProps, ResultSummaryProps as BlockResultProps, MessageLogProps as BlockLogProps, ActionBarProps as BlockActionProps, StatusDialogProps as BlockStatusProps, CodeBlockProps as BlockCodeBlockProps } from '@k2x/evoker/blocks';
import { Accordion, Collapsible, RadioGroup, Combobox, Popover, Sheet, Toast, Alert, Table, Pagination, Skeleton, Empty } from '@k2x/evoker';
import { RadioGroup as ControlRadioGroup, Combobox as ControlCombobox } from '@k2x/evoker/controls';
import type { PaginationLinkProps, SheetContentProps, AlertProps } from '@k2x/evoker';
import '@k2x/evoker/styles.css';
const destinations = [{ value: 'north', label: 'North' }];
const gauges: readonly PartyGauge[] = [{ id: 'health', label: 'Health', value: 75 }];
const members: readonly PartyMember[] = [{ id: 'mira', name: 'Mira', gauges }];
const metrics: readonly ResultMetric[] = [{ id: 'score', label: 'Score', value: '120' }];
const rewards: readonly ResultReward[] = [{ id: 'access', label: 'Access', detail: 'Unlocked' }];
const entries: readonly MessageLogEntry[] = [{ id: '1', speaker: 'Guide', message: 'Ready' }];
const actions: readonly ActionBarItem[] = [{ id: 'inspect', label: 'Inspect', keys: 'E' }];
const objectives: readonly QuestRequirement[] = [{ id: 'inspect', label: 'Inspect relay', completed: true }];
const variants = [
  { PartyPanel, ResultSummary, MessageLog, ActionBar, StatusDialog },
  { PartyPanel: BlockPartyPanel, ResultSummary: BlockResultSummary, MessageLog: BlockMessageLog, ActionBar: BlockActionBar, StatusDialog: BlockStatusDialog },
];
function App() { return <Theme appearance="light"><Card.Root><Card.Header><Card.Title>Independent consumer</Card.Title></Card.Header><Card.Content>
<Accordion.Root defaultValue={[1]} onValueChange={values => values.forEach(value => value.toFixed())}><Accordion.Item value={1}><Accordion.Header><Accordion.Trigger className={state => state.open ? 'open' : 'closed'}>Details</Accordion.Trigger></Accordion.Header><Accordion.Content>Ready</Accordion.Content></Accordion.Item></Accordion.Root>
<Collapsible.Root><Collapsible.Trigger>More</Collapsible.Trigger><Collapsible.Content>Details</Collapsible.Content></Collapsible.Root>
<RadioGroup.Root name="mode" defaultValue="one" onValueChange={value => value.toUpperCase()}><RadioGroup.Item value="one" aria-label="One"><RadioGroup.Indicator /></RadioGroup.Item></RadioGroup.Root>
<ControlRadioGroup.Root defaultValue="two"><ControlRadioGroup.Item value="two" aria-label="Two" /></ControlRadioGroup.Root>
<Combobox.Root items={destinations} defaultValue={destinations[0]} onValueChange={value => value?.label.toUpperCase()} itemToStringLabel={item => item.label} itemToStringValue={item => item.value}><Combobox.Input aria-label="Destination" /><Combobox.Portal><Combobox.Positioner><Combobox.Content><Combobox.Empty>Nothing found</Combobox.Empty><Combobox.List>{(item: { value: string; label: string }) => <Combobox.Item key={item.value} value={item}>{item.label}<Combobox.ItemIndicator>Selected</Combobox.ItemIndicator></Combobox.Item>}</Combobox.List></Combobox.Content></Combobox.Positioner></Combobox.Portal></Combobox.Root>
<ControlCombobox.Root items={['north']}><ControlCombobox.Input aria-label="Control destination" /></ControlCombobox.Root>
<Popover.Root><Popover.Trigger render={<Button />}>Details</Popover.Trigger><Popover.Portal><Popover.Positioner><Popover.Content><Popover.Title>Details</Popover.Title><Popover.Description>Ready</Popover.Description><Popover.Close>Done</Popover.Close></Popover.Content></Popover.Positioner></Popover.Portal></Popover.Root>
<Sheet.Root><Sheet.Trigger render={<Button />}>Settings</Sheet.Trigger><Sheet.Portal><Sheet.Backdrop /><Sheet.Content side="left"><Sheet.Header><Sheet.Title>Settings</Sheet.Title><Sheet.Description>Local changes</Sheet.Description></Sheet.Header><Sheet.Close aria-label="Close">Close</Sheet.Close><Sheet.Footer>Ready</Sheet.Footer></Sheet.Content></Sheet.Portal></Sheet.Root>
<Toast.Provider><Toast.Portal><Toast.Viewport /></Toast.Portal></Toast.Provider>
<Alert.Root variant="destructive"><Alert.Title>Offline</Alert.Title><Alert.Description>Saved locally</Alert.Description></Alert.Root>
<Table.Container><Table.Root><Table.Caption>Records</Table.Caption><Table.Header><Table.Row><Table.Head scope="col">Name</Table.Head></Table.Row></Table.Header><Table.Body><Table.Row><Table.Cell>Signal</Table.Cell></Table.Row></Table.Body></Table.Root></Table.Container>
<Pagination.Root><Pagination.Content><Pagination.Item><Pagination.Previous disabled /></Pagination.Item><Pagination.Item><Pagination.Link href="#one" active>1</Pagination.Link></Pagination.Item><Pagination.Item><Pagination.Ellipsis /></Pagination.Item><Pagination.Item><Pagination.Next href="#two" /></Pagination.Item></Pagination.Content></Pagination.Root>
<Skeleton /><Empty.Root><Empty.Header><Empty.Media>+</Empty.Media><Empty.Title>Empty</Empty.Title><Empty.Description>Create a record</Empty.Description></Empty.Header><Empty.Content><Button>Create</Button></Empty.Content></Empty.Root>
<Field.Root name="name"><Field.Label>Name</Field.Label><Input defaultValue="Operator" name="name" /></Field.Root>
<Checkbox name="accepted" defaultChecked aria-label="Accepted" /><Switch name="feedback" defaultChecked aria-label="Feedback" />
<Select.Root name="region" defaultValue="north" items={{ north: 'North' }}><Select.Trigger aria-label="Region"><Select.Value /></Select.Trigger><Select.Portal><Select.Positioner><Select.Content><Select.List><Select.Item value="north"><Select.ItemText>North</Select.ItemText></Select.Item></Select.List></Select.Content></Select.Positioner></Select.Portal></Select.Root>
<Slider.Root defaultValue={50}><Slider.Label>Volume</Slider.Label><Slider.Control><Slider.Track><Slider.Indicator /><Slider.Thumb /></Slider.Track></Slider.Control></Slider.Root>
<Tabs.Root defaultValue="a"><Tabs.List aria-label="Views"><Tabs.Trigger value="a">Overview</Tabs.Trigger></Tabs.List><Tabs.Content value="a">Ready</Tabs.Content></Tabs.Root>
<Dialog.Root><Dialog.Trigger render={<Button />}>Open</Dialog.Trigger><Dialog.Portal><Dialog.Backdrop /><Dialog.Content><Dialog.Title>Connected</Dialog.Title><Dialog.Close render={<Button />}>Close</Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
<InspectorList label="Collection" items={[]} value={null} onValueChange={() => {}} detail={() => null} />
<QuestBrief title="Mission" requirements={objectives} onRequirementChange={() => {}} actions={<Button>Claim reward</Button>} />
<QuestBrief title="Legacy mission" requirements={['Inspect relay']} />
<CodeBlock code="const ready = true;" filename="signal.ts" language="ts" highlightedLines={[1]} renderLine={line => <span>{line}</span>} />
<BlockCodeBlock code="build complete" lineNumbers={false} defaultWrap copy={false} />
{variants.map((Parts, index) => <section key={index}>
<Parts.PartyPanel label="Team" members={members} value="mira" onValueChange={() => {}} />
<Parts.ResultSummary title="Complete" metrics={metrics} rewards={rewards} actions={<Button>Accept</Button>} />
<Parts.MessageLog label="History" entries={entries} />
<Parts.ActionBar label="Actions" items={actions} onAction={() => {}} />
<Parts.StatusDialog open={false} onOpenChange={() => {}} title="Status" description="Saved locally" />
</section>)}
</Card.Content></Card.Root></Theme>; }
createRoot(document.getElementById('root')!).render(<App />);
`);
  // Compile the exact copyable examples against the independently installed archive.
  const examplesSource = ts.createSourceFile('EssentialsPages.tsx', readFileSync(resolve(root, 'playground/src/EssentialsPages.tsx'), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const exampleFiles = [];
  function collectExamples(node) {
    if (ts.isPropertyAssignment(node) && node.name.getText(examplesSource) === 'code' && (ts.isStringLiteral(node.initializer) || ts.isNoSubstitutionTemplateLiteral(node.initializer))) {
      const name = `example-${exampleFiles.length + 1}.tsx`;
      writeFileSync(resolve(consumer, name), node.initializer.text);
      exampleFiles.push(name);
    }
    ts.forEachChild(node, collectExamples);
  }
  collectExamples(examplesSource);
  assert.equal(exampleFiles.length, 12, 'Every essential must provide a copyable example');
  execFileSync(process.execPath, [resolve(root, 'node_modules/typescript/bin/tsc'), '--noEmit', '--jsx', 'react-jsx', '--module', 'ESNext', '--moduleResolution', 'bundler', '--target', 'ES2020', '--lib', 'ES2020,DOM', '--strict', '--skipLibCheck', 'main.tsx', ...exampleFiles], { cwd: consumer, stdio: 'pipe' });
  execFileSync(process.execPath, ['--input-type=module', '-e', `
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Accordion, Collapsible, RadioGroup, Combobox, Popover, Sheet, Toast, Alert, Table, Pagination, Skeleton, Empty } from '@k2x/evoker';
for (const component of [Accordion.Root, Collapsible.Root, RadioGroup.Root, Combobox.Root, Popover.Root, Sheet.Root, Toast.Provider]) assert.ok(component);
assert.equal(typeof Toast.createToastManager, 'function');
assert.ok(renderToStaticMarkup(createElement(Alert.Root, null, createElement(Alert.Title, null, 'Ready'))).includes('role="status"'));
assert.ok(renderToStaticMarkup(createElement(Table.Root, null, createElement(Table.Body, null, createElement(Table.Row, null, createElement(Table.Cell, null, 'Record'))))).includes('<table'));
assert.ok(renderToStaticMarkup(createElement(Pagination.Link, { href: '/next', disabled: true }, 'Next')).includes('aria-disabled="true"'));
assert.ok(renderToStaticMarkup(createElement(Skeleton)).includes('aria-hidden="true"'));
assert.ok(renderToStaticMarkup(createElement(Empty.Root, null, createElement(Empty.Title, null, 'No records'))).includes('No records'));
`], { cwd: consumer, stdio: 'pipe' });
  execFileSync(process.execPath, ['--input-type=module', '-e', `
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PartyPanel, CodeBlock } from '@k2x/evoker/blocks';
for (const startLine of [0, -1, NaN, Infinity, 1.5]) {
  assert.throws(() => renderToStaticMarkup(createElement(CodeBlock, {code: 'source', startLine})), /positive safe integer/);
}
const markup = renderToStaticMarkup(createElement(CodeBlock, {code: '<script>signal()</script>', filename: 'source.html'}));
assert.ok(markup.includes('&lt;script&gt;') && !markup.includes('<script>'), 'SSR code must remain escaped text');
for (const gauge of [
  { id: 'bad', label: 'Bad', value: NaN },
  { id: 'bad', label: 'Bad', value: 1, max: 0 },
]) {
  assert.throws(() => renderToStaticMarkup(createElement(PartyPanel, {
    label: 'Invalid', members: [{ id: 'bad', name: 'Invalid', gauges: [gauge] }],
  })), /finite value and positive finite max/, 'PartyPanel must preserve Gauge validation');
}
`], { cwd: consumer, stdio: 'pipe' });
  execFileSync(process.execPath, [resolve(root, 'node_modules/vite/bin/vite.js'), 'build'], { cwd: consumer, stdio: 'pipe' });
  const styles = readdirSync(resolve(consumer, 'dist/assets')).filter(name => name.endsWith('.css')).map(name => readFileSync(resolve(consumer, 'dist/assets', name), 'utf8')).join('\n');
  assert.ok(styles.includes('.evoker-input') && styles.includes('.evoker-modal'), 'Consumer must retain the imported primitive stylesheet');
  for (const name of ['party-panel', 'result-summary', 'message-log', 'action-bar', 'status-dialog', 'code-block', 'accordion-trigger', 'collapsible-trigger', 'radio', 'combobox-content', 'popover-content', 'sheet', 'toast-root', 'alert', 'table', 'pagination', 'skeleton', 'empty-root']) {
    assert.ok(styles.includes('.evoker-' + name), 'Consumer must retain composition styling: ' + name);
  }
  const installed = JSON.parse(readFileSync(resolve(consumer, 'node_modules', ui.name, 'package.json')));
  assert.equal(installed.version, ui.version);
  for (const name of ['core', 'react']) {
    const directory = resolve(consumer, 'node_modules', name === 'core' ? core.name : ui.name);
    const manifest = JSON.parse(readFileSync(resolve(directory, 'package.json')));
    assert.equal(manifest.version, name === 'core' ? core.version : ui.version, 'Consumer must install the expected release versions');
    assert.equal(manifest.license, 'MIT');
    assert.ok(readFileSync(resolve(directory, 'README.md'), 'utf8').includes(`npm install ${manifest.name}@beta`), 'Consumer must receive package-specific installation instructions');
    assert.equal(readFileSync(resolve(directory, 'dist/LICENSE'), 'utf8'), readFileSync(resolve(root, 'LICENSE'), 'utf8'), 'Consumer must receive the project license');
  }
  console.log(`Independent consumer passed: ${fromRegistry ? 'public beta installed from npm, including the resolved core dependency' : 'archives installed outside workspace'}; root/subpath imports, declarations, stylesheet and production build. No workspace aliases.`);
} catch (error) {
  if (error.stdout) console.error(error.stdout.toString());
  if (error.stderr) console.error(error.stderr.toString());
  throw error;
} finally {
  rmSync(consumer, { recursive: true, force: true });
}
