import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoGastoService } from '../../ingreso-gasto/ingreso-gasto.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  nombre: string;
  subscription: Subscription = new Subscription();

  constructor(private _authService: AuthService,
    private _store: Store<AppState>,
    private _ingresoGastoService: IngresoGastoService) { }

  ngOnInit() {
    this.subscription = this._store.select('auth')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(auth => {
      this.nombre = auth.user.nombre;
    });
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this._ingresoGastoService.cancerlarSubcriptions();
  }

  cerrarSesion(){
    this._authService.cerrarSesion();
  }
  

}
