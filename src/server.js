import { createServer, Model, Response } from "miragejs";

createServer({
  models: {
    user: Model,
  },

  routes() {
    this.namespace = "api";

    this.post("/user/registrationUser", (schema, request) => {
      if (
        !schema.users.findBy({ email: JSON.parse(request.requestBody).email })
      ) {
        return {
          users: schema.users.create(JSON.parse(request.requestBody)),
        };
      }
      return new Response(
        400,
        { some: "header" },
        { errors: ["User with this email already exists."] },
      );
    });

    this.post("/user/loginUser", (schema, request) => {
      if (schema.users.findBy(JSON.parse(request.requestBody))) {
        return true;
      }
      return new Response(
        400,
        { some: "header" },
        {
          errors: [
            "There is no user with such data. Check the correctness of the entered data.",
          ],
        },
      );
    });

    this.post("/user/logoutUser", () => {
      return true;
    });
  },
});
