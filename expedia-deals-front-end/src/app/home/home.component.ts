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
  minStarRating=""
  maxStarRating=""
  expediaUrl=""
  constructor(private _fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // we have to write a code that get all parameters and insrt them to form contoller
    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   this.destination = params['destination'] || "";

    // });
    

    this.myForm = this._fb.group({
      'destination': ['', Validators.required],
      'minTripStartDate': [],
      'maxTripStartDate': [],
      'minStarRating': [],
      'maxStarRating': []
    });
    axios.get('https://hotel-deals-exp.herokuapp.com/deals')
      .then(response => {
        this.hotelDealsList = response.data
        console.log(this.hotelDealsList)
      })
      .catch(error => {
        console.log(error)
      })
  }
  onSubmit() {
    
    this.router.navigate(['/'], { queryParams: { destination: this.myForm.controls['destination'].value, minTripStartDate: this.myForm.controls['minTripStartDate'].value, maxTripStartDate: this.myForm.controls['maxTripStartDate'].value, minStarRating: this.myForm.controls['minStarRating'].value, maxStarRating: this.myForm.controls['maxStarRating'].value } });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.destination = params['destination'] || "";
      this.minTripStartDate = params['minTripStartDate'] || "";
      this.maxTripStartDate = params['maxTripStartDate'] || "";
      this.minStarRating= params['minStarRating'] || "";
      this.maxStarRating=params['maxStarRating'] || "";
      this.expediaUrl= `https://ex-deals.herokuapp.com/deals?&destination=${this.destination}&minTripStartDate=${this.minTripStartDate}&maxTripStartDate=${this.maxTripStartDate}&minStarRating=${this.minStarRating}&maxStarRating=${this.maxStarRating}`
      console.log(this.expediaUrl)
      console.log(this.destination)
      console.log(this.minTripStartDate)
      console.log(this.maxTripStartDate)
      console.log(this.minStarRating)
      console.log(this.maxStarRating)
    });
    //expediaUrl= 
    // if (this.myForm.controls['destination']) {
    //   expediaUrl = expediaUrl + `?&destination=${this.myForm.controls['destination'].value}`

    // } else if (this.myForm.controls['startDate']) {
    //   expediaUrl = expediaUrl + `?&startDate=${this.myForm.controls['startDate'].value}`
    // }
    axios.get(this.expediaUrl)
      .then(response => {
        this.hotelDealsList = response.data;
        console.log(this.hotelDealsList)
      }).catch(error => console.log(error))

  }
}
