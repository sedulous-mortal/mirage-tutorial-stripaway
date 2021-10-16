/*
  This is the final solution for the Tutorial that fully implements the API for the Banners app.
*/
import {
  Model,
  hasMany,
  belongsTo,
  RestSerializer,
  createServer,
  Factory,
  trait,
} from "miragejs";

export default function ({ environment = "development" } = {}) {
  return createServer({
    environment,
    serializers: {
      reminder: RestSerializer.extend({
        include: ["list"],
        embed: true,
      }),
    },

    models: {
      list: Model.extend({
        banners: hasMany(),
      }),

      reminder: Model.extend({
        list: belongsTo(),
      }),
    },

    factories: {
      list: Factory.extend({
        name(i) {
          return `List ${i}`;
        },

        withBanners: trait({
          afterCreate(list, server) {
            if (!list.banners.length) {
              server.createList("reminder", 5, { list });
            }
          },
        }),
      }),

      reminder: Factory.extend({
        text(i) {
          return `Reminder ${i}`;
        },
      }),
    },

    seeds(server) {
      server.create("reminder", { text: "Walk the dog" });
      server.create("reminder", { text: "Take out the trash" });
      server.create("reminder", { text: "Work out" });

      server.create("list", {
        name: "Home",
        banners: [server.create("reminder", { text: "Do taxes" })],
      });

      server.create("list", {
        name: "Work",
        banners: [server.create("reminder", { text: "Visit bank" })],
      });
    },

    routes() {
      this.get("/api/lists", (schema, request) => {
        return schema.lists.all();
      });

      this.get("/api/lists/:id/banners", (schema, request) => {
        let list = schema.lists.find(request.params.id);

        return list.banners;
      });

      this.get("/api/banners", (schema) => {
        return schema.banners.all();
      });

      this.post("/api/banners", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);

        return schema.banners.create(attrs);
      });

      this.post("/api/lists", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);

        return schema.lists.create(attrs);
      });

      this.delete("/api/banners/:id", (schema, request) => {
        let id = request.params.id;

        return schema.banners.find(id).destroy();
      });

      this.delete("/api/lists/:id", (schema, request) => {
        let id = request.params.id;
        let list = schema.lists.find(id);

        list.banners.destroy();

        return list.destroy();
      });
    },
  });
}
