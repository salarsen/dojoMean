import { BarcodegenPage } from './app.po';

describe('barcodegen App', () => {
  let page: BarcodegenPage;

  beforeEach(() => {
    page = new BarcodegenPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
