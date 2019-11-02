import { IAFTPage } from './app.po';

describe('iaft App', () => {
  let page: IAFTPage;

  beforeEach(() => {
    page = new IAFTPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
