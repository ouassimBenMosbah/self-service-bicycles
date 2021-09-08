import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        // other modules
      ],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: () => 'safeString',
          },
        },
        // more providers
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  // const domSanitizer = TestBed.get(DomSanitizer);
  // const pipe = new SafeHtmlPipe(domSanitizer);

  // it('transforms "abc" to "Abc"', () => {
  //   expect(pipe.transform('abc')).toBe('Abc');
  // });

  // it('transforms "abc def" to "Abc Def"', () => {
  //   expect(pipe.transform('abc def')).toBe('Abc Def');
  // });
});
