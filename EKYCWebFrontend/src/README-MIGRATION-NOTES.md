# Migration Notes

- Introduced TypeScript entry points (index.tsx, App.tsx) and TSX pages/components.
- CRA supports TS when TypeScript is present. If build tooling requires, ensure `typescript`, `@types/react`, `@types/react-dom`, and `@types/react-router-dom` are added as devDependencies.
- Routing uses `react-router-dom@^6`. If not present, install it accordingly.
