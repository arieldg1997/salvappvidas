import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  constructor() {}

  private root = document.documentElement;
  public value: string | null = '1';
  private new_value: string | null = null;

  ngOnInit(): void {
    const fz = localStorage.getItem('fontSize');
    if (fz !== null) this.value = fz;
  }

  ngOnDestroy(): void {}

  valueChanged(e: any) {
    this.value = e.value;
  }

  submit() {
    localStorage.setItem('fontSize', this.value!);
    this.new_value = this.value;
    this.root.style.setProperty('--font-size', this.new_value + 'rem');
  }
}
