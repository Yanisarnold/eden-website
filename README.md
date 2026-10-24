# Eden Childcare website handover

Prepared 16 September 2026. This package contains the website frontend source and local image assets, not a CMS or a transfer of hosting accounts.

Website: https://edenchildcaregroup.co.uk

Source snapshot: a1ee20e416145dea13db50328cf17341938cae6b. The source folder had no uncommitted changes when packaged. This is a local source snapshot; this handover does not independently confirm the current production files.

## Run the website

Install Node.js 20.9 or newer (the installed Next.js package's minimum) and npm. Use a currently supported Node.js release that meets that requirement.

From this folder:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To check and build:

```sh
npm run lint
npm run build
```

The project uses Next.js 16.2.3, React 19.2.4, TypeScript and Tailwind CSS 4. It exports static files into `out/`. Upload the contents of `out/` to a suitable static host after testing. The existing `npm start` command runs `next start`; do not use it to serve this static export. The build may need internet access for dependencies or fonts.

## Where to edit

| Content | File or folder |
| --- | --- |
| Homepage and other pages | `src/app/` |
| Nursery details, opening times and contact information | `src/data/business.ts` |
| Frequently asked questions | `src/data/faqs.ts` |
| Fee PDF links | `src/data/fee-documents.ts` |
| Image references and credits | `src/data/images.ts` |
| Nursery gallery photos | `src/data/nursery-media.ts` |
| Reviews | `src/data/reviews.ts` |
| Shared interface elements | `src/components/` |
| Local photos and logos | `public/` |

Keep image credits and check usage rights before replacing or reusing third-party assets. Some images and services load from external URLs; the ZIP is not an offline copy of those services.

## Enquiry forms: separate backend required

The frontend sends JSON to `POST /api/lead` on the same domain. The current hosting configuration forwards this request to an agency-managed backend. That backend is not part of this package, and copying the frontend to another host will not copy the enquiry service.

See `src/components/EnquiryModal.tsx` for the full request fields and response handling. A replacement backend must validate requests, control spam, protect personal data and send notifications securely. Never put email credentials in browser code.

The frontend expects an HTTP success response with `ok: true` and a `delivered` object containing at least one boolean `true` to confirm delivery. If no channel delivered but `audited: true`, it shows a saved-but-not-delivered message. Return those values only when the backend has actually completed the corresponding action. Use a non-success HTTP status and an `error` message for failures.

The postcode finder uses api.postcodes.io; the map also relies on external mapping services. Check these on the new host, including any required attribution.

## Known outstanding items

The 6 September release record reports an expired email sender connection. It saved the test enquiry but did not deliver the notification. This package does not repair or retest that connection. Confirm delivery with the current maintainer before relying on the form, and reconcile saved enquiries without sending duplicates.

That release also lists missing approved fee PDFs, Holden Park photos and evidence for an Ofsted Good badge. Check these with Eden before adding them; do not infer a rating from a registration number.

## Adding a CMS

No CMS or editor login exists in this source. A developer can connect a CMS to the existing pages without rebuilding the entire visual design. Agree which fields staff may edit, who may publish and where uploaded images will live.

For the current static site, CMS changes need a build-and-deploy process before they appear publicly. A CMS integration should include a private preview, restricted editor accounts, backups and a tested rollback. Scope that work separately from this source handover.

## Hosting handover checklist

1. Put this folder in a private repository owned by Eden, then give its developer access. Do not share agency-wide credentials.
2. Build and test on a private staging address, including mobile navigation, galleries, postcode search and every nursery page.
3. Supply or replace the enquiry backend and verify actual notification receipt with an agreed test. A successful page load is not proof of delivery.
4. Agree hosting ownership, domain/DNS access, SSL, backups and support responsibilities with the current maintainer. Preserve existing mail DNS records when moving the website.
5. Keep the previous site available for rollback; switch only after approval and repeat the checks on the live domain. Preserve the old agency-domain redirects through coordination with the agency.

This ZIP excludes `.env.local`, Git history, dependencies, build output, internal agency notes, image-sourcing scripts and shared infrastructure configuration. It includes the frontend files needed to install and build. It contains no hosting or domain account transfer, backend database, saved enquiries or new licence grant.

Packaging checks are recorded in `PACKAGE-CHECKS.txt`. The original repository and live website remain unchanged by this handover.
