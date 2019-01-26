import { OnInit } from '@angular/core';
export declare class AngularFontAwesomeComponent implements OnInit {
    name: string;
    title?: string;
    size?: string;
    fixed?: boolean;
    animation?: string;
    rotate?: string | number;
    inverse?: boolean;
    private _optionalClasses;
    constructor();
    ngOnInit(): void;
    readonly optionalClasses: string[];
    private addToOptionalClasses(addClass);
}
