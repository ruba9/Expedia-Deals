import { Component, OnInit } from '@angular/core'
import {FormBuilder,FormGroup,Validators,FormArray} from "@angular/forms"
import {ActivatedRoute,Params} from "@angular/router"
import axios from 'axios'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Expedia deals';
  hotelDealsList=[]
  public myForm: FormGroup;
  constructor(private _fb: FormBuilder,private activatedRoute: ActivatedRoute) {}
  
  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
    
      console.log(this.activatedRoute)
      
    });

    this.myForm = this._fb.group({
      'destination': ['', Validators.required],
      'startDate': [''],
      'endDate': [true],
      'pricePerUser': ['0'],
      'maxUsers': ['0']
    });
    axios.get('https://hotel-deals-exp.herokuapp.com/deals') 
    .then(response => {
      this.hotelDealsList=response.data
      console.log(this.hotelDealsList)
    })
    .catch(error => {console.log(error)
    })
  }
  onSubmit(){
    var expediaUrl = `https://ex-deals.herokuapp.com/deals`

    if (this.myForm.controls['destination'])
      expediaUrl = expediaUrl + `?&destination=${this.myForm.controls['destination'].value}`


    axios.get(expediaUrl)
      .then(response => {
        this.hotelDealsList = response.data;
        console.log(this.hotelDealsList)
      }).catch(error => console.log(error))

      }
}
