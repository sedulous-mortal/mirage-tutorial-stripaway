// Welcome to the tutorial!
import { createServer, Model } from "miragejs"

export default function () {
  createServer({
    models: {
        banners: Model,
    },
    routes() {
      this.get("/api/banners", () => ({
        banners: [
            { id: 1, bannerText: "Walk the dog" },
            { id: 2, bannerText: "Take out the trash" },
            { id: 3, bannerText: "Work out" },
          ],
      }))
    },
  })
}
// banners: [{
//     bannerColor: 'red',
//     bannerLink: 'https://codespark.com',
//     bannerText: 'This is the awesome banner',
//     bannerIcon: '',
//     startDate: '2021-03-01T19:04:00.000Z',
//     endDate: '2021-03-05T19:04:00.000Z'
//   }],