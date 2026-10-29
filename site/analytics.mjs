export const dashboardUrl = 'https://worklens-ecoxvague.goatcounter.com/';
const endpoint = `${dashboardUrl}count`;
const eventTitles = Object.freeze({ 'demo-used': 'Demo used', 'report-downloaded': 'Report downloaded' });

// This is a visit/session estimate, not an identity-based monthly active-user count.
export function analyticsAllowed(scope) {
  try {
    const { location, navigator } = scope;
    if (location.origin !== 'https://ecoxvague.github.io' || !['/worklens/', '/worklens/index.html'].includes(location.pathname)) return false;
    const preference = new URLSearchParams(location.search).get('analytics');
    if (preference === 'off') scope.localStorage.setItem('skipgc', 't');
    if (preference === 'on') scope.localStorage.removeItem('skipgc');
    return !navigator.webdriver && !navigator.globalPrivacyControl
      && navigator.doNotTrack !== '1' && scope.doNotTrack !== '1'
      && scope.localStorage.getItem('skipgc') !== 't' && preference !== 'off';
  } catch { return false; }
}

export function setupAnalytics(scope) {
  const noop = { track() {} };
  if (!analyticsAllowed(scope)) return noop;
  try {
    let ready = false, failed = false;
    const queued = new Set(), sent = new Set();
    scope.goatcounter = { no_onload: true, no_events: true, path: '/worklens/', title: 'WorkLens prototype', referrer: '' };
    const script = scope.document.createElement('script');
    script.async = true;
    script.src = 'https://gc.zgo.at/count.js';
    script.referrerPolicy = 'no-referrer';
    script.dataset.goatcounter = endpoint;
    function track(name) {
      if (!Object.hasOwn(eventTitles, name) || failed || sent.has(name)) return;
      if (!ready) { queued.add(name); return; }
      try {
        scope.goatcounter.count({ path: name, title: eventTitles[name], referrer: '', event: true });
        sent.add(name);
      } catch { /* Analytics must never block the calculation or download. */ }
    }
    script.addEventListener('load', () => {
      try {
        const collector = scope.goatcounter;
        const getData = collector.get_data;
        collector.get_data = vars => {
          const data = getData(vars);
          delete data.q; // Do not send the page's query string.
          data.r = ''; // Do not send referrers or campaign identifiers.
          return data;
        };
        ready = true;
        collector.count();
        for (const name of queued) track(name);
        queued.clear();
      } catch { failed = true; queued.clear(); }
    });
    script.addEventListener('error', () => { failed = true; queued.clear(); });
    scope.document.head.append(script);
    return { track };
  } catch { return noop; }
}
