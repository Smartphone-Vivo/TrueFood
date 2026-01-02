import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TuiRating, TuiTextarea, TuiTextareaLimit} from "@taiga-ui/kit";
import {
  TuiAppearance,
  TuiButton,
  TuiLabel,
  TuiTextfieldComponent
} from "@taiga-ui/core";
import {Review} from '../../../models/Review';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../../services/profile-service';

@Component({
  selector: 'app-add-review-dialog',
  imports: [
    FormsModule,
    TuiTextarea,
    TuiTextfieldComponent,
    TuiRating,
    TuiLabel,
    TuiTextareaLimit,
    TuiButton
  ],
  templateUrl: './add-review-dialog.html',
  styleUrl: './add-review-dialog.scss',
})
export class AddReviewDialog implements OnInit{
  value: number | undefined;

  review: Review = new Review()

  currentPath : number| null = null

  route = inject(ActivatedRoute)

  profileService = inject(ProfileService)





  ngOnInit() {
    this.getCurrentPath()
  }

  getCurrentPath(){
    this.route.params.subscribe(params => {
      this.currentPath = params['id'];
    })
  }

  addReview(){
    console.log('dialog-add-review', this.review)
    if(this.review.reviewText != '' && this.review.rating != null){
      this.profileService.addReview(this.review, this.currentPath).subscribe()

    }

  }
}
