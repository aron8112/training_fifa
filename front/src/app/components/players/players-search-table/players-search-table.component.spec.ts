import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersSearchTableComponent } from './players-search-table.component';

describe('PlayersSearchTableComponent', () => {
  let component: PlayersSearchTableComponent;
  let fixture: ComponentFixture<PlayersSearchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersSearchTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
