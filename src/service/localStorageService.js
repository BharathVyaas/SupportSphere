class LocalStorageService {
  static #LocalStorageInstance;

  static getLocalStorageInstance() {
    if (!this.#LocalStorageInstance)
      this.#LocalStorageInstance = new LocalStorageService();
    return this.#LocalStorageInstance;
  }

  get isAppReloaded() {
    const lsReload = localStorage.getItem("INDEX/isAppReloaded");
    this.isAppReloaded = true;

    return lsReload;
  }

  set isAppReloaded(isReload) {
    localStorage.setItem("INDEX/isAppReloaded", isReload);
  }

  get isMedicalExpensesReloaded() {
    const lsReload = localStorage.getItem("MEDICALEXPENSES/isAppReloaded");
    this.isMedicalExpensesReloaded = true;

    return lsReload;
  }

  set isMedicalExpensesReloaded(isReload) {
    localStorage.setItem("MEDICALEXPENSES/isAppReloaded", isReload);
  }

  get firstVisit() {
    const lsFirstVisit = localStorage.getItem("firstVisit");

    if (lsFirstVisit === null) {
      this.firstVisit = true;
    }

    if (this.isAppReloaded) {
      this.firstVisit = false;
    }
    return localStorage.getItem("firstVisit");
  }

  set firstVisit(isFirstVisit) {
    localStorage.setItem("firstVisit", isFirstVisit);
  }

  get;
}

export const LocalStorage = LocalStorageService.getLocalStorageInstance();
