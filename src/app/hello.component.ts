import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!`,
})
export class HelloComponent {
  @Input() name: string;
  getName() {
    return prompt('Please enter your name');
  }
  ngOnInit() {
    let nameEntered = this.getName();
    if (nameEntered !== null && nameEntered.length > 1) this.name = nameEntered;
  }
}
