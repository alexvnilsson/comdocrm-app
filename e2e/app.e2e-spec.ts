import { ComdoCrmFrontendPage } from './app.po';

describe('comdo-crm-frontend App', () => {
  let page: ComdoCrmFrontendPage;

  beforeEach(() => {
    page = new ComdoCrmFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
