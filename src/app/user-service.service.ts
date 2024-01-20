import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements OnInit {
  private url = "http://localhost:3000/students/"

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getStudent()
  }
  getStudent(): Observable<any> {
    return this.http.get<any>(this.url)
  }
  registerStudent(data:any) {
    return this.http.post(this.url , data)
  }
  deleteStudent(id: string): Observable<number> {
    return this.http.delete<number>(this.url + "/" + id)
  }
  editStudent(id: any, value:any) {
    return this.http.put(this.url + id, value)
  }
}