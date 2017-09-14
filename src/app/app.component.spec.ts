import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TitleBarComponent } from './core/title-bar';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers : [],
      imports: [RouterTestingModule, CoreModule, SharedModule]
    }).compileComponents();
  }));

  it('should be created', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
