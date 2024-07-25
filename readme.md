## API-LOGISTIC-TECH

It's a API related to manage orders information. Inside of orders we have what's the pickup and destination locations, beyond the products related to that order.
Beyond the API, it also has a CRON JOB that runs at each 1 minute to fetch new orders and create them inside our database.

### How to run the project?

- You'll need to configure your .env file to reflect your PostgreSQL access information
- ``npm install``
- ``npm run migration:up``
- ``npm run dev``
- Check the API documentation [here](http://localhost:3000/api/docs)

### How to run the tests?

- ``npm run test``
- ``npm run test:verbose``

### What would I improve on this project?

- I would create a generic repository class that would contain all basic actions (e.g. getAll);
- I would improve the error handling (CronJob and Http Requests);
- I would improve the tests coverage (Many of them are really basic);
- I would improve the way to work with the API integration and use streams to improve performance;
- I would create a functionality to enable the order has more locations to enable multiple deliveres;

```
.
├── jest-integration-config.js
├── jest-unit-config.js
├── jest.config.js
├── package-lock.json
├── package.json
├── tsconfig.json
├── src
│   ├── jest.setup.ts
│   ├── index.ts
│   ├── application
│   ├── di
│   │   ├── container.ts
│   │   └── tokens.ts
│   ├── domain
│   │   └── **
│   │       ├── __mocks__
│   │       ├── entities
│   │       │   ├── **.ts
│   │       ├── infrastructure
│   │       │   ├── **Repository.ts
│   │       ├── services
│   │       │   ├── **Service.ts
│   │       └── types
│   ├── infrastructure
│   │   ├── docs
│   │   │   └── DocsService.ts
│   │   ├── migrations
│   │   │   └── **.ts
│   │   ├── http
│   │   │   └── HttpClient.ts
│   │   └── postgresql
│   │       └── PostgreSQLClient.ts
│   ├── presentation
│   │   ├── job
│   │   │   └── CronJob.ts
│   │   └── http
│   │       ├── controllers
│   │       │   └── **
│   │       │       └── docs
│   │       │           └── **.docs.yaml
│   │       ├── routes
│   │       └── types
│   └── shared
│       ├── exceptions
│       └── http
│           ├── adapters
│           ├── controller
│           └── interfaces
```

Here I had divided my project in this architecture, here we have on the top some layers like domain, presentation, infrastructure, and shared.
Above the domain layer I could quote some important folders like entities, infrastructure, services, and types.
My idea was for each folder was:

- Domain
    - Everything that represent something, an object, person, company, and etc;
    - It's the core of the project, the idea behind it, is how and what the project works.
- Infrastructure
    - There contains high level coulping, here I would have things like documentations services, database conections, loggers, and etc.
- Presentation
    - Everything related about the way how is presented for the client: routes, controllers, or another ways to enable the client to consume our project.
- Shared
    - How the name says, it's code shared with several layers, folders and files.
    - The things putted here, can be accessed for any file.
