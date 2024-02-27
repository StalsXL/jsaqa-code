let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  });
});

describe("Second task", () => {
  afterEach(() => {
    page.close();
  });

  test("Resources", async () => {
    await page.goto("https://resources.github.com/");
    const Selector = ".btn-mktg.arrow-target-mktg.btn-large-mktg.mb-3.mb-md-0.mr-md-3";
    await page.waitForSelector(Selector, {
      visible: true,
    });
    const actual = await page.$eval(Selector, (link) =>
      link.textContent.trim()
    );
    expect(actual).toContain("Learn about Security");
  });

  test("Sponsors", async () => {
    await page.goto("https://github.com/sponsors");
    const Selector = ".btn-mktg.mb-2";
    await page.waitForSelector(Selector, {
      visible: true,
    });
    const actual = await page.$eval(Selector, (link) =>
      link.textContent.trim()
    );
    expect(actual).toContain("See your top dependencies");
  });

  test("Pricing", async () => {
    await page.goto("https://github.com/pricing");
    const Selector = ".h6-mktg.mb-3";
    await page.waitForSelector(Selector, {
      visible: true,
    });
    const actual = await page.$eval(Selector, (link) => link.textContent);
    expect(actual).toContain("How often do you want to pay?");
  });
});