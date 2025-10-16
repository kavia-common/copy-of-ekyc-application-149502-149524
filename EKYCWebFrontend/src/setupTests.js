/**
 * Global test setup for CRA
 * - Adds @testing-library/jest-dom matchers like toBeInTheDocument, toHaveTextContent, etc.
 * TypeScript awareness is provided via tsconfig "types" so TS tests recognize matchers.
 */
import '@testing-library/jest-dom';
