import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    test : Date = new Date();

    errors: any = []
    

    constructor(
      private authService: AuthService,
      private router: Router
      ) { }

    ngOnInit() {}

    // ngFormを受取る関数
    register(registerForm: any){
        this.authService.register(registerForm.value).subscribe({
            next: (result) => {
              console.log("success!")
              //登録成功時はログイン画面に遷移
              this.router.navigate(['/login'])
            },
            error: (err: HttpErrorResponse) => {
              console.error(err); 
              // 画面コンソールを見ると、HttpErrorResponseの中のerror.errorsにエラーが入っていると分かる
              this.errors = err.error.errors
            },
          })
        // console.log(registerForm.value)
    }
}
