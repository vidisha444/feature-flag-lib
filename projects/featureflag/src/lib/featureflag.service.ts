import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
// import { get, has } from "lodash-es";
import { tap } from "rxjs/operators";
import { FeatureConfig } from "./feature.interface";

@Injectable({
  providedIn: "root"
})
export class FeatureFlagService {
  config: FeatureConfig = null;

  constructor(
    private http: HttpClient,
    @Inject('urlConfig') private passedUrl: string
  ) { }

  /**
   * We convert it to promise so that this function can
   * be called by the APP_INITIALIZER
   */
  loadConfig() {
    return this.http
      .get<FeatureConfig>(this.passedUrl)
      .pipe(tap(data => (this.config = data)))
      .toPromise();
  }

  isFeatureEnabled(key: string) {
    if (this.config && this.config[key] !== undefined) {
      return this.config && this.config[key] ? this.config[key] : false;
    }
  }
}
