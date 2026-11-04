import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/category';
import { CategoryService } from '../category.service';

//Para poder abrir un componente dentro de un dialogo necesitamos obtener en el constructor un MatDialog:
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

//Decorator para defiinir configuaciones de la clase, como el selector, la plantilla y los estilos (metadatos):
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
  //Opciones de config muy comunes, junto con estos: selector, templateUrl, imports, providers.
})

//Clase que implementa la interfaz OnInit, que se ejecuta al inicializar el componente: define comportamiento 
export class CategoryListComponent implements OnInit {

  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  //prueba pipe: 
  fecha = new Date(); //fecha actual, formato español: 2024-06-05T12:34:56.789Z

  constructor(
    private categoryService: CategoryService, 
    private dialog: MatDialog
  ) { }

  /* Notas: 
    ngOnInit() == lifecycle hook: es un método del ciclo de vida de Angular que se ejecuta después de que el componente ha sido inicializado.
    Se utiliza para realizar tareas de inicialización, como cargar datos desde un servicio o configurar propiedades del componente.
    Angular crea, actualiza y destruye los componentes a medida que el usuario navega por la aplicación. El ciclo de vida de un componente se compone de varios métodos que Angular llama en momentos específicos, como ngOnInit(), ngOnChanges(), ngOnDestroy(), entre otros.
    En este caso, ngOnInit() se utiliza para suscribirse al servicio CategoryService y obtener la lista de categorías cuando el componente se inicializa. 
    La función subscribe() se utiliza para manejar la respuesta del servicio y actualizar dataSource con los datos obtenidos.
    Esto permite que la tabla de categorías se muestre correctamente en la interfaz de usuario.
  */
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      categories => this.dataSource.data = categories
    );
  }

  //Para que funcione botón "Nueva categoría" y abra el diálogo: inyectar MatDialog en el constructor y usarlo para abrir el diálogo con el CategoryEditComponent
  createCategory() {    
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: {}  //datos de creción de categoría
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    }); 
  }

  editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: { category: category }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteCategory(category: Category): void {
    this.categoryService.deleteCategory(category.id).subscribe({
      next: () => this.ngOnInit(),
      error: error => console.error('Error al borrar la categoría', error)
    });
  }

}
