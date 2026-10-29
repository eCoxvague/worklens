import test from 'node:test';
import assert from 'node:assert/strict';
import { analyticsAllowed, setupAnalytics } from '../site/analytics.mjs';

function scope(url = 'https://ecoxvague.github.io/worklens/') {
  const memory = new Map(), handlers = {};
  const script = { dataset: {}, addEventListener(name, handler) { handlers[name] = handler; } };
  return { location: new URL(url), navigator: {},
    localStorage: { getItem: key => memory.get(key), setItem: (key, value) => memory.set(key,value), removeItem: key => memory.delete(key) },
    document: { createElement: () => script, head: { append() {} } }, handlers, script };
}
test('tracking is limited to production demo pages and ordinary browsers', () => {
  assert.equal(analyticsAllowed(scope()), true);
  for (const url of ['http://127.0.0.1:4173/', 'https://example.com/worklens/', 'https://ecoxvague.github.io/another-project/', 'https://ecoxvague.github.io/worklens/measurement.html']) assert.equal(analyticsAllowed(scope(url)), false);
  for (const flag of ['webdriver','globalPrivacyControl']) { const s=scope();s.navigator[flag]=true;assert.equal(analyticsAllowed(s),false); }
  const s=scope();s.navigator.doNotTrack='1';assert.equal(analyticsAllowed(s),false);
});
test('explicit opt-out persists and can be reversed, without overriding privacy signals', () => {
  const s=scope('https://ecoxvague.github.io/worklens/?analytics=off');
  assert.equal(analyticsAllowed(s), false);
  s.location.search='';assert.equal(analyticsAllowed(s),false);
  s.location.search='?analytics=on';assert.equal(analyticsAllowed(s),true);
  s.navigator.globalPrivacyControl=true;assert.equal(analyticsAllowed(s),false);
});
test('queued events wait for the collector and are deduplicated; query and referrer are stripped', () => {
  const s=scope('https://ecoxvague.github.io/worklens/?private=not-for-analytics');
  const tracker=setupAnalytics(s), counted=[];
  tracker.track('demo-used');tracker.track('demo-used');tracker.track('unrecognized-event');
  s.goatcounter.get_data=vars=>({p:vars?.path??'/worklens/',r:'private-referrer',q:s.location.search});
  s.goatcounter.count=vars=>counted.push(s.goatcounter.get_data(vars));
  s.handlers.load();tracker.track('demo-used');tracker.track('report-downloaded');
  assert.equal(counted.length,3);
  assert.deepEqual(counted.map(hit=>hit.p),['/worklens/','demo-used','report-downloaded']);
  assert.ok(counted.every(hit=>hit.r===''&&!('q' in hit)));
});
test('blocked analytics and unavailable storage do not break the product', () => {
  const s=scope(),tracker=setupAnalytics(s);s.handlers.error();
  assert.doesNotThrow(()=>tracker.track('demo-used'));
  const blocked=scope();Object.defineProperty(blocked,'localStorage',{get(){throw new Error('Storage blocked');}});
  assert.doesNotThrow(()=>setupAnalytics(blocked).track('demo-used'));
  assert.equal(analyticsAllowed(blocked),false);
});
