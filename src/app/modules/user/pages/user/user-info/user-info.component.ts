import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
      id: string,
      name: string,
      email: string,
      rol: string,
      valid: string,
      emailVerifiedAt: string,
      uuid: string,
      updatedAt: string,
      createdAt: string
  }) { }

  ngOnInit(): void {
  }

}
