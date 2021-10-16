// Welcome to the tutorial!
import { createServer, Model } from "miragejs"

export default function (environment = 'development') {
  return createServer({
    models: {
        banner: Model,
    },
    environment,
    seeds(server) {
        server.create('banner', {
          bannerColor: 'blue',
          bannerLink: 'https://codespark.com',
          bannerText: 'This is an awesome banner',
          bannerIcon: 'https://thefoos-com2.s3.amazonaws.com/flagship/icon_desktop.png',
          startDate: '2021-01-24T19:16:00.000Z',
          endDate: '2021-01-31T19:16:00.000Z'
        });
        server.create('banner', {
          bannerColor: 'orange',
          bannerLink: 'https://codespark.com',
          bannerText: 'This is another awesome banner',
          bannerIcon: '',
          startDate: '2021-02-01T20:14:00.000Z',
          endDate: '2021-02-07T20:14:00.000Z'
        });
        server.create('banner', {
          bannerColor: 'red',
          bannerLink: 'https://codespark.com',
          bannerText: 'This is the awesome banner',
          bannerIcon: '',
          startDate: '2021-03-01T19:04:00.000Z',
          endDate: '2021-03-05T19:04:00.000Z'
        });
      },
    routes() {
      // base code had this.namespace set as 'api/banners', 
      //but when I use that it ironically asks me in console if I forgot to declare namespace...

      // Being able to use the DevTools to help you write and debug route handlers right alongside your frontend code is a key part of what makes Mirage so productive. <- 100%
      // stick the word "debugger" into your POST function code (as usual in js) and you can look at what's going on in the chrome console before your post req goes through.

      // this get fixes the issue of not knowing how many banners we have, and not maintaining the banner list accurately in the browser
      this.get("/api/banners", (schema) => {
        return schema.banners.all()
      })

      // Here we're getting the attrs from the request just like before, but now we're using the create method from our schema (which is how we interact with Mirage's data layer) to create new banner models.
      // Mirage also auto-assigns auto-incrementing id values to our new posts
      this.post("/api/banners", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return schema.banners.create(attrs)
      })

      // Mirage has a database that acts as a single source of truth for your mock server data
      // Route handlers should read from and modify the database via the schema argument in order to preserve the referential integrity of your mock data across route handlers

      // Note: the Mirage tutorial calls the :id a "dynamic segment"
      // We can access the runtime value of the segment via request.params.id. 
      // We then use schema to find the corresponding reminder, and then call destroy() on it to remove it from Mirage's database.
      this.delete("/api/banners/:id", (schema, request) => {
        let id = request.params.id
        return schema.banners.find(id).destroy()
      })

      // I didn't find very robust documentation in Mirage API on how to do an update to a Banner,
      // so I used what I saw and may need to daisy chain a few methods
      this.patch("/api/banners/:id", (schema, request) => {
        let bannerToUpdate = schema.banners.find(request.params.id);
        return bannerToUpdate.update({
        // this is stubbed out b/c I don't yet have a way to capture the input
            //bannerText: 'testUpdateTitle',
            bannerColor: 'purple'
        });
      })

      // I am not using lists of banners in this demo, but it's cool that Serializers leverage Mirage's data layer to help you mock complex API responses.

      // We could import RestSerializer, set it as the serializer for our Banner model, and tell it to embed any related lists (or any other useful data)

      // Some common Serializer concerns are changing the shape of your JSON payloads (e.g. whether to include a key in the root), the conventions around formatting for compound words (e.g. camelCase vs. snake_case), and how and when related data should be included

      // I won't go into it here but Mirage has very robust factories to create high fidelity sample data and graphs of relational data with invisible foreign keys embedded into the schema
    },
  })
}
