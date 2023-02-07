import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'userEmail', 'userPassword',  'firstName', 'lastName', 'tel', 'titleNavigation', 'aciton'];
  dataSource: MatTableDataSource<any>;
  users: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rest: RestService) {
    this.users = this.feedData()
    console.log(this.users)
    this.dataSource = new MatTableDataSource(this.users);
  }

  feedData() {
    //subscribe ทำหน้าที่ติดตามผลลัพธ์ที่ส่งกลับมาเหมือน async/await
    this.rest.getUser()
      .subscribe(data => {
        console.log(data)
        // data.map(item => item.image = this.rest.getProductImageUrl(item.image))
        this.dataSource.data = data
      },
        error => {
          alert(JSON.stringify(error.error.message))
        },
        () => {
          console.log('complete')
        })
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public get timestamp(): string {
    return Date.now().toString()
  }

  onDelete(id:number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.rest.deleteUsers(id).toPromise();
        this.feedData()
      }
    })
  }
}
