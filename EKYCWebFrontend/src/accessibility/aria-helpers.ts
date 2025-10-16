 // PUBLIC_INTERFACE
export function describeIfscPattern(): string {
  /** Returns human-friendly description of IFSC format for screen readers. */
  return 'IFSC format: 11 characters. First 4 letters (A-Z), then 0 (zero), followed by 6 alphanumeric characters.';
}
