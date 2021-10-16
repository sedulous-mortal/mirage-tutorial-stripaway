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
            bannerColor: 'blue',
            bannerLink: 'https://codespark.com',
            bannerText: 'This is an awesome banner',
            bannerIcon: 'https://thefoos-com2.s3.amazonaws.com/flagship/icon_desktop.png',
            startDate: '2021-01-24T19:16:00.000Z',
            endDate: '2021-01-31T19:16:00.000Z'
            },
            {
            bannerColor: 'orange',
            bannerLink: 'https://codespark.com',
            bannerText: 'This is another awesome banner',
            bannerIcon: '',
            startDate: '2021-02-01T20:14:00.000Z',
            endDate: '2021-02-07T20:14:00.000Z'
            },
            {
            bannerColor: 'red',
            bannerLink: 'https://codespark.com',
            bannerText: 'This is the awesome banner',
            bannerIcon: '',
            startDate: '2021-03-01T19:04:00.000Z',
            endDate: '2021-03-05T19:04:00.000Z'
            }]
      }))
    },
  })
}
