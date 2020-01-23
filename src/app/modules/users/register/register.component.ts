import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = {
    email: '',
    password: '',
    uid: ''
  };
  isError = false;
  msgError = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onRegister(formRegister: NgForm) {
    this.isError = false;
    this.msgError = '';
    try {
      await this.authService.register(this.user);
      this.router.navigate(['user/login']);
    } catch (err) {
      this.isError = true;
      this.msgError = err.message;
    }
  }

}
