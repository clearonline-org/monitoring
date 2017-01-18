import { AngularCountdownPage } from './app.po';

describe('angular-countdown App', function() {
  let page: AngularCountdownPage;

  beforeEach(() => {
    page = new AngularCountdownPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
