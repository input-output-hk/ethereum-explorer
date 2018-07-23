
export const TRANSACTION = 'TX';
export const ADDRESS = 'ADDRESS';
export const BLOCK = 'BLOCK';

export function getStringType(str) {
  var regexpTx = /[0-9a-zA-Z]{64}?/;
  var regexpAddr = /^(0x)?[0-9a-f]{40}$/;
  var regexpBlock = /[0-9]{1,7}?/;

  if (regexpTx.test(str)) {
    return TRANSACTION;
  }

  if (regexpAddr.test(str.toLowerCase())) {
    return ADDRESS;
  }

  if (regexpBlock.test(str)) {
    return BLOCK;
  }

  return null;
}
