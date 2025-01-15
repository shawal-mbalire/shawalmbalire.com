import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-logolooker',
  templateUrl: './logolooker.component.html',
  styleUrls: ['./logolooker.component.css']
})
export class LogolookerComponent implements OnInit, OnDestroy {
  logo!: HTMLElement;
  images!: NodeListOf<HTMLImageElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.logo = document.getElementById('logo') as HTMLElement;
      this.images = this.logo.querySelectorAll('img');
    
      window.onmousemove = this.shiftLogo.bind(this);
      document.body.onmouseleave = this.resetLogo.bind(this);
      window.onmousedown = this.onMouseDown.bind(this);
      window.onmouseup = this.onMouseUp.bind(this);
    
      this.resetLogo();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.onmousemove = null;
      document.body.onmouseleave = null;
      window.onmousedown = null;
      window.onmouseup = null;
    }
  }

  private getActive(): boolean {
    return document.body.dataset['active'] === 'true';  // Bracket notation
  }

  private setActiveTo(active: boolean): void {
    document.body.dataset['active'] = String(active);  // Bracket notation
  }

  private shift(image: HTMLImageElement, index: number, rangeX: number, rangeY: number): void {
    const active = this.getActive();
    const translationIntensity = active ? 24 : 4;
    const maxTranslation = translationIntensity * (index + 1);
    const currentTranslation = `${maxTranslation * rangeX}% ${maxTranslation * rangeY}%`;
    const scale = active ? 1 + index * 0.4 : 1;

    image.animate(
      {
        translate: currentTranslation,
        scale: scale
      },
      { duration: 750, fill: 'forwards', easing: 'ease' }
    );
  }

  private shiftAll(rangeX: number, rangeY: number): void {
    this.images.forEach((image, index) => this.shift(image, index, rangeX, rangeY));
  }

  private shiftLogo(e: MouseEvent): void {
    const rect = this.logo.getBoundingClientRect();
    const radius = 1000;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rangeX = (e.clientX - centerX) / radius;
    const rangeY = (e.clientY - centerY) / radius;

    this.shiftAll(rangeX, rangeY);
  }

  private resetLogo(): void {
    this.setActiveTo(false);
    this.shiftAll(0.4, -0.7);
  }

  private onMouseDown(e: MouseEvent): void {
    this.setActiveTo(true);
    this.shiftLogo(e);
  }

  private onMouseUp(): void {
    this.resetLogo();
  }
}
