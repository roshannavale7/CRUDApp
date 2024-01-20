import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCRUDComponent implements OnInit {

  constructor(private fb: FormBuilder, private rs: UserServiceService) { }
  public successMessage: string = ""
  public errorMessage: string = ""
  public students: any[] = [];
  editMode: boolean = false;
  currentStudentId: any;

  public bookingForm: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.displayStudent()
    this.bookingForm = this.fb.group({
      name: ['',Validators.required],
      password: ['', Validators.required],
      address:['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      city: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      zip: ['', [Validators.required]]
    })

  }
  registerStudent(id:any) {
    if(!this.editMode) {
      this.rs.registerStudent(this.bookingForm.value).subscribe((data=>{
        this.displayStudent()
        console.log(data);
        
      }))
    } else {
      this.rs.editStudent(this.currentStudentId, this.bookingForm.value).subscribe((data) => {
        this.displayStudent()
      })
    }
  }
  displayStudent() {
    this.rs.getStudent().subscribe((data) => {
      this.students = data;
      console.log();
    }, (error) => {
      this.errorMessage = "No flights found!!!"
    })
  }
  deleteStudent(id: string) {
    this.rs.deleteStudent(id).subscribe((student) => {
      this.displayStudent()
    })
  }

  editStudent(id: any) {
    this.currentStudentId = id
    let current = this.students.find((p) => { return p.id === id })
    this.bookingForm.setValue({
      name:current.name,
      password: current.password,
      address: current.address,
      city: current.city,
      dob: current.dob,
      zip: current.zip
    })
    this.editMode = true
  }
}
