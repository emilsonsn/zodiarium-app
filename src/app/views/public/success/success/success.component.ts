import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SettingService } from '@services/setting.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {

  constructor(
    private readonly _settingService: SettingService,
    private sanitizer: DomSanitizer
  ){}

  public tags: SafeHtml;

  ngOnInit(): void {
    this.getSettings();  
  }

  getSettings(){
    this._settingService.search()
    .subscribe({
        next: (res) => {
          this.tags = this.sanitizer.bypassSecurityTrustHtml(res?.tags);
        },
        error: (error) => {
          
        }
    });
  }
  
}
