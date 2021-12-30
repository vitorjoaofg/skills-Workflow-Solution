import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'Skills Workflow challenge';

  public formJSON: any;

  // restAPI = 'https://api.npoint.io/165c2313a64f8c49b80d';
  restAPI =
    'https://localhost:7269/DynamicForms/3fa85f64-5717-4562-b3fc-2c963f66afa6';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.restAPI).subscribe((formData: any) => {
      this.formJSON = formData;
    });
  }

  onSubmit(dynamicForm: any) {
    console.log('Form valid -> ', dynamicForm.valid);
    console.log('Form values -> ', dynamicForm.value);
  }
}
