import { Injectable } from '@angular/core';
import {
  AuthToken,
  FalconAuthInstance,
  LoginOptions,
  LogoutOptions
} from '@falconio/core-auth/dist/core-auth.min.js';

@Injectable({ providedIn: 'root' })
export class KeycloackService {
  private falconAuthInstance: FalconAuthInstance;

  /**
   * Gets whether the user is authenticated.
   */
  public get authenticated(): boolean {
    return this.falconAuthInstance.authenticated;
  }

  /**
   * Gets the raw bearer token.
   */
  public get token(): string {
    return this.falconAuthInstance.token;
  }

  /**
   * Gets the bearer token as an object with the parsed data.
   */
  public get tokenParsed(): AuthToken {
    return this.falconAuthInstance.tokenParsed;
  }

  /**
   * Gets the auth server url.
   * @example "https://accounts.falcon.io/auth"
   */
  public get authServerUrl(): string {
    return this.falconAuthInstance.authServerUrl;
  }

  public updateKeycloackAuth(keycloack: FalconAuthInstance) {
    this.falconAuthInstance = keycloack;
  }

  /**
   * If the token expires within minValidity seconds the token is refreshed.
   * @param minValidity The minimum number of seconds before the token should be refreshed, if not specified 5 is used.
   * @returns A promise that resolves if the token is valid (or it has been refreshed) and rejects when the session is no longer valid.
   */
  public updateToken(minValidity?: number): Promise<{}> {
    return this.falconAuthInstance.updateToken(minValidity);
  }

  /**
   * Redirects to login form.
   * @param options Login options.
   */
  public login(options?: LoginOptions): Promise<{}> {
    return this.falconAuthInstance.login(options);
  }

  /**
   * Redirects to logout.
   * @param options optional object with redirectUri.
   */
  public logout(options?: LogoutOptions): Promise<{}> {
    return this.falconAuthInstance.logout(options);
  }

  /**
   * Returns true if the token has the given realm role.
   * @param role A realm role name.
   */
  public hasRealmRole(role: string): boolean {
    return this.falconAuthInstance.hasRealmRole(role);
  }

  /**
   * Returns true if the token has the given role for the resource.
   * @param role A role name.
   * @param resource If not specified, `clientId` is used.
   */
  public hasResourceRole(role: string, resource: string): boolean {
    return this.falconAuthInstance.hasResourceRole(role, resource);
  }
}
