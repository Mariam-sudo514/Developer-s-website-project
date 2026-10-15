This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Local contact-form testing with Mailpit

Start Docker Desktop, then run these commands from the project root:

```bash
docker compose -f compose.mailpit.yaml up -d
EMAIL_TRANSPORT=mailpit CONTACT_TO_EMAIL=maria.dev.contact@gmail.com npm run dev
```

Keep the existing `CAPTCHA_SECRET` in the root `.env.local`. The inline variables
above select Mailpit and the recipient without changing `.env.local` or needing
Resend credentials. Stop an existing Next.js dev process yourself before starting
another one on port 3000.

Open the form at <http://localhost:3000/contacts>, fill it with test data, complete
the CAPTCHA, and submit. Inspect the captured message, including its recipient
and visitor Reply-To, at <http://localhost:8025>. Mailpit captures the message even
when the recipient is a real address; this configuration has no relay/forwarding
and no external network access.

SMTP defaults to `127.0.0.1:1025` with sender `no-reply@localhost`. Optional
`MAILPIT_SMTP_HOST`, `MAILPIT_SMTP_PORT`, and `MAILPIT_FROM_EMAIL` are documented in
`.env.example`; the host and port must remain `127.0.0.1:1025`. Next.js runs on the host, while
only Mailpit runs in Docker. The Mailpit transport requires development mode and
never falls back to Resend if SMTP fails. With `EMAIL_TRANSPORT` unset, the existing
Resend transport remains the default.

The application does not persist submissions. Mailpit's temporary SQLite files
are confined to RAM-backed `/tmp`, with swap disabled and no persistent volumes
or container logs. Stopping Mailpit discards captured messages:

```bash
docker compose -f compose.mailpit.yaml down
```

For production, set `EMAIL_TRANSPORT=resend`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
and `CONTACT_FROM_EMAIL` in the server environment. Use a sender allowed by Resend.
Keep all of these server-side, without the `NEXT_PUBLIC_` prefix. Never commit real
API keys or copy local Mailpit settings into production.

`npm test` exercises transport selection and delivery with mocks, without calling
Resend or sending real email.
