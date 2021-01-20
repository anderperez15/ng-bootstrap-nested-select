import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
export declare enum KEY_CODE {
    ENTER = 13,
    UP_ARROW = 38,
    DOWN_ARROW = 40
}
export interface NgBootstrapNestedSelectAction {
    id: any;
    label: string;
}
export interface NgBootstrapNestedSelectSettings {
    filter: {
        fields: any[];
    };
    field: string;
    scroll: boolean;
    top: boolean;
    selectAll: boolean;
    label: string;
    collapsed: boolean;
    clear: boolean | string;
    strict: boolean;
    actions: string;
    required: boolean;
    indexedOptions: boolean;
    numberInput: boolean;
    matchRating: number;
    emptyText: string;
    popoverTitle: boolean | string;
}
export declare class NgBootstrapNestedSelectDefaultSetting implements NgBootstrapNestedSelectSettings {
    filter: {
        fields: string[];
    };
    field: string;
    scroll: boolean;
    top: boolean;
    selectAll: boolean;
    label: string;
    collapsed: boolean;
    clear: string;
    strict: boolean;
    actions: any;
    required: boolean;
    indexedOptions: boolean;
    numberInput: boolean;
    matchRating: number;
    emptyText: string;
    popoverTitle: string;
}
export declare class NgBootstrapNestedSelectComponent implements OnInit {
    private cb;
    private ngbConfig;
    disable: boolean;
    required: boolean;
    invalid: boolean;
    private filterInputRef;
    private nestedDropRef;
    _options: any[];
    options: any;
    default: any;
    settings: NgBootstrapNestedSelectSettings;
    _disabled: boolean;
    disabled: any;
    selectExpand: boolean;
    actions: NgBootstrapNestedSelectAction[];
    selected: EventEmitter<any>;
    actionSelected: EventEmitter<any>;
    _optionsFiltered: any[];
    _searchTerm: string;
    _selected: any;
    filterOn: boolean;
    constructor(cb: ChangeDetectorRef, ngbConfig: NgbDropdownConfig);
    /**
     * Init the default settings if they aren't provided in the settings object
     */
    ngOnInit(): void;
    /**
     * Handle a keyboard event when toggle through the options list
     * @param {KeyboardEvent} event
     */
    keyEvent(event: KeyboardEvent): void;
    /**
     * Check if we have any options to select from
     * @returns {boolean}
     */
    hasOptions(): boolean;
    /**
     * Resursively reset the "selected" flag for every option
     * @param options
     */
    resetSelected(options?: any[]): void;
    /**
     * Select a value from the options and emit output
     * @param {MouseEvent|null} event
     * @param {any=null} option
     * @param {boolean=false} toggle
     */
    selectOption(event: (MouseEvent | null), option?: any, toggle?: boolean, selectWithOptions?: boolean): void;
    selecWithOptions(event: (MouseEvent | null), option?: any): void;
    /**
     * Check if we have a value selected
     */
    validate(): void;
    /**
     * Resursive filter the list of options based on the kyeboard input
     * @param {string} searchTerm - The text to search for
     * @param {any[]} options - The options array to search through
     * @returns {number} found - value is > 1 if match is found, < 0 if no match
     */
    filterOptions(searchTerm?: string, options?: any[]): number;
    /**
     * Change the selected value based on if the up/down arrow key is typed
     * @param {number} direction - The keycode of the key selected
     */
    arrowOption(direction: number): void;
    /**
     * Emit the action selected to the parent component
     * @param action
     */
    selectAction(action: NgBootstrapNestedSelectAction): void;
    /**
     * Display the keyboard input filter
     */
    showFilter(): void;
    /**
     * Hide the keyboard input filter
     */
    hideFilter(): void;
    /**
     * Set the local this._options array
     * @param {array} options - Array of objects or values.
     */
    setOptions(options: Array<any>): void;
}
