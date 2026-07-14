# 1. Folder Structure
```text
- app
  - ai
    - cost-scan
    - opportunity-scan
  - api
    - ai-opportunity-audit
    - aicost-audit
    - cost-audit
    - cost-scan
    - notify
    - opportunity-scan
    - send-report
  - globals.css
  - layout.tsx
  - page.tsx
  - privacy-policy
  - result
- components
  - AnimatedButton.tsx
  - AnimatedLink.tsx
  - BrandLogo.tsx
  - CustomCursor.tsx
  - Header.tsx
  - MagneticWrapper.tsx
  - RollingText.tsx
- config
  - cost-scan-insights.json
- data
  - submissions
- docs
- font
- hermes
  - apiClient.ts
  - costScanConversation.ts
  - questionnaire.ts
  - responseHandler.ts
- local-storage
- modules
  - cost-audit
    - questions
      - hooks
      - steps
    - results
    - schema
    - scoring
    - types
    - utils
  - opportunity-audit
    - questions
    - results
    - schema
    - scoring
    - types
    - utils
  - results
  - scan-results
- public
  - assets
    - logo
- shared
  - components
    - animations.ts
    - ContactBar.tsx
    - EmailModal.tsx
    - Footer.tsx
    - LockOverlay.tsx
    - StatCard.tsx
    - UnlockModal.tsx
    - WizardUI.tsx
  - config
  - database
  - services
    - notification.service.ts
    - notifications
    - storage
  - utils
    - audit.service.ts
    - brand-styles.ts
    - brevo.service.ts
    - browser-factory.ts
    - extractor.service.ts
    - frontend-storage.service.ts
    - logger.ts
    - medium-analysis.service.ts
    - pdf-generator.ts
    - rag-styles.ts
    - report-content-generator.ts
```

# 2. Routing
The architecture utilizes **Next.js App Router**, which is a file-system based routing mechanism mapped inside the `app/` directory. Standard React Router components are **not used**.
- **BrowserRouter, Routes, Route, createBrowserRouter**: Not applicable.
- **Layout routes**: Defined natively using Next.js `layout.tsx` files (e.g., `app/layout.tsx`).
- **Protected routes**: Handled via Next.js server-side logic (Middleware or Route Handlers), typically tied to Supabase.

# 3. Layout
- **Main / Root layout**: `app/layout.tsx`
- **Navbar component**: `components/Header.tsx` (with supporting top-bar `shared/components/ContactBar.tsx`).
- **Footer component**: `shared/components/Footer.tsx`.
- **Sidebar component**: None detected for the global layout.
- **Outlet usage**: Not applicable. Next.js passes child route components into layouts via the standard `{children}` React prop.

# 4. Components
All shared components fall into two directories:
1. `components/` (Brand & UI primitives): `AnimatedButton.tsx`, `AnimatedLink.tsx`, `BrandLogo.tsx`, `CustomCursor.tsx`, `Header.tsx`, `MagneticWrapper.tsx`, `RollingText.tsx`.
2. `shared/components/` (Functional cross-app components): `ContactBar.tsx`, `EmailModal.tsx`, `Footer.tsx`, `LockOverlay.tsx`, `StatCard.tsx`, `UnlockModal.tsx`, `WizardUI.tsx`.

# 5. API Layer
- **axios clients / fetch wrappers**: A custom wrapper exists at `hermes/apiClient.ts`, but the native `fetch()` API is predominantly used throughout.
- **services**:
  - `shared/services/notification.service.ts`
  - `shared/services/storage/google-cloud-storage.service.ts`
  - `shared/services/storage/local-storage.service.ts`
- **API helpers**: Next.js server-side API Routes located in `app/api/` (e.g., `app/api/cost-scan/submit/route.ts`).
- **authentication**: Supabase (`@supabase/supabase-js`), initialized natively and configured via `.env` keys (`NEXT_PUBLIC_SUPABASE_URL`).

# 6. State Management
- **Redux / Zustand / MobX**: Not present.
- **Context / Local State**: Rely entirely on native React Hooks (`useState`, `useReducer`, `useContext`).
- **React Query / TanStack Query**: Not present. Data mutations rely on Next.js server actions / native fetches.

# 7. Hooks
All custom hooks are scoped within domain modules to handle complex wizard forms:
- `modules/cost-audit/questions/hooks/useCostScanForm.ts`
- `modules/cost-audit/questions/hooks/useSubmitScan.ts`
- `modules/opportunity-audit/questions/hooks/useOpportunityForm.ts`
- `modules/opportunity-audit/questions/hooks/useSubmitOpportunity.ts`

# 8. Utilities
Located entirely in `shared/utils/`:
- `audit.service.ts`, `brand-styles.ts`, `brevo.service.ts`, `browser-factory.ts`, `extractor.service.ts`, `frontend-storage.service.ts`, `logger.ts`, `medium-analysis.service.ts`, `pdf-generator.ts`, `rag-styles.ts`, `report-content-generator.ts`.

# 9. Providers
Found in the root layout (`app/layout.tsx`):
- `Toaster` from `react-hot-toast` is the only active provider globally.
- **Auth/Theme/Query Providers**: Not used globally.

# 10. Aliases
Configured in `tsconfig.json`:
- `"paths": { "@/*": ["./*"] }` (Maps `@/` directly to the project root).

# 11. Entry Points
- **Root Layout / HTML Shell**: `app/layout.tsx`
- **Home Page**: `app/page.tsx`
- **main.tsx / App.tsx / Root.tsx**: Not applicable due to Next.js framework conventions.

# 12. Dependencies
Key libraries from `package.json`:
- **Core UI**: `next` (16.x), `react` (19.x), `tailwindcss`, `framer-motion`, `lucide-react`, `react-hot-toast`.
- **Backend & Data**: `@supabase/supabase-js`, `@google-cloud/storage`.
- **PDF & Scraping**: `puppeteer`, `puppeteer-core`, `@sparticuz/chromium-min`, `html2pdf.js`, `officeparser`.
- **Utilities**: `uuid`, `sharp`, `react-markdown`.

# 13. Import Graph
1. **Layouts**: The root `app/layout.tsx` initializes fonts and global Toasters.
2. **Routing Pages**: Files inside `app/ai/[route]/page.tsx` import the global `Header`/`Footer` from `components/` and `shared/components/`. 
3. **Modules**: These pages render wizard components from `modules/<domain>/questions/`. 
4. **Hooks**: The wizards rely on `useSubmit...` hooks to dispatch `POST` requests to `app/api/`.
5. **API & Services**: The `app/api/` route handlers execute logic by importing scoring engines from `modules/<domain>/scoring/` and interacting with external APIs (like Brevo or GCP) using tools from `shared/services/` and `shared/utils/`.

# 14. Reuse Plan
To help a child application reuse all shared code efficiently:
- **`shared/` Directory**: Should be treated as the ultimate source of truth. The child app must import all utilities (PDF generation, RAG styles), UI models (Footer), and external services (Brevo, GCS, Supabase) from here.
- **`components/` Directory**: Import `Header` and custom framer-motion components directly to maintain exact 1:1 branding parity.
- **`modules/` Directory**: Do not duplicate business logic. The child application should directly import the schemas, typings, and scoring engines from these directories when dealing with Audit features. 
- **Future Note**: Currently, the parent and child (Audit platform) operate perfectly in this monolithic codebase, natively sharing these folders. If this is ever split into a monorepo, `shared` and `components` should be lifted into isolated workspace packages (e.g., `@alien/shared`, `@alien/ui`).
