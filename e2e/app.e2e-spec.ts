import { IEETodoPage } from './app.po';

describe('iee-todo App', () => {
  let page: IEETodoPage;

  beforeEach(() => {
    page = new IEETodoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
