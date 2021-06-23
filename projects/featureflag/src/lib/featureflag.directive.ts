import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import { FeatureFlagService } from "./featureflag.service";

@Directive({
  selector: "[featureFlag]"
})
export class FeatureFlagDirective implements OnInit {
  @Input() featureFlag: string;
  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private featureFlagService: FeatureFlagService
  ) { }

  ngOnInit() {
    const isEnabled =
      this.featureFlagService.isFeatureEnabled(this.featureFlag) || false;
    if (isEnabled) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
}
