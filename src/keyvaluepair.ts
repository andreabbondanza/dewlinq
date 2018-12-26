export default class KeyValuePair<T, U> {
  public key: T;
  public value: U;
  public constructor(key: T, value: U) {
    this.key = key;
    this.value = value;
  }
}
