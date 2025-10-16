# Traceability Matrix (Frontend)

| Requirement ID | Feature/Route | File(s) | Notes |
| --- | --- | --- | --- |
| REQ-AUTH-001 | Registration/Login | src/pages/Register.tsx, src/pages/Login.tsx, src/services/api.ts | Validations and API wiring |
| REQ-BANK-001 | Bank Details Update | src/pages/BankDetails.tsx, src/components/Form/*, src/services/api.ts | IFSC guidance and fields |
| REQ-BANK-IFSC-001 | IFSC Format Guidance | src/components/Form/IfscHelp.tsx, src/accessibility/aria-helpers.ts | Human-friendly IFSC description |
| NONFUNC-USAB-ACCESS-001 | Accessible navigation and forms | src/layout/SideNavLayout.tsx, src/components/Nav/SideNavLink.tsx, src/theme.css | WCAG AA: skip link, aria-current, focus |
| NONFUNC-RESPONSIVE-001 | Responsive layout | src/layout/SideNavLayout.module.css | Mobile collapse/toggle; no horizontal scroll |
| TEST-COVERAGE-UI-NAV-001 | UI Navigation tests | src/tests/ui_sidenav.test.tsx | Presence, active, focus, toggle |
