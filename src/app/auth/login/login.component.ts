import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  susbcription: Subscription;

  constructor(private _authService: AuthService,
    private _store: Store<AppState>) { }

  ngOnInit() {
    this.susbcription = this._store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });
  }
  
  ngOnDestroy(){
    this.susbcription.unsubscribe();
  }

  onSubmit(datos: any): void {
    this._authService.login(datos.email, datos.password);
  }

}
