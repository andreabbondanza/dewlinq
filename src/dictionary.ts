import KeyValuePair from './keyvaluepair';

export default class Dictionary<T, U> extends Array<KeyValuePair<T, U>> {
  public add(key: T, value: U): Dictionary<T, U> {
    this.push(new KeyValuePair<T, U>(key, value));
    return this;
  }
}
