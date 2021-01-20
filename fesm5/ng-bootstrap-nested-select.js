import { __assign, __decorate } from 'tslib';
import { EventEmitter, ChangeDetectorRef, HostBinding, ViewChild, Input, Output, HostListener, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { NgbDropdownConfig, NgbPopoverModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { compareTwoStrings } from 'string-similarity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

var KEY_CODE;
(function (KEY_CODE) {
    KEY_CODE[KEY_CODE["ENTER"] = 13] = "ENTER";
    KEY_CODE[KEY_CODE["UP_ARROW"] = 38] = "UP_ARROW";
    KEY_CODE[KEY_CODE["DOWN_ARROW"] = 40] = "DOWN_ARROW";
})(KEY_CODE || (KEY_CODE = {}));
var NgBootstrapNestedSelectDefaultSetting = /** @class */ (function () {
    function NgBootstrapNestedSelectDefaultSetting() {
        this.filter = { fields: ['name'] };
        this.field = 'options';
        this.scroll = true;
        this.top = false;
        this.selectAll = false;
        this.label = 'name';
        this.collapsed = false;
        this.clear = 'Clear';
        this.strict = true;
        this.actions = null;
        this.required = false;
        this.indexedOptions = false;
        this.numberInput = false;
        this.matchRating = .4;
        this.emptyText = 'No Options Available';
        this.popoverTitle = 'Details:';
    }
    return NgBootstrapNestedSelectDefaultSetting;
}());
var NgBootstrapNestedSelectComponent = /** @class */ (function () {
    function NgBootstrapNestedSelectComponent(cb, ngbConfig) {
        this.cb = cb;
        this.ngbConfig = ngbConfig;
        this.disable = false;
        this.required = false;
        this.invalid = true;
        // Local list of options
        this._options = [];
        // Settings to control component
        this.settings = new NgBootstrapNestedSelectDefaultSetting();
        this._disabled = false;
        // Select Expand of list
        this.selectExpand = false;
        // Array of action buttons/links to add to select box
        this.actions = [];
        // Emit selected value when selected
        this.selected = new EventEmitter();
        // Emit action value when action is selected
        this.actionSelected = new EventEmitter();
        // Array of filted options
        this._optionsFiltered = [];
        // The filter string to search through options
        this._searchTerm = '';
        // The selected option
        this._selected = {};
        this.filterOn = true;
        this.ngbConfig.autoClose = 'outside';
    }
    Object.defineProperty(NgBootstrapNestedSelectComponent.prototype, "options", {
        // List of options to display in the dropdown
        set: function (options) {
            var _this = this;
            this.setOptions(options);
            // resetSelected needs to wait for the settings var to populate, so use setTimeout to delay execution.
            setTimeout(function () {
                _this.resetSelected(_this._options);
            }, 500);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgBootstrapNestedSelectComponent.prototype, "default", {
        // Default option to be set
        set: function (defautOption) {
            if (typeof defautOption === 'object') {
                this._selected = __assign({}, defautOption);
            }
            else {
                this._selected = {
                    name: defautOption,
                    selected: true
                };
            }
            if (defautOption)
                this.filterOn = false;
            this.validate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgBootstrapNestedSelectComponent.prototype, "disabled", {
        // Disabled the select box
        set: function (bool) {
            if (bool)
                this.disable = true;
            else
                this.disable = false;
            this._disabled = bool;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init the default settings if they aren't provided in the settings object
     */
    NgBootstrapNestedSelectComponent.prototype.ngOnInit = function () {
        var defaultSettings = new NgBootstrapNestedSelectDefaultSetting();
        for (var key in defaultSettings) {
            if (!this.settings[key] && this.settings[key] !== false)
                this.settings[key] = defaultSettings[key];
        }
        // Add 'required' class
        if (this.settings.required) {
            this.required = true;
            this.validate();
        }
        this.cb.markForCheck();
    };
    /**
     * Handle a keyboard event when toggle through the options list
     * @param {KeyboardEvent} event
     */
    NgBootstrapNestedSelectComponent.prototype.keyEvent = function (event) {
        switch (event.keyCode) {
            case KEY_CODE.UP_ARROW:
            case KEY_CODE.DOWN_ARROW:
                this.arrowOption(event.keyCode);
                break;
            case KEY_CODE.ENTER:
                this.selectOption(null, this._selected);
                break;
        }
    };
    /**
     * Check if we have any options to select from
     * @returns {boolean}
     */
    NgBootstrapNestedSelectComponent.prototype.hasOptions = function () {
        var _this = this;
        return this._options.filter(function (op) {
            if (op[_this.settings.label] && op[_this.settings.label] !== '')
                return true;
        }).length > 0;
    };
    /**
     * Resursively reset the "selected" flag for every option
     * @param options
     */
    NgBootstrapNestedSelectComponent.prototype.resetSelected = function (options) {
        var _this = this;
        if (options === void 0) { options = []; }
        options.forEach(function (opt) {
            opt.selected = false;
            opt.collapsed = false;
            // Check if this options has child options
            if (_this.settings && opt[_this.settings.field] && opt[_this.settings.field].length > 0) {
                _this.resetSelected(opt[_this.settings.field]);
            }
        });
    };
    /**
     * Select a value from the options and emit output
     * @param {MouseEvent|null} event
     * @param {any=null} option
     * @param {boolean=false} toggle
     */
    NgBootstrapNestedSelectComponent.prototype.selectOption = function (event, option, toggle, selectWithOptions) {
        if (option === void 0) { option = null; }
        if (toggle === void 0) { toggle = false; }
        if (selectWithOptions === void 0) { selectWithOptions = false; }
        //console.log(selectWithOptions)
        if (!option) {
            option = { selected: true };
            option[this.settings.label] = event;
        }
        if (toggle || (option[this.settings.field] && option[this.settings.field].length && !this.settings.selectAll && !selectWithOptions)) {
            option.selected = !option.selected;
            event.stopPropagation();
            event.preventDefault();
        }
        else {
            this._selected = __assign({}, option);
            this._searchTerm = this._selected[this.settings.label];
            if (this.settings.indexedOptions)
                this.selected.emit(option[this.settings.label]);
            else
                this.selected.emit(option);
            if (!this.settings.selectAll)
                this.filterOn = false;
            this.nestedDropRef.close();
        }
        this.validate();
        this.cb.detectChanges();
    };
    NgBootstrapNestedSelectComponent.prototype.selecWithOptions = function (event, option) {
        if (option === void 0) { option = null; }
        this.selectOption(event, option, false, this.selectExpand);
    };
    /**
     * Check if we have a value selected
     */
    NgBootstrapNestedSelectComponent.prototype.validate = function () {
        if (Object.keys(this._selected).length > 0)
            this.invalid = false;
        else
            this.invalid = true;
    };
    /**
     * Resursive filter the list of options based on the kyeboard input
     * @param {string} searchTerm - The text to search for
     * @param {any[]} options - The options array to search through
     * @returns {number} found - value is > 1 if match is found, < 0 if no match
     */
    NgBootstrapNestedSelectComponent.prototype.filterOptions = function (searchTerm, options) {
        var _this = this;
        if (searchTerm === void 0) { searchTerm = null; }
        if (options === void 0) { options = []; }
        this.nestedDropRef.open();
        if (this._searchTerm.length === 0)
            return;
        if (!searchTerm) {
            this._optionsFiltered = [];
            if (!this._searchTerm)
                this._optionsFiltered = this._options.slice(0);
            searchTerm = this._searchTerm;
            options = this._options.slice(0);
        }
        var found = -1;
        options.forEach(function (opt, index) {
            _this.settings.filter.fields.forEach(function (field) {
                var optTerm = opt[field];
                found = optTerm.search(new RegExp(searchTerm, 'i'));
                var similar = compareTwoStrings(optTerm, searchTerm);
                if ((found >= 0 || similar >= _this.settings.matchRating) && _this._optionsFiltered.indexOf(opt) < 0) {
                    opt.match = similar;
                    _this._optionsFiltered.push(opt);
                }
            });
            if (opt[_this.settings.field] && opt[_this.settings.field].length) {
                found = _this.filterOptions(searchTerm, opt[_this.settings.field]);
            }
        });
        this._optionsFiltered.sort(function (a, b) {
            return b.match - a.match;
        });
        return found;
    };
    /**
     * Change the selected value based on if the up/down arrow key is typed
     * @param {number} direction - The keycode of the key selected
     */
    NgBootstrapNestedSelectComponent.prototype.arrowOption = function (direction) {
        this.filterOn = false;
        if (!this._selected)
            this._selected = this._optionsFiltered[0];
        else {
            // Do for loop so that we can break out of it.
            for (var index = 0; index < this._optionsFiltered.length; index++) {
                var opt = this._optionsFiltered[index];
                var moveSelected = 1;
                if (direction === KEY_CODE.UP_ARROW)
                    moveSelected = -1;
                if (opt === this._selected && this._optionsFiltered[(index + moveSelected)]) {
                    this._selected = this._optionsFiltered[(index + moveSelected)];
                    break;
                }
            }
        }
    };
    /**
     * Emit the action selected to the parent component
     * @param action
     */
    NgBootstrapNestedSelectComponent.prototype.selectAction = function (action) {
        this.actionSelected.emit(action);
    };
    /**
     * Display the keyboard input filter
     */
    NgBootstrapNestedSelectComponent.prototype.showFilter = function () {
        var _this = this;
        this._optionsFiltered = this._options.slice(0);
        this.filterOn = true;
        this._searchTerm = '';
        setTimeout(function () {
            _this.filterInputRef.nativeElement.focus();
            _this.nestedDropRef.open();
        }, 100);
    };
    /**
     * Hide the keyboard input filter
     */
    NgBootstrapNestedSelectComponent.prototype.hideFilter = function () {
        this.filterOn = false;
    };
    /**
     * Set the local this._options array
     * @param {array} options - Array of objects or values.
     */
    NgBootstrapNestedSelectComponent.prototype.setOptions = function (options) {
        var _this = this;
        this._options = [];
        options.forEach(function (opt) {
            if (typeof opt === 'object') { // "options" is an array of objects
                var objCopy = __assign({}, opt);
                objCopy.selected = false;
                _this._options.push(objCopy);
            }
            else { // "options" is an array of values
                _this._options.push({
                    name: opt,
                    selected: false
                });
            }
            _this._optionsFiltered = _this._options.slice(0);
        });
    };
    NgBootstrapNestedSelectComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NgbDropdownConfig }
    ]; };
    __decorate([
        HostBinding('class.disabled')
    ], NgBootstrapNestedSelectComponent.prototype, "disable", void 0);
    __decorate([
        HostBinding('class.required')
    ], NgBootstrapNestedSelectComponent.prototype, "required", void 0);
    __decorate([
        HostBinding('class.invalid')
    ], NgBootstrapNestedSelectComponent.prototype, "invalid", void 0);
    __decorate([
        ViewChild('filterInput', { static: false })
    ], NgBootstrapNestedSelectComponent.prototype, "filterInputRef", void 0);
    __decorate([
        ViewChild('nestedDrop', { static: false })
    ], NgBootstrapNestedSelectComponent.prototype, "nestedDropRef", void 0);
    __decorate([
        Input()
    ], NgBootstrapNestedSelectComponent.prototype, "options", null);
    __decorate([
        Input()
    ], NgBootstrapNestedSelectComponent.prototype, "default", null);
    __decorate([
        Input()
    ], NgBootstrapNestedSelectComponent.prototype, "settings", void 0);
    __decorate([
        Input()
    ], NgBootstrapNestedSelectComponent.prototype, "disabled", null);
    __decorate([
        Input()
    ], NgBootstrapNestedSelectComponent.prototype, "selectExpand", void 0);
    __decorate([
        Input()
    ], NgBootstrapNestedSelectComponent.prototype, "actions", void 0);
    __decorate([
        Output()
    ], NgBootstrapNestedSelectComponent.prototype, "selected", void 0);
    __decorate([
        Output()
    ], NgBootstrapNestedSelectComponent.prototype, "actionSelected", void 0);
    __decorate([
        HostListener('window:keyup', ['$event'])
    ], NgBootstrapNestedSelectComponent.prototype, "keyEvent", null);
    NgBootstrapNestedSelectComponent = __decorate([
        Component({
            selector: 'nested-select',
            template: "<ng-template #optionTemplate let-options=\"options\" let-i=\"index\">\n  <ng-template ngFor [ngForOf]=\"options\" let-opt>\n    <div\n      [ngClass]=\"{\n        'option':true,\n        'and-end':true,\n        'text-primary': opt == _selected\n      }\"\n    >\n         <!-- (click)=\"selectOption($event, opt)\"> -->\n            <div *ngIf=\"opt[settings.field] && opt[settings.field].length && settings.collapsed\"\n                  class=\"d-inline\"\n                  (click)=\"selectOption($event, opt)\">\n                  <span \n                  class=\"fa mr-2 toggle-icon\"\n                  [ngClass]=\"{\n                    'arrow-right': !opt.selected && !settings.selectAll,\n                    'arrow-down': opt.selected && !settings.selectAll,\n                    'click-arrow-right': !opt.selected,\n                    'click-arrow-down': opt.selected,\n                    'click-arrow': settings.selectAll\n                  }\"></span>\n            </div>\n      <span (click)=\"selecWithOptions($event, opt)\" [innerHTML]=\"opt[settings.label]\" class=\"option-label\"></span>\n    </div>\n    <div class=\"option-container\" *ngIf=\"opt[settings.field] && opt[settings.field].length && (!settings.collapsed || opt.selected)\">\n      <div\n        [ngTemplateOutlet]=\"optionTemplate\"\n        [ngTemplateOutletContext]=\"{options: opt[settings.field], index: (i+1)}\">\n      </div>\n    </div>\n  </ng-template>\n</ng-template>\n<div *ngIf=\"_disabled && settings.popoverTitle\"\n     class=\"filter-read\"\n     [innerHTML]=\"_selected[settings.label]\"\n     placement=\"top\"\n     popoverTitle={{settings.popoverTitle}}\n     #p=\"ngbPopover\"\n     [ngbPopover]=\"productName\"\n     triggers=\"mouseenter:mouseleave\">\n</div>\n<div [ngStyle]=\"{'display':!_disabled?'block':'none'}\">\n  <div\n       ngbDropdown=\"\"\n       class=\"nested-select\"\n       #nestedDrop=\"ngbDropdown\"\n       (openChange)=\"resetSelected(_options)\">\n    <ng-template [ngIf]=\"!settings.strict\">\n      <div *ngIf=\"settings.filter && filterOn\">\n        <input\n               ngbDropdownAnchor=\"\"\n               (focus)=\"nestedDrop.open()\"\n               type=\"text\"\n               name=\"filterInput\"\n               id=\"filterInput\"\n               [(ngModel)]=\"_searchTerm\"\n               (ngModelChange)=\"filterOptions()\"\n               #filterInput (click)=\"filterOptions()\"\n               (focusout)=\"hideFilter()\"\n               autocomplete=\"off\" />\n      </div>\n      <div *ngIf=\"!settings.filter\">\n        <input\n               ngbDropdownAnchor=\"\"\n               (focus)=\"nestedDrop.open()\"\n               [type]=\"(settings.numberInput ? 'number' : 'text')\"\n               name=\"typedInput\"\n               id=\"typedInput\"\n               [(ngModel)]=\"_selected[settings.label]\"\n               #typedInput\n               (ngModelChange)=\"selectOption($event)\"\n               autocomplete=\"off\" />\n      </div>\n      <div *ngIf=\"settings.filter && !filterOn\">\n        <div\n             ngbDropdownToggle=\"\"\n             class=\"filter-read\"\n             [innerHTML]=\"_selected[settings.label]\"\n             (click)=\"showFilter();\">\n        </div>\n      </div>\n    </ng-template>\n    <div *ngIf=\"settings.strict\">\n      <div\n           ngbDropdownToggle=\"\"\n           class=\"filter-read\"\n           [innerHTML]=\"_selected[settings.label]\">\n      </div>\n    </div>\n  \n    <div ngbDropdownMenu=\"\"\n         aria-labelledby=\"dropdownMenuButton\"\n         [ngClass]=\"{\n              'scroll': settings.scroll,\n              'top': settings.top\n            }\">\n  \n      <div *ngIf=\"hasOptions() && settings.clear && settings.actions != 'buttons'\"\n           class=\"option text-secondary dropdown-item clear\"\n           (click)=\"selectOption(null)\">\n        {{settings.clear}}\n      </div>\n      <ng-template [ngIf]=\"(actions.length > 0) && settings.actions != 'buttons'\">\n        <div class=\"option text-secondary dropdown-item\"\n             *ngFor=\"let action of actions\"\n             (click)=\"selectAction(action)\"\n             [innerHTML]=\"action.label\">\n        </div>\n      </ng-template>\n  \n      <div class=\"option dropdown-item\" *ngIf=\"settings.actions == 'buttons'\">\n        <ng-template [ngIf]=\"(actions.length > 0)\">\n          <div class=\"btn btn-xs btn-light float-right ml-1\"\n               *ngFor=\"let action of actions\"\n               (click)=\"selectAction(action)\"\n               [innerHTML]=\"action.label\">\n          </div>\n        </ng-template>\n        <div class=\"btn btn-xs btn-light float-right ml-1\"\n             *ngIf=\"hasOptions() && settings.clear\"\n             (click)=\"selectOption(null)\">\n          {{settings.clear}}\n        </div>\n      </div>\n  \n      <div class=\"option\" *ngIf=\"!hasOptions()\">{{settings.emptyText}}</div>\n      <div\n        [ngTemplateOutlet]=\"optionTemplate\"\n        [ngTemplateOutletContext]=\"{options: _optionsFiltered, index: 1}\">\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #productName>\n  <div [innerHTML]=\"_selected[settings.label]\"></div>\n</ng-template>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".nested-select{border:none;padding:0;margin:0;height:100%;width:100%;position:relative}.dropdown-toggle::after{position:absolute;right:0;top:40%}.dropdown-menu{width:100%}.dropdown-menu.scroll{overflow-y:scroll;max-height:300px}.dropdown-menu.show{left:0}.dropdown-toggle{height:100%;width:100%;cursor:pointer;position:relative}.option{padding:0 .3rem;font-style:italic}.dropdown-item{color:#000;cursor:pointer;font-style:normal}.and-end{display:block;width:100%;padding:.25rem 1.5rem;clear:both;font-weight:400;text-align:inherit;white-space:nowrap;background-color:transparent;border:0;color:#000;cursor:pointer;font-style:normal}.option-container{border-left:1px solid #ccc;margin-left:.8rem}input{border:none}.clear{font-style:italic;color:#aaa!important}.filter-read{overflow:hidden;padding-right:4px;text-overflow:ellipsis}.option:hover .option-label{color:var(--primary)}.option:hover .toggle-icon{color:initial}.toggle-icon:hover{color:var(--primary)!important}.arrow-right{width:0;height:0;display:inline-block;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid #aaa}.arrow-down{width:0;height:0;display:inline-block;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #ccc}.click-arrow{display:inline-block;height:16px;width:16px;vertical-align:middle}.click-arrow-right{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAByUlEQVQ4jZ2TMWiTURSFv/OTIUiGUEoRCcUhBAdxea8gIg4dOzopuGkQJ5HgXDqLdA7azcHRqZM4FCli/wfiVIo4lAxSghQJpRTJcXl/+E0mvcuDd94599x735Ux85HK1Aa6QDtfnQLfQgyn829VF0hlKoCbtp9Iug1cztAPYA8Y2v4U1+J0QSCVqbB9V9ILYBUogHE+l4ApcAwMbL+rRIqamxuSXgJX8/0x0Ace2v5uu8jYtqTrFanI2ZtA33anAmyPbR8Cu5I2JU0y1LHdLw/K5kzAds/2erZ5AoyAFUmbQCPE8AZ4BvzMnHVJPYAGgKRl2x1Jo/xwIqky08jnW9tXJD3PPVqegbabki7lce2GGC7mxxVimKQyvQbuS+rZbtYdnANnttuSNlKZJjXu5xDDr1Smlu1HQEfSWebM7I1z3V1gCFzYBvgoaT+7vCfpKdCyfShpXB/jEfBBUgGs5CxjSVvA71SmB5K2bVf/4b3to5lAiOEc2MkusI3tJdvXbG/Y3gJaubEjSTtxLf5VAsAX24P8mTrAqqRXQJHFpjnBQNLXirSwC7ZvAY8l3cnlAJzY3gOGkvZDDIu7UI9UprbtrqR/28b/iT8f8eQJZ91doAAAAABJRU5ErkJggg==) top left no-repeat}.click-arrow-down{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABvElEQVQ4jZ2Tv2tTURTHP9+HQ5AMoQRRCEWkZBIH3xNExKGzIAiVgpsQRBFE8geIs9TgInTwPxAU5+LQoQi+C8WxlA4lqJQORcKjU74OOS88m0nPdu853x/33HNkzNlIZeoAK0Anrk6A/bzIT87WqkmQypQBN20/kXQbuBipX8A2sGn7a3GjmC4QpDJltu9Leg0s255KOoq6C0AGHAJD259qkqzh5pqkDeAykEn6AawBa7bHtrPIjSRdrUFZqLeAge1enbB9ClTARNKppDrVsz0ov5WtOYHtvu3VOFfApNko28RdFTWrkvoA5wAkdUO9At7Z/gk8bHBMbL+UdAl4CiwD3TmB7Zak88Ae8BY4lrQP/A6BV7a3gK7tu5L6tltNB/V7e7YfSXqTF/nnhoODVKY2MJDUA6rAzH/hGBjbbkt6DqyzGOvAM6BtexyYmYOw/iUaswSMUpkq2x/C4QNgFAJTYMv2Hvw9SNeBj8yGCOBA0otwuQFcCbFD4F5e5LtNBwC7tocxTL0AvAcy20vAFBgDQ0nfa9DCLti+BTyWdIfZCAMc2d4GNiXt5EW+uAvNSGXq2F6R9G/b+D/xB+z71+BSnjoVAAAAAElFTkSuQmCC) top left no-repeat}:host{text-align:left}:host .disabled{background-color:#e9ecef;cursor:not-allowed}@media (min-width:576px){.filter-read{white-space:nowrap}.dropdown-menu{min-width:500px}}"]
        })
    ], NgBootstrapNestedSelectComponent);
    return NgBootstrapNestedSelectComponent;
}());

var NgBootstrapNestedSelectModule = /** @class */ (function () {
    function NgBootstrapNestedSelectModule() {
    }
    NgBootstrapNestedSelectModule = __decorate([
        NgModule({
            declarations: [NgBootstrapNestedSelectComponent],
            imports: [
                CommonModule,
                FormsModule,
                NgbPopoverModule,
                NgbDropdownModule,
                NgbPopoverModule
            ],
            exports: [NgBootstrapNestedSelectComponent]
        })
    ], NgBootstrapNestedSelectModule);
    return NgBootstrapNestedSelectModule;
}());

/*
 * Public API Surface of ng-bootstrap-nested-select
 */

/**
 * Generated bundle index. Do not edit.
 */

export { KEY_CODE, NgBootstrapNestedSelectComponent, NgBootstrapNestedSelectDefaultSetting, NgBootstrapNestedSelectModule };
//# sourceMappingURL=ng-bootstrap-nested-select.js.map
