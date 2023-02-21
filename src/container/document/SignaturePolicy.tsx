import React from 'react';
import { Input } from 'components/TextInput/TextInput';

interface Props {
  acceptPolicy: boolean;
  setAcceptPolicy: (acceptPolicy: boolean) => void;
  policy: string
}

const SignaturePolicy = ({ acceptPolicy, setAcceptPolicy, policy }: Props) => (
  <div className="flex mb-1">
    <Input
      type="checkbox"
      name="signature-policy"
      id="signature-policy"
      checked={acceptPolicy}
      onChange={() => setAcceptPolicy(!acceptPolicy)}
    />
    <span className="text--sm">
      {policy}
      {/* By selecting this signature, I agree that it is as valid as my hand-written signature to the extent allowed by law */}
    </span>
  </div>
);

export default SignaturePolicy;
