// tslint:disable-next-line:one-variable-per-declaration
const no: (x: any) => boolean = () => true;

declare global
{
  // tslint:disable-next-line:interface-name
  interface Array<T>
  {
    /**
     * Return true if collection is empty
     */
    isEmpty(): boolean;
    /**
     * Return fist element or first with condition
     * @type T
     * @returns **T element** or **null** if not found
     */
    firstOnly(): T | null;
    /**
     * Return last element or first with condition
     * @type T
     * @returns **T element** or **null** if not found
     */
    lastOnly(): T | null;
    /**
     * Return fist element or first with condition
     * @type T
     * @param delegate a delegate that return true or false, pass **no** in first case
     * @returns **T element** or **null** if not found
     */
    first(delegate: ((x: T) => boolean)): T | null;
    /**
     * Return last element or first with condition
     * @type T
     * @param delegate a delegate that return true or false, pass **no** in first case
     * @returns **T element** or **null** if not found
     */
    last(delegate: ((x: T) => boolean)): T | null;
    /**
     * Return true if collection contains element that satisfy predicate
     * @param delegate a delegate that return true or false
     */
    exists(delegate: ((x: T) => boolean)): boolean;
    /**
     * return element at position index
     * @param index **element** or **undefined**
     */
    elementAt(index: number): T | null;
    /**
     * Return element with key (only for dictionaries)
     * @param key key to find
     */
    get<U>(key: U): T;
    /**
     * Remove element in array
     * @param index the index of element
     */
    removeAt(index: number): boolean;
    /**
     * Remove all element that respect condition in array
     * @param delegate a delegate that return true or false
     */
    removeAll(delegate: (x: T) => boolean): void;
    /**
     * Remove element in array
     * @param delegate a delegate that return true or false
     */
    remove(delegate: (x: T) => boolean): boolean;
    /**
     * Where
     * @type T
     * @param delegate a delegate that return true or false, pass **no** in first case
     * @returns **Array<T> elements** or **empty Array<T>** if not found
     */
    where(delegate: ((x: T) => boolean)): T[];
    /**
     * Select
     * @type T
     * @type U result type
     * @param delegate a delegate that return true or false, pass **no** in first case
     * @returns **Array<U> elements** or **empty Array<U>** if not found
     */
    select<U>(delegate: ((x: T) => U)): U[];
    /**
     * returns a grouped dictionary
     * @param prop
     */
    groupBy(prop: keyof T): T[][];
    /**
     * returns a grouped dictionary
     * @param prop
     */
    groupByAssociative(prop: keyof T): T[][];
  }
}

export default function init()
{
  Object.defineProperty(Array.prototype, 'isEmpty', {
    value(): boolean
    {
      return this.length > 0;
    }
  });
  Object.defineProperty(Array.prototype, 'groupByAssociative', {
    value(prop: any): any
    {
      const temp: any[][] = [];
      const key = prop;
      for (const element of this)
      {
        if (temp[element[key]] === undefined) temp[element[key]] = [];
        temp[element[key]].push(element);
      }
      return temp;
    }
  });
  Object.defineProperty(Array.prototype, 'groupBy', {
    value(prop: any): any
    {
      const result: any[][] = [];
      const temp: any[][] = [];
      const key = prop;
      for (const element of this)
      {
        if (temp[element[key]] === undefined) temp[element[key]] = [];
        temp[element[key]].push(element);
      }
      for (const k in temp)
      {
        if (temp.hasOwnProperty(k))
        {
          const element = temp[k];
          result.push(element);
        }
      }
      return result;
    }
  });

  Object.defineProperty(Array.prototype, 'removeAll', {
    value(delegate: any): void
    {
      const indexes = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.length; i++)
      {
        const element = this[i];
        if (delegate(element))
        {
          indexes.push(i);
        }
      }
      let tempI = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < indexes.length; i++)
      {
        const index = indexes[i];
        this.splice(index - tempI++, 1);
      }
    }
  });

  Object.defineProperty(Array.prototype, 'remove', {
    value(delegate: any): any
    {
      let index = -1;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.length; i++)
      {
        const element = this[i];
        if (delegate(element))
        {
          index = i;
          break;
        }
      }
      if (index > -1 && index < this.length)
      {
        this.splice(index, 1);
        return true;
      }
      return false;
    }
  });

  Object.defineProperty(Array.prototype, 'removeAt', {
    value(index: number): any
    {
      if (index > -1 && index < this.length)
      {
        this.splice(index, 1);
        return true;
      }
      return false;
    }
  });

  Object.defineProperty(Array.prototype, 'get', {
    value(key: any): any
    {
      for (const element of this)
      {
        if (element.key === key)
        {
          return element.value;
        }
      }
      return null;
    }
  });

  Object.defineProperty(Array.prototype, 'select', {
    value<U>(delegate: any): any
    {
      const result: U[] = [];
      for (const element of this)
      {
        result.push(delegate(element));
      }
      return result;
    }
  });

  Object.defineProperty(Array.prototype, 'where', {
    value(delegate: any): any
    {
      return this.filter((x: any) => delegate(x));
    }
  });

  Object.defineProperty(Array.prototype, 'elementAt', {
    value(i: number): any
    {
      if (this.length > i) return this[i];
      return null;
    }
  });

  Object.defineProperty(Array.prototype, 'exists', {
    value(delegate: (arg0: any) => boolean): any
    {
      for (const element of this) if (delegate(element)) return true;
      return false;
    }
  });
  Object.defineProperty(Array.prototype, 'firstOnly', {
    value(): any
    {
      return this.length > 0 ? this[0] : null;
    }
  });
  Object.defineProperty(Array.prototype, 'lastOnly', {
    value(): any
    {
      {
        return this.length > 0 ? this[this.length - 1] : null;
      }
    }
  });
  Object.defineProperty(Array.prototype, 'first', {
    value(delegate: (arg0: any) => boolean): any
    {
      for (const element of this) if (delegate(element)) return element;
      return null;
    }
  });
  Object.defineProperty(Array.prototype, 'last', {
    value(delegate: (arg0: any) => boolean): any
    {
      {
        let result: any = null;
        for (const element of this) if (delegate(element)) result = element;
        return result;
      }
    }
  });
}

import Dictionary from './dictionary';
import KeyValuePair from './keyvaluepair';
export { Dictionary };
export { KeyValuePair };
export { no };
