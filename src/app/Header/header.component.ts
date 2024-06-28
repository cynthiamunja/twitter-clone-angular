import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service'; // Adjust the path as needed
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule]
})
export class HeaderComponent implements OnInit {
  comments: any[] = [];
  postId!: number;
  posts: any[] = [];
  userName: string = '';
  user: any;
  users: any[] = [];
  userForm: FormGroup;

  constructor(private fb: FormBuilder, public HeaderService: HeaderService) {
    this.userForm = this.fb.group({
      userId: ['']
    });
  }
 
  
  ngOnInit(): void {
    this.HeaderService.currentPost.subscribe(postId => {
      this.postId = postId;
      this.HeaderService.getComments(postId).subscribe(comments => {
        this.comments = comments;
      });
    });
    this.HeaderService.currentUser.subscribe(user => {
      this.userName = user.name;
      this.HeaderService.getPosts(user.id).subscribe(posts => {
        this.posts = posts;
      });
    }); 
    this.HeaderService.currentUser.subscribe(user => {
      this.user = user;
    });
    this.HeaderService.getUsers().subscribe(users => {
      this.users = users;
      if (this.users.length > 0) {
        this.userForm.controls['userId'].setValue(this.users[0].id);
        this.HeaderService.setCurrentUser(this.users[0].id);
      }
    });

    this.userForm.controls['userId'].valueChanges.subscribe(userId => {
      this.HeaderService.setCurrentUser(userId);
    });

  }
  

 }
