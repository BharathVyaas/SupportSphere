class LocalStorageService {
  static #LocalStorageInstance;

  static getLocalStorageInstance() {
    if (!this.#LocalStorageInstance)
      this.#LocalStorageInstance = new LocalStorageService();
    return this.#LocalStorageInstance;
  }

  get reload() {
    const lsReload = localStorage.getItem("reload") === null || false;
    this.reload = true;

    return lsReload;
  }

  set reload(isReload) {
    localStorage.setItem("reload", isReload);
  }

  get firstVisit() {
    const lsFirstVisit = localStorage.getItem("firstVisit");

    if (lsFirstVisit === null) {
      this.firstVisit = true;
    }

    if (this.reload) {
      this.firstVisit = false;
    }
    return localStorage.getItem("firstVisit");
  }

  set firstVisit(isFirstVisit) {
    localStorage.setItem("firstVisit", isFirstVisit);
  }
}

export const LocalStorage = LocalStorageService.getLocalStorageInstance();
