# Public AI Toolbox Adoption Office

## One-sentence benefit
Helps public administrations turn reusable European AI guidance into accountable service deployments.

## Live demo
Run the Java service and React application locally to use the complete experience.

## Screenshots
![public AI toolbox adoption workspace](docs/screenshot.png)

## Main features
Search and sort adoption cases, add validated public-service needs, move work through review, and see live priorities and outcomes.

## Technology used
React, TypeScript, TanStack Query, Wouter, Vite, Spring Boot and Java.

## Installation instructions
Start the backend with `cd backend && mvn spring-boot:run`. In another terminal run `npm install && npm run dev`.

## Commercial licensing/contact
Commercial licensing and implementation support are available through the repository owner.

## Business problem and users
Public administrations, digital transformation teams and service owners need one view of reusable AI tools, safeguards and accountable deployment decisions.

## Key workflows
Teams can find an adoption case, create a validated service need and advance it from draft through review to deployment readiness.

## React framework highlights
The interface uses focused components, controlled forms, route-based pages, query caching and mutation-driven API updates.

## Java backend highlights
The Spring Boot service provides real list, search, create and update endpoints, validation, clear errors, health reporting and tests.

## Architecture and state flow
React reads server state through TanStack Query. Successful mutations invalidate the shared list so the latest backend record is shown.

## Accessibility and responsive behaviour
Semantic regions, explicit labels, visible focus, status text, strong contrast and compact mobile layouts support keyboard and small-screen use.

## Verification commands
Use `npm test`, `npm run lint`, `npm run build`, and `cd backend && mvn test package`.

## Structure
`src` contains the React experience, `backend` contains the Java service, and `docs` contains verified media.

## Tradeoffs
The demonstration keeps records in memory for a fast local start; production use would add identity, evidence storage, model inventories and procurement integrations.

## Roadmap
Add toolbox catalogue imports, safeguard checklists, value measurement, multilingual reuse patterns and durable evidence storage.
