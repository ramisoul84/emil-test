import { Injectable, NgZone } from "@angular/core";

const breakpoints = [
    { minWidth: 2160, gridCount: 87 },
    { minWidth: 1560, gridCount: 77 },
    { minWidth: 1160, gridCount: 67 },
    { minWidth: 536, gridCount: 37 },
    { minWidth: 0, gridCount: 27 }
];

@Injectable({
    providedIn: 'root'
})
export class GridService {
    private resizeHandler: () => void;
    private orientationHandler: () => void;
    private visualViewportHandler: (() => void) | null = null;

    constructor(private ngZone: NgZone) {
        this.resizeHandler = () => this.updateGrid();
        this.orientationHandler = () => this.updateGrid();
        this.initializeGrid();
    }

    private initializeGrid(): void {
        this.updateGrid();
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('resize', this.resizeHandler);
            window.addEventListener('orientationchange', this.orientationHandler);

            if (window.visualViewport) {
                this.visualViewportHandler = () => this.updateGrid();
                window.visualViewport.addEventListener('resize', this.visualViewportHandler);
            }
        });
    }

    private updateGrid(): void {
        this.ngZone.run(() => {
            let width = this.getAccurateWidth() - 20;
            const gridCount = this.getGridCount(width);
            const gridSize = Math.floor(width / gridCount);
            const totalGridWidth = gridSize * gridCount;
            const extraSpace = width - totalGridWidth;
            const margin = 10 + (extraSpace - 1) / 2;

            document.documentElement.style.setProperty('--grid-size', `${gridSize}px`);
            document.documentElement.style.setProperty('--margin', `${margin}px`);
        });
    }

    private getAccurateWidth(): number {
        return document.documentElement.clientWidth;
    }

    private getGridCount(width: number): number {
        const breakpoint = breakpoints.find(bp => width >= bp.minWidth);
        return breakpoint?.gridCount || 20;
    }

    ngOnDestroy(): void {
        window.removeEventListener('resize', this.resizeHandler);
        window.removeEventListener('orientationchange', this.orientationHandler);

        if (window.visualViewport && this.visualViewportHandler) {
            window.visualViewport.removeEventListener('resize', this.visualViewportHandler);
        }
    }
}