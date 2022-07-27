import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  
  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      designation : ['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.designation = this.formValue.value.designation;
    this.api.postEmployee(this.employeeModelObj).subscribe(res=>{
      console.log(res);
      alert('Employee is created');
      let ref = document.getElementById('close');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();

    }, 
    err=> {
      alert('Something went wrong');
    })
  }
  getAllEmployee(){
    this.api.getEmployee().subscribe(res =>{
      this.employeeData = res;
    })
  }
  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id).subscribe(res =>{
      alert("Employee detail is deleted");
      this.getAllEmployee();
    })
  }
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['designation'].setValue(row.designation);
    this.getAllEmployee();
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.designation = this.formValue.value.designation;
    
    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).subscribe(res=>{
      console.log(res);
      alert('Update Successfully');
      let ref = document.getElementById('close');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    }
    )}
}
