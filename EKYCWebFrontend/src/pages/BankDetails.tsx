import React, { useEffect, useState } from 'react';
import { Input } from '../components/Form/Input';
import { IfscHelp } from '../components/Form/IfscHelp';
import { getBankDetails, updateBankDetails, lookupIfsc } from '../services/api';

/**
 * PUBLIC_INTERFACE
 */
export default function BankDetails(): React.ReactElement {
  /** Bank details page: account number confirmation, IFSC validation and save via API. */
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [branchInfo, setBranchInfo] = useState<string | null>(null);
  const [fullNameForESign, setFullNameForESign] = useState('');
  const [agreeESign, setAgreeESign] = useState(false);
  const [reasonForChange, setReasonForChange] = useState('');
  const [critical, setCritical] = useState(false);
  const [reauthPassword, setReauthPassword] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const matches = accountNumber && confirmAccountNumber && accountNumber === confirmAccountNumber;

  useEffect(() => {
    // Load existing bank details if present
    (async () => {
      try {
        const res = await getBankDetails();
        if (res.ok && res.data) {
          const bd = res.data;
          setAccountNumber(bd.account_number || '');
          setConfirmAccountNumber(bd.account_number || '');
          setIfsc(bd.ifsc || '');
          setBranchInfo(bd.branch_info || null);
        }
      } catch {
        // ignore load errors in demo
      }
    })();
  }, []);

  useEffect(() => {
    // live IFSC lookup
    const run = setTimeout(async () => {
      setBranchInfo(null);
      if (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
        const res = await lookupIfsc(ifsc);
        if (res.ok) {
          setBranchInfo(res.data?.branch || 'Demo Branch, Mumbai');
        } else {
          setBranchInfo(null);
        }
      }
    }, 400);
    return () => clearTimeout(run);
  }, [ifsc]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus(null);

    if (!matches) {
      setError('Account number and confirmation must match.');
      return;
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      setError('Please enter a valid IFSC code.');
      return;
    }
    if (!fullNameForESign.trim()) {
      setError('Full name for e-sign is required.');
      return;
    }
    if (!agreeESign) {
      setError('You must agree to e-sign to proceed.');
      return;
    }
    if (!reasonForChange.trim()) {
      setError('Reason for change is required.');
      return;
    }
    if (critical && !reauthPassword) {
      setError('Re-authentication password is required for critical change.');
      return;
    }

    try {
      setLoading(true);
      const res = await updateBankDetails({
        accountNumber,
        confirmAccountNumber,
        ifsc,
        fullNameForESign,
        agreeESign,
        reasonForChange,
        critical,
        reauthPassword: critical ? reauthPassword : undefined
      });
      if (res.ok) {
        setStatus('Bank details saved successfully.');
      } else {
        setError(res.error || 'Failed to save bank details.');
      }
    } catch (err: any) {
      setError(err?.message || 'Unexpected error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="bank-title" className="form-section">
      <h1 id="bank-title" className="form-heading">Bank Details</h1>
      <form onSubmit={onSubmit} className="form-grid" noValidate>
        <Input
          id="accountNumber"
          label="Account Number"
          value={accountNumber}
          onChange={setAccountNumber}
          type="text"
          required
          help="Enter your bank account number."
        />
        <Input
          id="confirmAccountNumber"
          label="Confirm Account Number"
          value={confirmAccountNumber}
          onChange={setConfirmAccountNumber}
          type="text"
          required
          help={matches ? '✔ Numbers match.' : 'Re-enter your account number. Must match.'}
          ariaInvalid={!matches}
        />
        <Input
          id="ifsc"
          label="IFSC Code"
          value={ifsc}
          onChange={(v) => setIfsc(v.toUpperCase())}
          type="text"
          required
          help="Example format: ABCD0EF1234"
        />
        <IfscHelp ifsc={ifsc} branchInfo={branchInfo} />

        <Input
          id="fullNameForESign"
          label="Full Name for E-Sign"
          value={fullNameForESign}
          onChange={setFullNameForESign}
          type="text"
          required
        />
        <div style={{ marginTop: 'var(--spacing-3)' }}>
          <label>
            <input
              type="checkbox"
              checked={agreeESign}
              onChange={(e) => setAgreeESign(e.target.checked)}
            />{' '}
            I agree to bind my e-sign to this change.
          </label>
        </div>
        <Input
          id="reasonForChange"
          label="Reason for Change"
          value={reasonForChange}
          onChange={setReasonForChange}
          type="text"
          required
          maxLength={250}
        />
        <div style={{ marginTop: 'var(--spacing-3)' }}>
          <label>
            <input
              type="checkbox"
              checked={critical}
              onChange={(e) => setCritical(e.target.checked)}
            />{' '}
            This is a critical change (requires re-authentication)
          </label>
        </div>
        {critical && (
          <Input
            id="reauthPassword"
            label="Confirm Password"
            value={reauthPassword}
            onChange={setReauthPassword}
            type="password"
            required
          />
        )}
        <div style={{ marginTop: 'var(--spacing-4)' }}>
          <button className="btn-primary" type="submit" disabled={loading} aria-busy={loading}>
            {loading ? 'Saving...' : 'Save Bank Details'}
          </button>
        </div>
        {status && <p role="status" style={{ color: '#166534', marginTop: 12 }}>{status}</p>}
        {error && <p role="alert" style={{ color: '#991b1b', marginTop: 12 }}>{error}</p>}
      </form>
    </section>
  );
}
