
class StorageHelper {

  saveToStorage(STORAGE_KEY,library) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
  }

  loadFromStorage(STORAGE_KEY) {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

}

export default StorageHelper;
