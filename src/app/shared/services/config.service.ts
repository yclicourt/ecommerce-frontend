import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@shared/interfaces/appconfig';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: AppConfig | undefined;

  constructor(private http: HttpClient) {}

  async loadConfig() {
    // Le pasamos el tipo <AppConfig> al get
    return firstValueFrom(this.http.get<AppConfig>('/assets/config.json'))
      .then((config) => {
        this.config = config;
      })
      .catch((err) => {
        console.error('Error cargando config.json', err);
      });
  }

  get apiUrl(): string {
    return this.config?.apiUrl || '';
  }

  get clientUrl(): string {
    return this.config?.clientUrl || '';
  }

  get brandName(): string {
    return this.config?.brandName || '';
  }
  get tokenKey(): string {
    return this.config?.tokenKey || '';
  }
  get currentUser(): string {
    return this.config?.currentUser || '';
  }
}
