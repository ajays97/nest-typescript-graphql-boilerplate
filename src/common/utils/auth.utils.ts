import crypto from 'crypto';

export const getSHA256Hash = (input: string) => {
  return crypto.createHash('sha256').update(input).digest('hex');
};
