type TLStorageValue<T> = T | null;

export class LStorage {
  static getItem<T>(key: string): TLStorageValue<T> {
    const value = localStorage.getItem(key);

    if (value && LStorage.checkIsJSObject(value as string)) {
      return JSON.parse(value as string);
    }

    return value as T;
  }

  static setItem<T>(
    key: string,
    _value: ((val: TLStorageValue<T>) => TLStorageValue<T>) | TLStorageValue<T>,
  ): void {
    if (!key || !_value) {
      throw new Error("key & valueResolver is required");
    }

    const value =
      _value instanceof Function ? _value(LStorage.getItem(key)) : _value;

    localStorage.setItem(key, JSON.stringify(value));
  }

  static checkIsJSObject(val: string): boolean {
    let isJson = false;

    try {
      JSON.parse(val);
      isJson = true;
    } catch (error: unknown) {
      console.error(error);
    }

    return isJson;
  }
}
