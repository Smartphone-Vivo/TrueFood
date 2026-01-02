import {Component, inject, INJECTOR, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Review} from '../../models/Review';
import {TuiAppearance, TuiButton, tuiDialog, TuiDialogService, TuiTitle} from '@taiga-ui/core';
import {TuiCard} from '@taiga-ui/layout';
import {TuiRating} from '@taiga-ui/kit';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-review-card',
  imports: [
    TuiAppearance,
    TuiCard,
    TuiRating,
    FormsModule,
    TuiButton
  ],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class ReviewCard implements OnChanges{

  ngOnChanges(changes: SimpleChanges) {
    console.log('reviews', this.reviews)
  }

  @Input({required: true}) reviews!: Review[]

  private readonly injector = inject(INJECTOR);

  protected async showDialog(): Promise<void> { //todo разгрести
    const dialog = await this.lazyLoad();

    dialog(237).subscribe({
      next: (data) => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  private async lazyLoad(): Promise<(data: number) => Observable<number>> {
    const {AddReviewDialog} = await import('./add-review-dialog/add-review-dialog')

    // @ts-ignore
    return tuiDialog(AddReviewDialog, {
      injector: this.injector,
      dismissible: true
    });
  }


}
