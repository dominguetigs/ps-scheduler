import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-csv-extractor',
  templateUrl: './csv-extractor.component.html',
  styleUrls: ['./csv-extractor.component.scss'],
})
export class CSVExtractorComponent implements OnInit, OnDestroy {
  isExtractMode: boolean;

  private _unsubscribeAll: Subject<any>;

  @Input() items = [];
  @Input() label: string = 'Items';
  @Output() onExtractChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('fileInput')
  fileInput: any;

  constructor(private _ngxCsvParser: NgxCsvParser, private _toastr: ToastrService) {
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.isExtractMode = !this?.items?.length;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Public Methods
  // -----------------------------------------------------------------------------------------------------------------

  onFileInput(event: any): any {
    const files = event.srcElement.files;

    this._ngxCsvParser
      .parse(files[0], { header: false, delimiter: ',' })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (csvRecords: any) => {
          this.items = csvRecords;
          this.isExtractMode = false;
          this.onExtractChanged.emit(this.items);
          this._toastr.success(`The ${this.label} was extracted.`);
        },
        (error: NgxCSVParserError) => {
          console.log(error);
          this._toastr.error('An error occurred in the process extraction.');
        }
      );
  }
}
