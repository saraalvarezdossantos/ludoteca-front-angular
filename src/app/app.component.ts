import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tutorial de Angular';
}


/*Notas: ejemplo de la documentación con ngFor:

@Component({
  standalone: true,
  template: `
    <div>
      <!-- Hello, Padma -->
      <h1>Hello, {{customer}}</h1>
      <ul>
        <!-- Ebony and Chiho in a list-->
        <li *ngFor="let customer of customers">{{ customer.value }}</li>
      </ul>
    </div>
  `,
  imports: [NgFor]  // Importa la directiva NgFor para usarla en la plantilla
})
export class AppComponent {
  customers = [{value: 'Ebony'}, {value: 'Chiho'}];
  customer = 'Padma';  //es una variable que se puede usar en la plantilla con {{customer}}.  Es el contexto de la <ng-template> implícita 
                        //definida por la directiva NgFor: se refiere a cada customer de cistomers, y muestra "Ebony" y "Chiho". "Padma" no se muestra porque no está en el array.
}
*/