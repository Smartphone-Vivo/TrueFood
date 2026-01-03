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
  styleUrl: './review-card.scss'
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


  protected index = 0;

  protected readonly itemsCount = 3;

  protected readonly items = [
    {title: 'First', content: 'First content'},
    {title: 'Title #2', content: 'Much more content here so the height is bigger'},
    {title: 'Title III', content: 'Small item again'},
    {title: 'Title four', content: 'Relatively ling content here'},
    {title: 'Fifth item', content: 'Tiny text'},
    {title: '6', content: "That one's short too"},
    {title: 'Lucky 7', content: 'This takes about two lines or so'},
    {title: 'Eighth card', content: 'Almost the last one'},
    {title: 'X', content: 'This is the longest item there is in this list'},
  ];

  protected get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  protected onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }
}
