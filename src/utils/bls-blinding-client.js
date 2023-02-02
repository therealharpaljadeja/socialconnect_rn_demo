import {hexToBuffer} from '@celo/base/lib/address';
import crypto from 'crypto';
import {ec as EC} from 'elliptic';
import BlindThresholdBls from 'react-native-blind-threshold-bls';

const ec = new EC('secp256k1');

/**
 * Wraps the React Native BLS client
 */
export class ReactBlsBlindingClient {
  odisPubKey;

  constructor(odisPubKey) {
    this.odisPubKey = odisPubKey;
  }

  async blindMessage(base64PhoneNumber) {
    return (await BlindThresholdBls.blindMessage(base64PhoneNumber)).trim();
  }

  unblindAndVerifyMessage(base64BlindSig) {
    return BlindThresholdBls.unblindMessage(base64BlindSig, this.odisPubKey);
  }

  static generateDeterministicBlindingFactor(privateKeyHex, e164Number) {
    // Use signature with DEK as deterministic random blinding factor
    const key = ec.keyFromPrivate(hexToBuffer(privateKeyHex));
    const sig = JSON.stringify(key.sign(e164Number).toDER());
    const sigHash = crypto.createHash('sha256').update(sig).digest('base64');
    const byteBuffer = [];
    const buffer = Buffer.from(sigHash, 'utf16le');
    for (let i = 0; i < 32; i++) {
      byteBuffer.push(buffer[i]);
    }
    return Buffer.from(byteBuffer).toString('base64');
  }
}
