import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvertisementService} from '../../../services/advertisement-service';
import {Advertisement} from '../../../models/Advertisement';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiButton, TuiLabel, TuiTextfieldComponent} from '@taiga-ui/core';
import {TuiTextarea, TuiTextareaLimit
} from '@taiga-ui/kit';

@Component({
  selector: 'app-edit-adv-order-page',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiLabel,
    TuiTextarea,
    TuiTextareaLimit,
    TuiTextfieldComponent,
    FormsModule
  ],
  templateUrl: './edit-adv-order-page.html',
  styleUrl: './edit-adv-order-page.scss',
})
export class EditAdvOrderPage implements OnInit{

  advertisementService = inject(AdvertisementService)

  router = inject(Router)
  route = inject(ActivatedRoute)

  currentAdvertisement: Advertisement = new Advertisement()

  id: number | null = null

  ngOnInit(){
    this.route.params.subscribe(
      params => {
        this.id = params['id']
        console.log('adverticementId', this.id)
      }
    )
    this.getAdvertisement(this.id)
  }

  getAdvertisement(id: number | null){
    this.advertisementService.getAdvertisementById(id).subscribe({
      next: (response : any) => {
        this.currentAdvertisement = response
    }
    })
  }

  confirmChanges() {
    this.advertisementService.editAdvertisement(this.currentAdvertisement).subscribe()
    this.router.navigate(['tasks'])
  }

  deleteAdvertisement(id: number | null){
    this.advertisementService.deleteAdvertisement(id).subscribe()
    this.router.navigate(['tasks'])
  }

}
