import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecordingPage} from './recording.page';

describe('RecordingPage', () => {
    let component: RecordingPage;
    let fixture: ComponentFixture<RecordingPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecordingPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecordingPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
