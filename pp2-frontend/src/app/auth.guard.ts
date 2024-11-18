// src/app/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root', // Proporciona este guard como un servicio a toda la aplicación
})
export class AuthGuard implements CanActivate {
  // Inyecta los servicios AuthService y Router
  constructor(private authService: AuthService, private router: Router) {}

  // Implementa el método canActivate que se ejecuta antes de activar una ruta protegida
  canActivate(): boolean {
    // Verifica si el usuario tiene el rol de administrador
    if (this.authService.isAdmin) {
      return true;// Permite el acceso a la ruta
    } else {
        // Si el usuario no es administrador, muestra una alerta y redirige a otra ruta
      alert('Permiso denegado');
      this.router.navigate(['/ventas']);
      return false;
    }
  }
}
