# EKYCWebFrontend GxP and Traceability Notes

This frontend implements initial flows for:
- Registration (email, mobile, password)
- Login (identifier + password)
- Bank Details (account number confirmation, IFSC validation, e-sign consent)

Environment:
- REACT_APP_API_BASE: Backend API base URL (configure in .env)

Routing:
- /register -> src/pages/Register.tsx
- /login -> src/pages/Login.tsx
- /bank -> src/pages/BankDetails.tsx

Accessibility:
- Accessible inputs with labels and aria attributes
- IFSC helper text via src/accessibility/aria-helpers.ts and components/Form/IfscHelp.tsx

Tests:
- Basic UI integration tests in src/tests

Traceability:
- See TRACEABILITY-MATRIX.md for mapping to requirements.
