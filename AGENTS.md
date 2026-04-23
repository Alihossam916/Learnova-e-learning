# Learnova

## Commands

- `npm run dev` - Start dev server (http://localhost:3000)
- `npm run build` - Build production app
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest (outputs coverage to `coverage/`)

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components (ui/, common/, layouts/, providers/)
- `lib/` - Utilities, API, auth, and tests in `lib/__test__/`
- `store/` - Zustand state stores

## Tech Stack

- Next.js 16, React 19, TypeScript
- Jest 30 with custom mocks for `next/headers` and `uuid`
- ESLint + eslint-config-next
- Tailwind CSS v4
- shadcn/ui (radix-ui primitives)

## Testing

Tests are in `lib/__test__/*.test.ts`. Mock files in `__mocks__/`. Jest config includes:
- `moduleNameMapper` alias `@/(.*)` → `<rootDir>/$1`
- Coverage uses v8 provider