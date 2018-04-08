import { AngularTestAppNewPage } from './app.po';

describe('angular-test-app-new App', () => {
  let page: AngularTestAppNewPage;

  beforeEach(() => {
    page = new AngularTestAppNewPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
