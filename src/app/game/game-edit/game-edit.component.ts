import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from 'src/app/author/author.service';
import { Author } from 'src/app/author/model/Author';
import { CategoryService } from 'src/app/category/category.service';
import { Category } from 'src/app/category/model/category';
import { GameService } from '../game.service';
import { Game } from '../model/Game';

@Component({
    selector: 'app-game-edit',
    templateUrl: './game-edit.component.html',
    styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit {

    game: Game; 
    authors: Author[];
    categories: Category[];

    constructor(
        public dialogRef: MatDialogRef<GameEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private gameService: GameService,
        private categoryService: CategoryService,
        private authorService: AuthorService,
    ) { }

    ngOnInit(): void {
        if (this.data.game != null) {
            this.game = Object.assign({}, this.data.game);
        }
        else {
            this.game = new Game();
        }

        this.categoryService.getCategories().subscribe(
            categories => {
                this.categories = categories;

                if (this.game.category != null) {
                    let categoryFilter: Category[] = categories.filter(category => category.id == this.data.game.category.id);
                    if (categoryFilter != null) {
                        this.game.category = categoryFilter[0];
                    }
                }
            }
        );

        this.authorService.getAllAuthors().subscribe(
            authors => {
                this.authors = authors

                /* Nota: Como puedes ver, para rellenar los componentes seleccionables de dropdown, 
                hemos realizado una consulta al servicio para recuperar todos los autores y categorias, 
                y en la respuesta de cada uno de ellos, hemos buscado en los resultados cual es el que coincide
                con el ID enviado desde el listado, y ese es el que hemos fijado en el objeto Game.
                De esta forma, no estamos cogiendo directamente los datos del listado, sino que no estamos asegurando 
                de que los datos de autor y de categoría son los que vienen del servicio, siempre filtrando por su ID */

                if (this.game.author != null) {
                    let authorFilter: Author[] = authors.filter(author => author.id == this.data.game.author.id);
                    if (authorFilter != null) {
                        this.game.author = authorFilter[0];
                    }
                }
            }
        );
    }

    onSave() {
        this.gameService.saveGame(this.game).subscribe(result => {
            this.dialogRef.close();
        });    
    }  

    onClose() {
        this.dialogRef.close();
    }

}
