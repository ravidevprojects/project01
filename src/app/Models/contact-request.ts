export class ContactRequest {
  personalData: PersonalData | undefined
  requestType: any = ''
  text: string = ''
}

export class PersonalData {
  email: string = ''
  mobile: string = ''
  country: string = ''
}

