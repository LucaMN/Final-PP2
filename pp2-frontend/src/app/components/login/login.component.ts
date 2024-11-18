// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';// Almacena el nombre de usuario introducido
  password: string = ''; // Almacena la contraseña introducida
  errorMessage: string = '';// Almacena el mensaje de error si ocurre alguno


  constructor(private authService: AuthService, private router: Router) {}

  // Método que se ejecuta cuando el usuario intenta iniciar sesión
  onLogin(): void {
     // Llama al método login del servicio AuthService, pasando el nombre de usuario y la contraseña
    this.authService.login(this.username, this.password).subscribe({
       // Si la respuesta es exitosa (next):
      next: (response) => {
        if (response.success) { // Si la respuesta contiene success == true
          this.authService.setAdminStatus(response.isAdmin); // Almacena el estado del admin
          this.router.navigate(['/ventas']); // Redirige a ventas 
        } else {
          this.errorMessage = response.message;
        }
      },
      error: () => {
        this.errorMessage = 'Error de autenticación';
      },
    });
  }
}
