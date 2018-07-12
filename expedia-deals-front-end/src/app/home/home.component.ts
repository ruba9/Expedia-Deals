import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms"
import { ActivatedRoute, Params, Router } from "@angular/router"
import axios from 'axios'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Expedia deals';
  hotelDealsList = []
  public myForm: FormGroup;
  destination = ""
  minTripStartDate = ""
  maxTripStartDate = ""
  minStarRating = ""
  maxStarRating = ""
  minTotalRate = ""
  maxTotalRate = ""
  expediaUrl = ""
  constructor(private _fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  

   
      this.myForm = this._fb.group({
        'destination': ['', Validators.required],
        'minTripStartDate': [],
        'maxTripStartDate': [],
        'minStarRating': [],
        'maxStarRating': [],
        'minTotalRate' : [],
        'maxTotalRate' : [],
      });
      this.refreshData()
    


  }

  refreshData() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.destination = params['destination'] || "";
      this.minTripStartDate = params['minTripStartDate'] || "";
      this.maxTripStartDate = params['maxTripStartDate'] || "";
      this.minStarRating = params['minStarRating'] || "";
      this.maxStarRating = params['maxStarRating'] || "";
      this.minTotalRate = params['minTotalRate'] || "";
      this.maxTotalRate = params['maxTotalRate'] || "";
      this.expediaUrl = `https://ex-deals.herokuapp.com/deals?&destination=${this.destination}&minTripStartDate=${this.minTripStartDate}&maxTripStartDate=${this.maxTripStartDate}&minStarRating=${this.minStarRating}&maxStarRating=${this.maxStarRating}&minTotalRate=${this.minTotalRate}&maxTotalRate=${this.maxTotalRate}`
      this.myForm = this._fb.group({
        'destination': [this.destination, Validators.required],
        'minTripStartDate': this.minTripStartDate,
        'maxTripStartDate': this.maxTripStartDate,
        'minStarRating': this.minStarRating,
        'maxStarRating': this.maxStarRating,
        'minTotalRate' : this.minTotalRate,
        'maxTotalRate' : this.maxTotalRate,

      });
    });

    axios.get(this.expediaUrl)
      .then(response => {
        this.hotelDealsList = response.data;
        console.log(this.hotelDealsList)
      }).catch(error => console.log(error))
  }
  async onSubmit() {

    await this.router.navigate(['/'], { queryParams: { destination: this.myForm.controls['destination'].value, minTripStartDate: this.myForm.controls['minTripStartDate'].value, maxTripStartDate: this.myForm.controls['maxTripStartDate'].value, minStarRating: this.myForm.controls['minStarRating'].value, maxStarRating: this.myForm.controls['maxStarRating'].value,minTotalRate: this.myForm.controls['minTotalRate'].value,maxTotalRate: this.myForm.controls['maxTotalRate'].value  } });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.destination = params['destination'] || "";
      this.minTripStartDate = params['minTripStartDate'] || "";
      this.maxTripStartDate = params['maxTripStartDate'] || "";
      this.minStarRating = params['minStarRating'] || "";
      this.maxStarRating = params['maxStarRating'] || "";
      this.minTotalRate = params['minTotalRate'] || "";
      this.maxTotalRate = params['maxTotalRate'] || "";
      this.expediaUrl = `https://ex-deals.herokuapp.com/deals?&destination=${this.destination}&minTripStartDate=${this.minTripStartDate}&maxTripStartDate=${this.maxTripStartDate}&minStarRating=${this.minStarRating}&maxStarRating=${this.maxStarRating}&minTotalRate=${this.minTotalRate}&maxTotalRate=${this.maxTotalRate}`
  
    });

    axios.get(this.expediaUrl)
      .then(response => {
     
        this.hotelDealsList = response.data;
        console.log(this.hotelDealsList)
      }).catch(error => console.log(error))

  }
}
