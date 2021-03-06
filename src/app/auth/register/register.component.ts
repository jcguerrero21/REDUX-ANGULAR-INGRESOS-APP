import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  cargando: boolean;
  susbcription: Subscription = new Subscription();

  constructor(private _authService: AuthService,
    private _store: Store<AppState>) { }

  ngOnInit() {
    this._store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(){
    this.susbcription.unsubscribe();
  }

  onSubmit(datos: any): void {
    this._authService.crearUsuario(datos.nombre, datos.email, datos.password);
  }

}
