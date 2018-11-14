import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {
  }

  public transform(value: any, type: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}
