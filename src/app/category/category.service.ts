import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/category';
import { CATEGORY_DATA } from './model/mock-categories';

/* Nota: El decorador @Injectable() marca la clase como un servicio que puede ser inyectado 
en otros componentes o servicios: para compartir lógica entre componentes y servicios.
  Para usarla: private categoryService = inject(CategoryService);

  Sobre componente vs servicio:  (Angular no obliga, pero facilita esta separación))
  - Componente: es una clase que representa una parte concreta de la interfaz de usuario y contiene lógica para manejar eventos y actualizar vista. Se utiliza para crear elementos visuales en la aplicación.
    (solo para la experiencia de usuario)
  - Servicio: es una clase que contiene lógica de negocio y se utiliza para compartir datos y funcionalidades entre diferentes componentes. No tiene una representación visual directa, pero puede ser utilizado por los componentes para realizar tareas específicas.
    (por ej. acceder a datos, validar imput de usuario...) Definiendo estas tareas de procesamiento en una clase de 
    servicio inyectble, se puede reutilizar la lógica en dif. componentes)

  Sobre DI (Dependency Injection): es un patrón de diseño que permite a los componentes y servicios recibir dependencias (como otros servicios) 
  en lugar de crearlas directamente, facilitando la reutilización y la prueba unitaria (las dependencias pueden ser reemplazadas por impl. simuladas en pruebas).
  En Angular -> inyección de dependencias mediante el decorador @Injectable() y el constructor de la clase. 
    Cuando un componente o servicio necesita una dependencia, Angular la proporciona automáticamente a través del constructor.
    En este caso, el servicio CategoryService se marca con @Injectable() para que pueda ser inyectado en otros componentes o servicios. 
    Por ej.: en CategoryListComponent, se inyecta el servicio CategoryService a través del constructor 
             para poder acceder a sus métodos y obtener la lista de categorías.
    providedIn: determines which injectors will provide the injectable
                      When you provide the service at the root level, Angular creates a single, shared instance and injects it into any class that asks for it. 
                      Registering the provider in the @Injectable() metadata also allows Angular to optimize an app by removing the service from the compiled application 
                      if it isn't used, a process known as tree-shaking
  */


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  //De momento: simuladas(return of(...)) en vez de llamadas a un backend (http.get(...))

  getCategories(): Observable<Category[]> {
    //return of(CATEGORY_DATA);
    return this.http.get<Category[]>('http://localhost:8080/category');
  }

  saveCategory(category: Category): Observable<Category> {
    //return of(category);
    let url = 'http://localhost:8080/category';
        if (category.id != null) url += '/'+category.id;

        return this.http.put<Category>(url, category);
  }

  deleteCategory(idCategory : number): Observable<any> {
    //return of(null);
    return this.http.delete('http://localhost:8080/category/'+idCategory);
  }  
}

