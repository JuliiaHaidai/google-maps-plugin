const login = (email, password) => {
  cy.get("input[placeholder='Email']")
    .clear()
    .type(`${email}`)
    .should("have.value", `${email}`);
  cy.get("input[placeholder='Password']")
    .clear()
    .type(`${password}`)
    .should("have.value", `${password}`);
  cy.contains("Login").click();
  cy.intercept("POST", "/api/user/loginUser", {
    statusCode: 201,
    body: {
      email: `${email}`,
      password: `${password}`,
    },
  });
};

const registration = (email, password, re_password) => {
  cy.get("input[placeholder='Email']")
    .clear()
    .type(`${email}`)
    .should("have.value", `${email}`);
  cy.get("input[placeholder='Password']")
    .clear()
    .type(`${password}`)
    .should("have.value", `${password}`);
  cy.get("input[placeholder='Repeat Password']")
    .clear()
    .type(`${re_password}`)
    .should("have.value", `${re_password}`);
  cy.contains("Register").click();
  cy.intercept("POST", "/api/user/registrationUser", {
    body: {
      email: `${email}`,
      password: `${password}`,
    },
  });
};

const goToRegistrationPage = () => {
  cy.visit("/");
  cy.contains("Register").click();
};

const selectFigure = (fig) => {
  cy.contains("+").click();
  cy.get(`.dropdown-menu > button:nth-child(${fig})`).click();
};

