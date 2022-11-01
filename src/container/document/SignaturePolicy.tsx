import React from 'react';
import { Input } from 'components/TextInput/TextInput';

interface Props {
  acceptPolicy: boolean;
  setAcceptPolicy: (acceptPolicy: boolean) => void;
}

const SignaturePolicy = ({ acceptPolicy, setAcceptPolicy }: Props) => (
  <div className="flex mb-1">
    <Input
      type="checkbox"
      name="signature-policy"
      id="signature-policy"
      checked={acceptPolicy}
      onChange={() => setAcceptPolicy(!acceptPolicy)}
    />
    <span className="text--sm">
      By signing this document with my electronic signature. I agree that the signature is as valid as my hand writen signature to the
      extent allowed by law
    </span>
  </div>
);

export default SignaturePolicy;
