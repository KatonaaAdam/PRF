import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatItemComponent } from './creat-item.component';

describe('CreatItemComponent', () => {
  let component: CreatItemComponent;
  let fixture: ComponentFixture<CreatItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