describe("App E2E", () => {
  it("should have a login page", () => {
    cy.visit("/");
    cy.get("input[placeholder='Email']").should("have.value", "");
    cy.get("input[placeholder='Password']").should("have.value", "");
    cy.contains("Login");
  });

  it("should have a registration page", () => {
    cy.visit("/");

    cy.contains("Register").click();
    cy.get("input[placeholder='Email']").should("have.value", "");
    cy.get("input[placeholder='Password']").should("have.value", "");
    cy.get("input[placeholder='Repeat Password']").should("have.value", "");
  });

  it("get a registration error about password", () => {
    goToRegistrationPage();
    registration("email@gmail.com", "1111", "2222");
    cy.contains("The re-password must be the same.");
  });

  it("register in the app", () => {
    goToRegistrationPage();
    registration("email@gmail.com", "1111", "1111");
    cy.contains("Logout");
  });

  it("login in the app", () => {
    goToRegistrationPage();
    registration("email@gmail.com", "1111", "1111");
    cy.contains("Logout").click();
    login("email@gmail.com", "1111");
    cy.contains("Logout");
  });

  it("check the map", () => {
    goToRegistrationPage();
    registration("email@gmail.com", "1111", "1111");
    cy.contains("Logout");
  });

  it("check the cancel and the confirm buttons", () => {
    selectFigure(1);
    cy.get("#map").click(400, 400).dblclick(500, 500);
    selectFigure(2);
    cy.get("#map").click(280, 200).click(600, 305).dblclick(340, 466);
    selectFigure(4);
    cy.get("#map").click(280, 340).click(195, 222).dblclick(588, 355);

    cy.get("input[alt='cancel']").click().click().click();
    cy.get("input[alt='confirm']").click();
    cy.contains("Logout");
  });

  it("draw, edit and delete circle", () => {
    selectFigure(1);
    cy.get("#map").click(200, 200).dblclick(300, 300);
    cy.get("input[alt='confirm']").click();

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.get("#map").wait(100).click(250, 250);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "25"));
    cy.get("#borderWidth").should("have.text", 25);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "1"));
    cy.get("#borderWidth").should("have.text", 1);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "15"));
    cy.get("#borderWidth").should("have.text", 15);

    cy.get("input[type='color']:first")
      .then((input) => cy.inputChange(input, "#3399ff"))
      .should("have.value", "#3399ff");
    cy.get("input[type='color']:first")
      .then((input) => cy.inputChange(input, "#9900ff"))
      .should("have.value", "#9900ff");

    cy.get("input[type='color']:last")
      .then((input) => cy.inputChange(input, "#66ff99"))
      .should("have.value", "#66ff99");
    cy.get("input[type='color']:last")
      .then((input) => cy.inputChange(input, "#00ffff"))
      .should("have.value", "#00ffff");

    cy.get("input[alt='delete']").click();
  });

  it("draw, edit and delete polyline", () => {
    selectFigure(2);
    cy.get("#map").click(280, 200).click(600, 305).dblclick(340, 466);
    cy.get("input[alt='confirm']").click();

    cy.get("#map").click(280, 200);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "25"));
    cy.get("#borderWidth").should("have.text", 25);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "1"));
    cy.get("#borderWidth").should("have.text", 1);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "15"));
    cy.get("#borderWidth").should("have.text", 15);

    cy.get("input[type='color']:first")
      .then((input) => cy.inputChange(input, "#3399ff"))
      .should("have.value", "#3399ff");
    cy.get("input[type='color']:first")
      .then((input) => cy.inputChange(input, "#9900ff"))
      .should("have.value", "#9900ff");

    cy.get("input[alt='delete']").click();
  });

  it("draw, edit and delete polygone", () => {
    selectFigure(3);
    cy.get("#map")
      .click(390, 250)
      .click(450, 150)
      .click(590, 250)
      .click(700, 450)
      .dblclick(600, 300);
    cy.get("input[alt='confirm']").click();

    cy.get("#map").click(390, 250);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "25"));
    cy.get("#borderWidth").should("have.text", 25);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "1"));
    cy.get("#borderWidth").should("have.text", 1);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "15"));
    cy.get("#borderWidth").should("have.text", 15);

    cy.get("input[type='color']:first")
      .then((input) => cy.inputChange(input, "#3399ff"))
      .should("have.value", "#3399ff");
    cy.get("input[type='color']:first")
      .then((input) => cy.inputChange(input, "#9900ff"))
      .should("have.value", "#9900ff");

    cy.get("input[type='color']:last")
      .then((input) => cy.inputChange(input, "#66ff99"))
      .should("have.value", "#66ff99");
    cy.get("input[type='color']:last")
      .then((input) => cy.inputChange(input, "#00ffff"))
      .should("have.value", "#00ffff");

    cy.get("input[alt='delete']").click();
  });

  it("draw, edit and delete arrow", () => {
    selectFigure(4);
    cy.get("#map").click(280, 340).click(195, 222).dblclick(588, 355);
    cy.get("input[alt='confirm']").click();

    cy.get("#map").click(280, 340);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "25"));
    cy.get("#borderWidth").should("have.text", 25);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "1"));
    cy.get("#borderWidth").should("have.text", 1);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "15"));
    cy.get("#borderWidth").should("have.text", 15);

    cy.get("input[type='color']:first")
      .then((input) => cy.inputChange(input, "#3399ff"))
      .should("have.value", "#3399ff");
    cy.get("input[type='color']:first")
      .then((input) => cy.inputChange(input, "#9900ff"))
      .should("have.value", "#9900ff");

    cy.get("input[alt='delete']").click();
  });

  it("create, edit and delete text", () => {
    goToRegistrationPage();
    registration("email@gmail.com", "1111", "1111");

    selectFigure(5);
    cy.get("#map").click(250, 220);
    cy.contains("Cancel").click();

    cy.get("#map").click(250, 420);
    cy.get("textarea[placeholder='Title']")
      .clear()
      .type("Some title")
      .should("have.value", "Some title");
    cy.get("textarea[placeholder='Description']")
      .clear()
      .type("Some description")
      .should("have.value", "Some description");
    cy.contains("Save").click();
    cy.intercept("POST", "/api/figures", {
      body: {
        title: "Some title",
        description: "Some description",
      },
    });
    cy.get("input[alt='confirm']").click();
    cy.waitUntil(() => cy.get("#map").contains("Some description"));

    cy.get("#1").click();
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "35"));
    cy.get("#fontSize").should("have.text", 35);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "5"));
    cy.get("#fontSize").should("have.text", 5);
    cy.get("input[type='range']").then((input) => cy.inputChange(input, "15"));
    cy.get("#fontSize").should("have.text", 15);

    cy.get("input[alt='delete']").click();
  });

  it("logout from the app", () => {
    goToRegistrationPage();
    registration("email@gmail.com", "1111", "1111");
    cy.contains("Logout").click();
    cy.intercept("POST", "/api/user/logoutUser", {
      body: {},
    });
  });

  it("get an error when data is wrong", () => {
    goToRegistrationPage();
    registration("email11@gmail.com", "1111", "1111");
    cy.contains("Logout").click();
    cy.intercept("POST", "/api/user/logoutUser", {
      body: {},
    });

    login("email22@gmail.com", "1111");
    cy.contains(
      "There is no user with such data. Check the correctness of the entered data.",
    );

    login("email11@gmail.com", "2222");
    cy.contains(
      "There is no user with such data. Check the correctness of the entered data.",
    );

    login("email22@gmail.com", "2222");
    cy.contains(
      "There is no user with such data. Check the correctness of the entered data.",
    );
  });

  it("get an error about user registration is already exist", () => {
    goToRegistrationPage();
    registration("email@gmail.com", "1111", "1111");
    cy.contains("Logout").click();
    cy.intercept("POST", "/api/user/logoutUser", {
      body: {},
    });

    cy.contains("Register").click();
    registration("email@gmail.com", "1111", "1111");
    cy.contains("User with this email already exists.");
  });
});
