// Welcome to the tutorial!
import { createServer } from "miragejs"

export default function () {
  createServer({
    routes() {
      this.get("/api/banners", () => ({
        banners: [
            { id: 1, text: "Walk the dog" },
            { id: 2, text: "Take out the trash" },
            { id: 3, text: "Work out" },
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