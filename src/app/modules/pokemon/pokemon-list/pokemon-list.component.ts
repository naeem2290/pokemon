import { Component, CSP_NONCE } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { pokemonActionsGroup } from 'src/app/store/pokemon-store/pokemon-actions';
import { selectPokemonCount, selectPokemonList, selectPokemonNext, selectPokemonPrevious } from 'src/app/store/pokemon-store/pokemon-selectors';
import { Pokemon, RootState } from 'src/models/common';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  private subscriptions: Subscription[] = [];
  public displayedColumns: string[] = ['name', 'url'];
  public dataSource: Pokemon[] = [];
  public paginatedDataSource: Pokemon[] = [];

  public searchTerm: string = '';
  public pageSize: number = 50;
  public totalCount$: Observable<number> = this.store.pipe(select(selectPokemonCount), distinctUntilChanged());
  public paginatedCount = 0;
  public showFavourites: boolean = false;

  constructor(
    private store: Store<RootState>,
    private router: Router) {}

  ngOnInit(){
    this.subscriptions.push(
      combineLatest([
        this.store.pipe(select(selectPokemonList)),
        this.totalCount$
      ]).subscribe(([list, count]) => {
        this.dataSource = list;
        this.paginatedCount = count;
        this.pageChange({ pageIndex: 0, pageSize: this.pageSize, length: count });
      })
    );
  }

  pageChange(event: PageEvent) {
    const { pageIndex, pageSize } = event;
    const startIndex = pageIndex * pageSize;
    let endIndex = startIndex + pageSize;
  
    if (this.searchTerm === '') {
      this.paginatedDataSource = this.dataSource.slice(startIndex, endIndex);
      this.paginatedCount = this.dataSource.length;
    } else {
      const filteredData = this.dataSource.filter(ele => ele.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      this.paginatedCount = filteredData.length;
      this.paginatedDataSource = filteredData.slice(startIndex, endIndex);
    }
  }
  
  onSearchTermChange(value: string) {
    this.searchTerm = value;
    this.pageChange({ pageIndex: 0, pageSize: this.pageSize, length: this.paginatedCount });
  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearchTermChange('');
  }

  onRowClick(element: Pokemon) {
    this.store.dispatch(pokemonActionsGroup.selectPokemon({url: element.url}));
    this.router.navigateByUrl('home/pokemon');
  }

  isFavourite(element: Pokemon): boolean {
    let favourites = localStorage.getItem('favourites');
    if(favourites){
      let fav = JSON.parse(favourites);
      return Boolean(fav.filter((ele:string) => ele === element.url).length) ?? false;
    }
    return false;
  }

  addToFav(element: Pokemon, status: boolean) {
    let favourites = localStorage.getItem('favourites');
    if(favourites && status){
      let fav = JSON.parse(favourites);
      let newList = fav.filter((ele:string) => ele !== element.url);
      localStorage.setItem('favourites', JSON.stringify(newList));
    }
    else if(favourites && !status) {
      let fav = JSON.parse(favourites);
      fav.push(element.url);
      localStorage.setItem('favourites', JSON.stringify(fav));
    }
    else {
      localStorage.setItem('favourites', JSON.stringify([element.url]));
    }
  }

  toggleFavourite(event: MatCheckboxChange){
    this.showFavourites = event.checked;
    if(this.showFavourites) {
      this.dataSource = this.dataSource.filter(ele => this.isFavourite(ele));
      this.paginatedCount = this.dataSource.length;
      this.pageChange({ pageIndex: 0, pageSize: this.pageSize, length: this.dataSource.length });
    }
    else {
      this.subscriptions.push(
        combineLatest([
          this.store.pipe(select(selectPokemonList)),
          this.totalCount$
        ]).subscribe(([list, count]) => {
          this.dataSource = list;
          this.paginatedCount = count;
          this.pageChange({ pageIndex: 0, pageSize: this.pageSize, length: count });
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
