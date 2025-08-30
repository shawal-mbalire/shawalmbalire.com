import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-logolooker',
  templateUrl: './logolooker.component.html',
  styleUrls: ['./logolooker.component.css']
})
export class LogolookerComponent implements OnInit, OnDestroy {
  private logo!: HTMLElement | null;
  private images!: NodeListOf<HTMLImageElement>;
  private active = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return; // Ensure DOM interaction only in browser

    // Access the DOM directly to get the logo element
    this.logo = document.getElementById('logo');
    if (!this.logo) {
      console.error('Logo element not found.');
      return;
    }

    // Get all images inside the logo
    this.images = this.logo.querySelectorAll('img');
    if (!this.images.length) {
      console.warn('No images found within the logo element.');
    }

    // Attach event listeners
    window.onmousemove = this.shiftLogo.bind(this);
    document.body.onmouseleave = this.resetLogo.bind(this);
    window.onmousedown = this.onMouseDown.bind(this);
    window.onmouseup = this.onMouseUp.bind(this);

    this.resetLogo();
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;

    // Cleanup event listeners
    window.onmousemove = null;
    document.body.onmouseleave = null;
    window.onmousedown = null;
    window.onmouseup = null;
  }

  private shift(image: HTMLImageElement, index: number, rangeX: number, rangeY: number): void {
    const translationIntensity = this.active ? 24 : 4;
    const maxTranslation = translationIntensity * (index + 1);
    const currentTranslation = `${maxTranslation * rangeX}% ${maxTranslation * rangeY}%`;
    const scale = this.active ? 1 + index * 0.4 : 1;

    // Apply animations using the Web Animations API
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

  private shiftLogo(event: MouseEvent): void {
    if (!this.logo) return;

    const rect = this.logo.getBoundingClientRect();
    const radius = 1000;

    // Calculate the offset of the mouse relative to the center of the logo
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rangeX = (event.clientX - centerX) / radius;
    const rangeY = (event.clientY - centerY) / radius;

    this.shiftAll(rangeX, rangeY);
  }

  private resetLogo(): void {
    this.active = false;
    this.shiftAll(0.4, -0.7);
  }

  private onMouseDown(event: MouseEvent): void {
    this.active = true;
    this.shiftLogo(event);
  }

  private onMouseUp(): void {
    this.resetLogo();
  }
}
