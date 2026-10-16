import { type Page, type Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly backpackButton: Locator;
  readonly bikeLightButton: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;


  constructor(page: Page) {
    this.page = page;

    this.backpackButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );

    this.bikeLightButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]'
    );

    this.sortDropdown = page.locator(
        '[data-test="product-sort-container"]'
    );
    
    this.productPrices = page.locator('.inventory_item_price');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addBackpackToCart(): Promise<void> {
    await this.backpackButton.click();
  }

  async addBikeLightToCart(): Promise<void> {
    await this.bikeLightButton.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortPriceHighToLow() : Promise<void> {await this.sortDropdown.selectOption('hilo');
  }

}