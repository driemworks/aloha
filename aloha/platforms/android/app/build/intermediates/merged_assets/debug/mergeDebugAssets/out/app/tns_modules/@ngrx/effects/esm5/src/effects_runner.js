var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EffectSources } from './effect_sources';
var EffectsRunner = /** @class */ (function () {
    function EffectsRunner(effectSources, store) {
        this.effectSources = effectSources;
        this.store = store;
        this.effectsSubscription = null;
    }
    EffectsRunner.prototype.start = function () {
        if (!this.effectsSubscription) {
            this.effectsSubscription = this.effectSources
                .toActions()
                .subscribe(this.store);
        }
    };
    EffectsRunner.prototype.ngOnDestroy = function () {
        if (this.effectsSubscription) {
            this.effectsSubscription.unsubscribe();
            this.effectsSubscription = null;
        }
    };
    EffectsRunner = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [EffectSources,
            Store])
    ], EffectsRunner);
    return EffectsRunner;
}());
export { EffectsRunner };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19ydW5uZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc3JjL2VmZmVjdHNfcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUdwQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHakQ7SUFHRSx1QkFDVSxhQUE0QixFQUM1QixLQUFpQjtRQURqQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBSm5CLHdCQUFtQixHQUF3QixJQUFJLENBQUM7SUFLckQsQ0FBQztJQUVKLDZCQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzdCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsYUFBYTtpQkFDMUMsU0FBUyxFQUFFO2lCQUNYLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNFLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQXJCVSxhQUFhO1FBRHpCLFVBQVUsRUFBRTt5Q0FLYyxhQUFhO1lBQ3JCLEtBQUs7T0FMWCxhQUFhLENBc0J6QjtJQUFELG9CQUFDO0NBQUEsQUF0QkQsSUFzQkM7U0F0QlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRWZmZWN0U291cmNlcyB9IGZyb20gJy4vZWZmZWN0X3NvdXJjZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRWZmZWN0c1J1bm5lciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZWZmZWN0c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlZmZlY3RTb3VyY2VzOiBFZmZlY3RTb3VyY2VzLFxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT5cbiAgKSB7fVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmICghdGhpcy5lZmZlY3RzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmVmZmVjdHNTdWJzY3JpcHRpb24gPSB0aGlzLmVmZmVjdFNvdXJjZXNcbiAgICAgICAgLnRvQWN0aW9ucygpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5zdG9yZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuZWZmZWN0c1N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5lZmZlY3RzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmVmZmVjdHNTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19