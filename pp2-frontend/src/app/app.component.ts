// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNav: boolean = true;// Variable que controla la visibilidad del menú de navegación
  // Inyecta el servicio de enrutamiento y el servicio de autenticación
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
       // Cambia el estado de `showNav` según la URL actual
        this.showNav = event.url !== '/login' && event.url !== '/';
         // Si la URL es '/login' o '/', oculta la navegación; en caso contrario, la muestra
      });
  }
  
  onLogout() {
    this.authService.logout();
  }

}
