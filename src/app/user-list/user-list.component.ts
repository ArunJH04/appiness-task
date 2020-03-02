import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Service } from "../service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

export interface UserData {
  id: string;
  name: string;
  avatar: string;
  repo: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Data table with sorting and filtering.
 */

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  repoLink = {};

  displayedColumns: string[] = ["id", "avatar", "name", "repo"];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: Service, public dialog: MatDialog) {}

  navToRepoList(repoUrl): void {
    this.service.getUserRepoDetails(repoUrl).subscribe(res => {
      this.repoLink = res;
    });

    if (this.repoLink) {
      const dialogRef = this.dialog.open(DialogRepoList, {
        width: "500%",
        data: this.repoLink
      });
    }
  }

  ngOnInit() {
    // API call to fetch the github users
    this.service.getAllUsers().subscribe(results => {
      const users = results;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
    });

    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openRepo(url) {
    window.open(url + "?tab=repositories");
  }
}

@Component({
  selector: "dialog-repo-list",
  templateUrl: "dialog-repo-list.html"
})
export class DialogRepoList {
  constructor(
    public dialogRef: MatDialogRef<DialogRepoList>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
