import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-create-dialog',
  templateUrl: './post-create-dialog.component.html',
  styleUrls: ['./post-create-dialog.component.scss']
})
export class PostCreateDialogComponent implements OnInit {
  form: FormGroup;
  isEditmode = false;
  title = null;
  content = null;

  constructor(public postsService: PostsService,
     public dialogRef: MatDialogRef<any>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     public route: ActivatedRoute ) { }

  ngOnInit() {

    if (this.data._id) {
      this.isEditmode = true;
      this.title = this.data.title;
      this.content = this.data.content;
    } else {
      this.isEditmode = false;
    }

    this.form = new FormGroup({
      titleText: new FormControl(this.title, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      bodyText: new FormControl(this.content, {
        validators: [Validators.required, Validators.minLength(5)]
      })
    });
  }

  onCreatePost() {
    if (!this.form.valid) {
      return;
    }

    if (this.form.value.titleText === this.title) { // if form inputs hasnt been changed - for the fix of the submit angular form in edit mode.
      console.log('SAME INPUTS!!');
      return;
    }

    if (this.isEditmode) {
      this.postsService.updatePost(this.data._id, this.form.value.titleText, this.form.value.bodyText);
    } else {
      this.postsService.creatPost(this.form.value.titleText, this.form.value.bodyText);
    }
    this.dialogRef.close();
  }
}
