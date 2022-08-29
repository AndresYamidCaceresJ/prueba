import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  datos: any [] = []; 
  url: string = 'https://rickandmortyapi.com/api/character';
  error:any;
  displayedColumns: string[] = ['name', 'status', 'species', 'gender', 'origin', 'location', 'episode', 'created', 'image'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  vivos = 0
  muertos = 0

  constructor(private http: HttpClient) { }

  ngOnInit(): void {  
    this.http.get<any>(this.url).subscribe(data => {
       this.datos = data.results;
       for(let i = 0; i < this.datos.length; i++) {
         this.vivos = this.datos[i].status == 'Alive' ? this.vivos + 1 : this.vivos;
         this.muertos = this.datos[i].status == 'Dead' ? this.muertos + 1 : this.muertos;
       }
       this.dataSource = new MatTableDataSource<any>(this.datos);
       this.dataSource.paginator = this.paginator
    },error => this.error = error);

    fetch('https://rickandmortyapi.com/api/character')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log('data = ', data);
    })
    .catch(function(err) {
        console.error(err);
    });

    this.onSubmit();
  }

  onSubmit() {
    console.log('data = ', this.vivos);
  }

  buscar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

}