import { Component, Input, signal, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { }

  ngOnInit(): void { }

  @Input() darkmode=signal<boolean>(false)
  loading = signal<boolean>(false)

  loginWithRedirect() {
    this.loading.set(true)
    this.auth.loginWithRedirect();
  }

  logout() {
    this.loading.set(true)
    this.auth.logout({ logoutParams: { returnTo: this.document.location.origin } }).subscribe(()=>console.log('yes'))
  }
}
