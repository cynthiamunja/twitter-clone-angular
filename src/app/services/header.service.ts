import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }

  setCurrentUser(userId: number): void {
    this.http.get(`https://jsonplaceholder.typicode.com/users/${userId}`).subscribe(user => {
      this.currentUserSubject.next(user);
    });
  }

  getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  }

  private currentPostSubject = new BehaviorSubject<number>(1);
  currentPost = this.currentPostSubject.asObservable();



  getPosts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  }

  setCurrentPost(postId: number): void {
    this.currentPostSubject.next(postId);
  }
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser = this.currentUserSubject.asObservable();


  
}
