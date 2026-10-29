# WorkLens

**See the work. Check the result.**

[Website](https://ecoxvague.github.io/worklens/)

An independent, open-source project for inspecting QMS optimization problems and independently recalculating reported solution scores.

## Current release

A lightweight public introduction with a working browser-based QUBO demonstration. Change the binary solution, observe the contributing matrix terms, recalculate `xᵀQx`, and download a reproducible JSON report.

The example is synthetic. **Live QMS block integration is not implemented yet.** A matching objective value establishes score consistency, not global optimality or consensus validity. No wallet, private key, or transaction is required.

## Run locally

Node.js 22 or newer; no production dependencies or install step.

```sh
npm start
```

Open http://127.0.0.1:4173.

```sh
npm test
npm run check
```

## Next milestone

- Read-only QMS block lookup and available QUBO data retrieval.
- Exact integer score verification for real problem data and recorded solutions.
- Reproducible exports with block identifiers, data provenance, and calculation conventions.

Existing testnet data can be reset. The live integration will need to track supported endpoint formats and chain resets.

## Usage measurement

[Public dashboard](https://worklens-ecoxvague.goatcounter.com/) · [Methodology and privacy](https://ecoxvague.github.io/worklens/measurement.html)

GoatCounter measures session-based visits, `demo-used` (a user changes a bit or downloads a report), and `report-downloaded`. These are activity estimates, not an identity-based count of unique monthly users. Tracking starts with this integration; no historic usage is fabricated or backfilled. Visits and events are separate metrics and must not be added as users.

Local previews, automated browser tests, and the methodology page are excluded. The integration honors DNT, GPC, and the provider's `skipgc` opt-out. Use `?analytics=off` on the demo to persist an opt-out; `?analytics=on` reverses it. Only that functional preference is stored locally. Query strings and referrers are stripped from the analytics payload. Browser, size, location, referrer, and individual-pageview collection are disabled in the provider settings; aggregate retention is 90 days. No wallet, solution, or report data is sent.

## Deployment

Only `site/` is public web content. GitHub Pages serves its contents from the `gh-pages` branch. No server, private key, or secret is used by the website.

After updating and committing `main`, publish with:

```sh
git subtree push --prefix site origin gh-pages
```

## Design

Designed with [Impeccable](https://github.com/pbakaus/impeccable) guidance, with [Astro Starlight](https://github.com/withastro/starlight) and [Taxonomy](https://github.com/shadcn-ui/taxonomy) reviewed as visual references. No template source was copied. See [DESIGN.md](DESIGN.md).

Manrope is self-hosted under the SIL Open Font License; its license is included beside the font.

## Independence

WorkLens is a community project, not an official QMS product. There is no claim of Builder Program acceptance or QMS endorsement.

## License

MIT. The included font retains its separate OFL license.
