import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    test : Date = new Date();

    errors: any = [];

    constructor(
      private authService: AuthService,
      private router: Router
    ) { }

    ngOnInit() {}

    login(loginForm: any){
      this.authService.login(loginForm.value).subscribe({
        next: (token) => {
          console.log(token)
          this.router.navigate(['/products'])
        },
        error: (err: HttpErrorResponse) => {
          console.error(err); 
          // 画面コンソールを見ると、HttpErrorResponseの中のerror.errorsにエラーが入っていると分かる
          this.errors = err.error.errors
        },
      })

      // console.log(loginForm.value)
    }
}
