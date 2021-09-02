import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setLocalData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getLocalData(key: string): string | null {
    return localStorage.getItem(key);
  }
}
