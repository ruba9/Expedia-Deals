import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms"
import { ActivatedRoute, Params, Router } from "@angular/router"
import axios from 'axios'
import { start } from 'repl';

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
  startDate = ""
  endDate = ""
  pricePerUser=""
  maxUsers=""
  constructor(private _fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // we have to write a code that get all parameters and insrt them to form contoller
    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   this.destination = params['destination'] || "";

    // });

    this.myForm = this._fb.group({
      'destination': ['', Validators.required],
      'startDate': [],
      'endDate': [],
      'pricePerUser': [],
      'maxUsers': [1]
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
    var expediaUrl = `https://ex-deals.herokuapp.com/deals`
    this.router.navigate(['/'], { queryParams: { destination: this.myForm.controls['destination'].value, startDate: this.myForm.controls['startDate'].value, endDate: this.myForm.controls['endDate'].value, pricePerUser: this.myForm.controls['pricePerUser'].value, maxUsers: this.myForm.controls['maxUsers'].value } });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.destination = params['destination'] || "";
      this.startDate = params['startDate'] || "";
      this.endDate = params['startDate'] || "";
      this.pricePerUser= params['pricePerUser'] || "";
      this.maxUsers=params['maxUsers'] || "";
      expediaUrl=expediaUrl + `?&destination=${this.destination}&startDate=${this.startDate}&endDate=${this.endDate}&price=${this.pricePerUser}&maxUsers=${this.maxUsers}`
      console.log(expediaUrl)
      console.log(this.destination)
      console.log(this.startDate)
      console.log(this.endDate)
      console.log(this.pricePerUser)
      console.log(this.maxUsers)
    });
    //expediaUrl= 
    // if (this.myForm.controls['destination']) {
    //   expediaUrl = expediaUrl + `?&destination=${this.myForm.controls['destination'].value}`

    // } else if (this.myForm.controls['startDate']) {
    //   expediaUrl = expediaUrl + `?&startDate=${this.myForm.controls['startDate'].value}`
    // }
    axios.get(expediaUrl)
      .then(response => {
        this.hotelDealsList = response.data;
        console.log(this.hotelDealsList)
      }).catch(error => console.log(error))

  }
}
