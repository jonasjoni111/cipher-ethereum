import BN from 'bn.js'
import { BigNumber } from 'bignumber.js'
import createKeccakHash from 'keccak/js'

export function numberToHex (
  num: number,
  includePrefix: boolean = true
): string {
  const hex = new BigNumber(num).toString(16)
  return includePrefix ? '0x' + hex : hex
}

export function bigNumberToHex (
  bigNum: BigNumber,
  includePrefix: boolean = true
): string {
  const hex = bigNum.toString(16)
  return includePrefix ? '0x' + hex : hex
}

export function hexToEvenLengthHex (
  hex: string,
  includePrefix: boolean = true
): string {
  let h = (hex.match(/^0x/i) ? hex.slice(2) : hex).toLowerCase()
  if (h.length % 2 === 1) {
    h = '0' + h
  }
  return includePrefix ? '0x' + h : h
}

export function hexToBuffer (hex: string): Buffer {
  if (hex.length === 0) {
    return Buffer.alloc(0)
  }
  return Buffer.from(hexToEvenLengthHex(hex, false), 'hex')
}

export function numberToBuffer (num: number): Buffer {
  if (num === 0) {
    return Buffer.alloc(0)
  }
  return hexToBuffer(numberToHex(num, false))
}

export function bigNumberToBuffer (bigNum: BigNumber): Buffer {
  if (bigNum.isZero()) {
    return Buffer.alloc(0)
  }
  return hexToBuffer(bigNumberToHex(bigNum, false))
}

export function bnToBuffer (bn: BN): Buffer {
  if (bn.isZero()) {
    return Buffer.alloc(0)
  }
  return hexToBuffer(bn.toString(16))
}

export function keccak256 (data: Buffer | string): Buffer {
  const buf = data instanceof Buffer ? data : Buffer.from(data, 'utf8')
  return createKeccakHash('keccak256').update(buf).digest()
}