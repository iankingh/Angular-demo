import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/** @title Disabled select */
@Component({
  selector: 'select-disabled-example',
  templateUrl: 'select-disabled-example.html',
})
export class SelectDisabledExample {
  disableSelect = new FormControl(false);
}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */