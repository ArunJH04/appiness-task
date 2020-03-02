import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class Service {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Custom-Authorization": "Bearer noauth"
    })
  };

  getAllUsers() {
    return this.http.get<any>(
      "https://api.github.com/users?since=XXX",
      this.httpOptions
    );
  }

  getUserRepoDetails(url) {
    return this.http.get(`${url}`, this.httpOptions);
  }
}
