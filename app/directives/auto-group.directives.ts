import {Directive, ElementRef, Renderer, HostListener} from '@angular/core';

@Directive({
    selector: '[autoGrow]',
    host: {
        '(focus)':'onFocus()',
        '(blur)':'onBlur()',
    }
})

export class AutoGrowDirective {
    constructor(private _el:ElementRef, private _renderer: Renderer) {
        this._el.nativeElement.style.width = '300';
    }
    
    onFocus() {
        this._renderer.setElementStyle(this._el.nativeElement, 'width', '250');
    }
    onBlur() {
        this._renderer.setElementStyle(this._el.nativeElement, 'width', '120');
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('yellow');
    }
    
    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }
    
    private highlight(color: string) {
        this._el.nativeElement.style.backgroundColor = color;
    }
}