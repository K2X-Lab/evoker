import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

export async function runEssentialsBrowserChecks({ send, evaluate, waitFor, key, route }) {
  const focus = selector => evaluate(`document.querySelector(${JSON.stringify(selector)}).focus()`);
  const activate = async selector => { await focus(selector); await key('Enter', 'Enter', 13); };
  const insert = async (selector, text) => { await evaluate(`(() => { const input = document.querySelector(${JSON.stringify(selector)}); input.focus(); input.select(); })()`); await send('Input.insertText', { text }); };
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await route('accordion');
  await activate('.doc-preview .evoker-accordion-item:nth-child(2) button');
  await waitFor(() => evaluate(`document.querySelector('.doc-preview output').textContent === 'Open: delivery, returns'`), 'keyboard accordion expansion');
  await route('collapsible');
  await activate('.doc-preview .evoker-collapsible-trigger');
  await waitFor(() => evaluate(`document.querySelector('.doc-preview .evoker-collapsible-trigger').getAttribute('aria-expanded') === 'true'`), 'keyboard disclosure');

  await route('radio-group');
  await focus('.doc-preview [role="radio"][data-checked]');
  await key('ArrowDown', 'ArrowDown', 40);
  await waitFor(() => evaluate(`document.querySelector('.doc-preview [role="radio"][data-checked]').textContent !== null && new FormData(document.querySelector('.doc-preview form')).get('delivery') === 'express'`), 'radio arrow selection');
  await activate('.doc-preview button[type="submit"]');
  assert.match(await evaluate(`document.querySelector('.doc-preview output').textContent`), /express/);

  await route('combobox');
  await insert('.doc-preview input[role="combobox"]', 'South');
  await waitFor(() => evaluate(`document.querySelectorAll('.evoker-combobox-item').length === 1`), 'combobox filters options');
  await key('ArrowDown', 'ArrowDown', 40);
  await key('Enter', 'Enter', 13);
  await waitFor(() => evaluate(`document.querySelector('.doc-preview input[role="combobox"]').value === 'South terminal'`), 'combobox keyboard selection');
  await activate('.doc-preview button[type="submit"]');
  assert.equal(await evaluate(`document.querySelector('.doc-preview output').textContent`), 'Destination confirmed: South terminal');
  await insert('.doc-preview input[role="combobox"]', 'nothing-matches');
  await waitFor(() => evaluate(`document.querySelector('.evoker-combobox-empty')?.textContent === 'No terminals found.'`), 'combobox no matches');
  await key('Escape', 'Escape', 27);
  await activate('.doc-preview [aria-label="Clear destination"]');
  await activate('.doc-preview [aria-label="Show terminals"]');
  await waitFor(() => evaluate(`document.querySelectorAll('.evoker-combobox-item').length === 3`), 'combobox opens after clear');
  assert.equal(await evaluate(`document.querySelector('.evoker-combobox-item[data-disabled]').getAttribute('aria-disabled')`), 'true');
  await key('Escape', 'Escape', 27);

  await route('popover');
  await activate('.doc-preview button');
  await waitFor(() => evaluate(`!!document.querySelector('.evoker-popover-content input')`), 'popover opens');
  await insert('.evoker-popover-content input', 'Night studio');
  await key('Escape', 'Escape', 27);
  await waitFor(() => evaluate(`!document.querySelector('.evoker-popover-content') && document.activeElement?.textContent === 'Edit workspace'`), 'popover Escape and focus restoration');
  assert.match(await evaluate(`document.querySelector('.doc-preview output').textContent`), /Night studio/);
  await activate('.doc-preview button');
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 1, y: 1, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 1, y: 1, button: 'left', clickCount: 1 });
  await waitFor(() => evaluate(`!document.querySelector('.evoker-popover-content')`), 'popover outside dismissal');

  await route('sheet');
  for (const side of ['right', 'left', 'top', 'bottom']) {
    await activate(`.doc-preview .doc-row > button:nth-child(${['right', 'left', 'top', 'bottom'].indexOf(side) + 1})`);
    await waitFor(() => evaluate(`document.querySelector('.evoker-sheet[data-side="${side}"]')?.getAttribute('role') === 'dialog'`), `${side} sheet opens`);
    assert.equal(await evaluate(`!!document.getElementById(document.querySelector('.evoker-sheet').getAttribute('aria-labelledby'))`), true, 'Sheet must have an accessible title');
    await waitFor(() => evaluate(`(() => { const box = document.querySelector('.evoker-sheet').getBoundingClientRect(); return box.left >= -1 && box.right <= innerWidth + 1 && box.top >= -1 && box.bottom <= innerHeight + 1; })()`), `${side} sheet fits mobile viewport`);
    const close = await evaluate(`(() => { const sheet = document.querySelector('.evoker-sheet').getBoundingClientRect(); const close = document.querySelector('.evoker-sheet-close').getBoundingClientRect(); return close.top >= sheet.top && close.right <= sheet.right && close.left > sheet.left + sheet.width / 2; })()`);
    assert.equal(close, true, 'Sheet close stays top right');
    if (side === 'right') {
      await activate('.evoker-sheet form button[type="button"]');
      await waitFor(() => evaluate(`!!document.querySelector('.evoker-popover-content')`), 'nested popover opens in sheet');
      await key('Escape', 'Escape', 27);
      await waitFor(() => evaluate(`!document.querySelector('.evoker-popover-content') && !!document.querySelector('.evoker-sheet')`), 'first Escape closes only nested popover');
    }
    await key('Escape', 'Escape', 27);
    await waitFor(() => evaluate(`!document.querySelector('.evoker-sheet') && document.activeElement?.textContent === 'Open ${side} sheet'`), `${side} sheet restores focus`);
  }
  await route('toast');
  await activate('.doc-preview button');
  await waitFor(() => evaluate(`document.querySelector('.evoker-toast-title')?.textContent === 'Workspace saved'`), 'toast appears');
  await activate('.evoker-toast-action');
  assert.equal(await evaluate(`document.querySelector('.doc-preview output').textContent`), 'Save undone.');
  if (await evaluate(`!!document.querySelector('.evoker-toast-close')`)) await activate('.evoker-toast-close');
  await waitFor(() => evaluate(`!document.querySelector('.evoker-toast-root')`), 'toast keyboard dismissal');

  await route('pagination');
  await activate('.doc-preview [aria-label="Next page"]');
  await waitFor(() => evaluate(`document.querySelector('.doc-preview [aria-current="page"]').textContent === '2'`), 'pagination keyboard activation');
  assert.match(await evaluate(`document.querySelector('.doc-preview table').textContent`), /Terminal update/);
  await activate('.doc-preview [aria-label="Next page"]');
  assert.equal(await evaluate(`document.querySelector('.doc-preview [aria-label="Next page"]').getAttribute('aria-disabled')`), 'true');
  await route('skeleton');
  await activate('.doc-preview button');
  assert.equal(await evaluate(`document.querySelector('.doc-preview [aria-busy]').getAttribute('aria-busy')`), 'false');
  await route('empty');
  await activate('.doc-preview button');
  assert.equal(await evaluate(`document.querySelector('.doc-preview .evoker-alert-title').textContent`), 'First project created');

  // The playground's own key handler must not take over nested widgets.
  await evaluate(`location.hash = ''`);
  await waitFor(() => evaluate(`!!document.querySelector('.catalog')`), 'essentials playground');
  await focus('#demo-radio-group [role="radio"][data-checked]');
  await key('ArrowDown', 'ArrowDown', 40);
  await waitFor(() => evaluate(`new FormData(document.querySelector('#demo-radio-group form')).get('delivery') === 'express'`), 'playground preserves radio keyboard behavior');
  await focus('#demo-accordion button');
  await key('ArrowDown', 'ArrowDown', 40);
  assert.equal(await evaluate(`document.activeElement === document.querySelector('#demo-accordion button')`), true, 'playground preserves native accordion keyboard behavior');
  await insert('#demo-combobox input[role="combobox"]', 'South');
  await waitFor(() => evaluate(`document.querySelectorAll('.evoker-combobox-item').length === 1`), 'playground combobox filters');
  await key('ArrowDown', 'ArrowDown', 40); await key('Enter', 'Enter', 13);
  assert.equal(await evaluate(`document.querySelector('#demo-combobox input[role="combobox"]').value`), 'South terminal');
  await route('accordion');
  if (process.env.EVOKER_SCREENSHOTS) {
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
    await evaluate('new Promise(resolve => requestAnimationFrame(resolve))');
    writeFileSync(resolve(process.env.EVOKER_SCREENSHOTS, 'evoker-essentials.png'), Buffer.from((await send('Page.captureScreenshot', { format: 'png' })).data, 'base64'));
  }
  console.log('Essentials browser passed: keyboard/forms/search, all sheet sides/nested overlays/focus, toast actions, pagination and scoped playground input.');
}
