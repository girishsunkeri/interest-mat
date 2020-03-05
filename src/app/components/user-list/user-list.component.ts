import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './../../shared/user';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from './../../shared/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  users: any = [];

  constructor(private userApi: UserService) {
    this.userApi.GetUserList()
    .snapshotChanges().subscribe(users => {
        users.forEach(item => {
          let a = item.payload.toJSON();
          console.log(a);
          a['$key'] = item.key;
          this.users.push(a);
        });
        /* Data table */
        //this.dataSource = new MatTableDataSource(this.UserData);
        /* Pagination */
        // setTimeout(() => {
        //   this.dataSource.paginator = this.paginator;
        // }, 0);
    });
  }

  objectValues(obj) {
    return Object.values(obj);
 }

  /* Delete */
  deleteUser(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.userApi.DeleteUser(e.$key);
    }
  }
}
