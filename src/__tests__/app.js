import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { visit } from "../lib/test-helpers"
import makeServer from "../server"

// Use a fresh instance of our Mirage server here, one without any data, 
// so we can verify that the empty state shows the "All done!" message.
// in server.js, start the Mirage server in "test" mode using the environment option
// what "test" environment does to server: It sets the timing to 0 so that our tests run fast;
// it hides Mirage's logging so the test output remains clean; 
// and most importantly, it skips the seeds() hook.
test("it shows a message when there are no reminders", async () => {
  let server = makeServer("test")
  visit("/")
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."))

  expect(screen.getByText("All done!")).toBeInTheDocument()
  server.shutdown()
})

test('renders Banner header text', () => {
  let server = makeServer("development")
  visit("/")
  expect(screen.getByRole('heading')).toHaveTextContent('Banners')
  server.shutdown()
});