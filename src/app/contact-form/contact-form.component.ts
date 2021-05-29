import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ContactRequest, PersonalData } from '../Models/contact-request';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  countries = ['USA', 'Germany', 'Italy', 'France']

  requestTypes = ['Claim', 'Feedback', 'Help Request']

  constructor(private formBuilder: FormBuilder) { 
    this.contactForm = this.createFormGroupWithBuilder(formBuilder);
   }

  createFormGroupWithBuilder(formBuilder: FormBuilder) {
    return formBuilder.group({
      personalData: formBuilder.group(new PersonalData()),
      requestType: '',
      text: ''
    });
  }

  onSubmit(){
    const result: ContactRequest = Object.assign({}, this.contactForm.value);
    result.personalData = Object.assign({}, result.personalData);
    console.log(result);
  }

  revert() {
    this.contactForm.reset();
  }

  ngOnInit(): void {
  }
  
}
