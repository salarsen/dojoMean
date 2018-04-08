import { ArchitecturePracticePage } from './app.po';

describe('architecture-practice App', () => {
  let page: ArchitecturePracticePage;

  beforeEach(() => {
    page = new ArchitecturePracticePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
