import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  userForm: FormGroup;
  maxDate: Date;

  constructor(
    private _fb: FormBuilder,
    private _userService: UsersService,
    private _dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
    ) {
    this.userForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: '',
    });

    this.maxDate = new Date();
    this.maxDate.setTime(Date.now());
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(this.userForm.valid) {
      if (this.data) {
        this._userService
          .updateUser(this.data.id, this.userForm.value)
          .subscribe({
            next: (val: any) =>{
              this._coreService.openSnackBar('User details updated');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
        })
      } else {
        this._userService
          .addUser(this.userForm.value)
          .subscribe({
            next: (val: any) =>{
              this._coreService.openSnackBar('User added successfully!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
        })
      }
    }
  }
}
