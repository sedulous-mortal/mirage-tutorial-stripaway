// Welcome to the tutorial!
import { createServer, Model } from "miragejs"

export default function () {
  createServer({
    models: {
        banners: Model,
    },
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

      this.get("/api/banners", () => ({
        banners: [{
            id: 1,
            bannerColor: 'blue',
            bannerLink: 'https://codespark.com',
            bannerText: 'This is an awesome banner',
            bannerIcon: 'https://thefoos-com2.s3.amazonaws.com/flagship/icon_desktop.png',
            startDate: '2021-01-24T19:16:00.000Z',
            endDate: '2021-01-31T19:16:00.000Z'
            },
            {
            id: 2,
            bannerColor: 'orange',
            bannerLink: 'https://codespark.com',
            bannerText: 'This is another awesome banner',
            bannerIcon: '',
            startDate: '2021-02-01T20:14:00.000Z',
            endDate: '2021-02-07T20:14:00.000Z'
            },
            {
            id: 3,
            bannerColor: 'red',
            bannerLink: 'https://codespark.com',
            bannerText: 'This is the awesome banner',
            bannerIcon: '',
            startDate: '2021-03-01T19:04:00.000Z',
            endDate: '2021-03-05T19:04:00.000Z'
            }]
      }))
      // Being able to use the DevTools to help you write and debug route handlers right alongside your frontend code is a key part of what makes Mirage so productive. <- 100%
      // stick the word "debugger" into your POST function code (as usual in js) and you can look at what's going on in the chrome console before your post req goes through.

      // this works on the premise that we know there are 3 existing banners, which is also unrealistic even with the incrementing of newId++

      let newId = 4;
      this.post("/api/banners", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        attrs.id = newId++

        return { banner: attrs }
      })
    },
  })
}
