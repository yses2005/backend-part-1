# order-playground
### Setup
Make sure you installed Docker, docker-compose, and yarn before you run the setup.
1. Setup the docker containers for the database: `docker-compose up -d`.
2. Install all the dependencies: `yarn install`.
3. Initialize database schema: `yarn schema:sync`.

### Running Tests
To run tests, run `yarn test`. You can also specify the specific test file if you're planning on only
running a specific test suite.

To run a single `describe` or `it` assertions, you can change them to `fdescribe` or `fit`. The same
goes with skipping tests, just change them to `xdescribe` or `xit`.
