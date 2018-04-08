import { UsTZPage } from './app.po';

describe('us-tz App', () => {
  let page: UsTZPage;

  beforeEach(() => {
    page = new UsTZPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
