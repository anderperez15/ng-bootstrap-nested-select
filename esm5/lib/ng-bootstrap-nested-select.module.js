import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapNestedSelectComponent } from './ng-bootstrap-nested-select.component';
var NgBootstrapNestedSelectModule = /** @class */ (function () {
    function NgBootstrapNestedSelectModule() {
    }
    NgBootstrapNestedSelectModule = tslib_1.__decorate([
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
export { NgBootstrapNestedSelectModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYm9vdHN0cmFwLW5lc3RlZC1zZWxlY3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctYm9vdHN0cmFwLW5lc3RlZC1zZWxlY3QvIiwic291cmNlcyI6WyJsaWIvbmctYm9vdHN0cmFwLW5lc3RlZC1zZWxlY3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDL0UsT0FBTyxFQUFDLGdDQUFnQyxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFheEY7SUFBQTtJQUE2QyxDQUFDO0lBQWpDLDZCQUE2QjtRQVh6QyxRQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztZQUNoRCxPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixXQUFXO2dCQUNYLGdCQUFnQjtnQkFDaEIsaUJBQWlCO2dCQUNqQixnQkFBZ0I7YUFDakI7WUFDRCxPQUFPLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUM1QyxDQUFDO09BQ1csNkJBQTZCLENBQUk7SUFBRCxvQ0FBQztDQUFBLEFBQTlDLElBQThDO1NBQWpDLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge05nYkRyb3Bkb3duTW9kdWxlLCBOZ2JQb3BvdmVyTW9kdWxlfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQge05nQm9vdHN0cmFwTmVzdGVkU2VsZWN0Q29tcG9uZW50fSBmcm9tICcuL25nLWJvb3RzdHJhcC1uZXN0ZWQtc2VsZWN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nQm9vdHN0cmFwTmVzdGVkU2VsZWN0Q29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOZ2JQb3BvdmVyTW9kdWxlLFxuICAgIE5nYkRyb3Bkb3duTW9kdWxlLFxuICAgIE5nYlBvcG92ZXJNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW05nQm9vdHN0cmFwTmVzdGVkU2VsZWN0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ0Jvb3RzdHJhcE5lc3RlZFNlbGVjdE1vZHVsZSB7IH1cbiJdfQ==