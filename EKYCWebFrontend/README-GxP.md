# EKYCWebFrontend GxP and Traceability Notes

This frontend implements initial flows for:
- Registration (email, mobile, password)
- Login (identifier + password)
- Bank Details (account number confirmation, IFSC validation, e-sign consent)

Environment:
- REACT_APP_API_BASE: Backend API base URL (configure in .env)

Routing:
- / -> Dashboard placeholder (wrapped in SideNavLayout)
- /register -> src/pages/Register.tsx
- /login -> src/pages/Login.tsx
- /bank -> src/pages/BankDetails.tsx

Accessibility:
- Global skip-to-content link (WCAG 2.1 AA)
- Side navigation uses <nav aria-label="Primary">, active route indicated via aria-current="page"
- Visible focus outlines via CSS variable `--focus-ring`
- Keyboard-operable mobile menu toggle with aria-expanded
- IFSC helper text via src/accessibility/aria-helpers.ts and components/Form/IfscHelp.tsx

Theming:
- Navy blue (#0B1F3A) and white theme tokens defined in src/theme.css
- Standardized form classes (.form-section, .form-grid, .label-base, .input-base, .help-text)

Tests:
- Basic UI integration tests in src/tests
- Side navigation tests: presence, active state, keyboard focus, toggle behavior

Traceability:
- See TRACEABILITY-MATRIX.md for mapping to requirements.
