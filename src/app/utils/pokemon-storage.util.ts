export class PokemonStorageUtil {
  public static pokemonStorageSave<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public static pokemonStorageRead<T>(key: string): T | undefined {
    const storedValue = sessionStorage.getItem(key);
    try {
      if (storedValue) {
        return JSON.parse(storedValue) as T;
      }
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem(key);
    }
    return undefined;
  }

  public static pokemonStorageRemove(key: string) {
    const storedValue = sessionStorage.getItem(key);
    if (storedValue !== null) {
      console.log('Item removed');
      sessionStorage.removeItem(key);
    } else {
      console.log('Item cannot be removed, item with key does not exist');
    }
  }
}
