import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.models';


const { apiTrainers, apiKey } = environment

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loading: boolean = false

  constructor(private readonly http: HttpClient) {}
  public login(username: string): Observable<User> {
    this.loading = true
    return this.checkUsername(username)
      .pipe(
        finalize(() => {
          this.loading = false
          console.log("after loading: ", this.loading)
        }),
        switchMap((user: User | undefined) => {
          if (user === undefined) {
            return this.createUser(username)
          }
          return of(user)
        })
      )
  }

  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiTrainers}?username=${username}`)
    .pipe(
      map((response: User[]) => response.pop())
    )
  }

  private createUser(username: string): Observable<User> {
    const user = {
      username,
      pokemons: []
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    })
    return this.http.post<User>(apiTrainers, user, {
      headers
    })
  }

}
