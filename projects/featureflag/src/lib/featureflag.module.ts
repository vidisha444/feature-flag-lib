import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { FeatureFlagDirective } from './featureflag.directive';
import { FeatureFlagService } from './featureflag.service';

export function featureFactory(featureFlagsService: FeatureFlagService) {
  return featureFlagsService.loadConfig();
}

@NgModule({
  declarations: [
    FeatureFlagDirective
  ],
  imports: [CommonModule],
  providers: [
    FeatureFlagService,
    {
      provide: APP_INITIALIZER,
      useFactory: featureFactory,
      deps: [FeatureFlagService],
      multi: true
    }
  ],
  exports: [FeatureFlagDirective]
})
export class FeatureflagModule {
  public static forRoot(urlConfig?: string): ModuleWithProviders<FeatureflagModule> {
    return {
      ngModule: FeatureflagModule,
      providers: [FeatureflagModule, { provide: 'urlConfig', useValue: urlConfig }]
    };
  }
}

