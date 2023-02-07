import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsDetailImgComponent } from './admin-products-detail-img.component';

describe('AdminProductsDetailImgComponent', () => {
  let component: AdminProductsDetailImgComponent;
  let fixture: ComponentFixture<AdminProductsDetailImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductsDetailImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsDetailImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
