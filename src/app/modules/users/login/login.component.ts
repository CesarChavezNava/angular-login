import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = {
    uid: '',
    email: '',
    password: ''
  };
  isError = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onLogin(formLogin: NgForm) {
    this.isError = false;
    try {
      await this.authService.loginWithEmail(this.user);
      this.router.navigate(['']);
    } catch (err) {
      this.isError = true;
      console.error(err.message);
    }
  }

}
