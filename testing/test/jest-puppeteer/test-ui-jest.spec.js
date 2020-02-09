describe('GitHub', () => {
  beforeAll(async () => {
    await page.goto('https://github.com/');
  });

  it('should print private repositories if logged in', async () => {

    await expect(page).toClick('a[href="/login"]');
    await page.waitForNavigation();
    await expect(page).toFill('input[type="text"]', 'NovikovEvgeny');
    await expect(page).toFill('input[type="password"]', process.env.GH_PASSWORD);

    await expect(page).toClick('input[type="submit"]');

    await page.waitForNavigation();
    const privateRepoList = await page.$$('.private.source.no-description');
    await expect(privateRepoList[0].evaluate(node => node.innerText.replace(/\n/g, '')))
      .resolves.toMatch('NovikovEvgeny/super');
  });
});
