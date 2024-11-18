// src/app/services/auth.service.ts
// Este servicio se encarga de manejar la autenticación del usuario
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/pp2-Backend/login.php';

  public isAdmin: boolean = false; // Variable para verificar si es admin
  public isAuthenticated: boolean = false;

   constructor(private http: HttpClient, private router: Router) {}
  // Método para iniciar sesión, realiza una solicitud POST al backend con las credenciales del usuario
  login(username: string, password: string): Observable<any> {
    // Envía el nombre de usuario y la contraseña al backend y devuelve la respuesta como Observable
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  // Método para establecer el estado de administrador
  setAdminStatus(isAdmin: boolean) {
    this.isAdmin = isAdmin;
    this.isAuthenticated = true; 
  }

  // Método para cerrar sesión del usuario
  logout() {
    this.isAdmin = false;
    this.isAuthenticated = false; // Desautentica al hacer logout
    this.router.navigate(['/login']); // Redirige al login
  }
}
