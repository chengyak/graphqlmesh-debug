# RaaS Data Service Mesh Framework

RaaS data service mesh is a framework that can automatically generate GraphQL schema for different data sources such as Rest API, databases, and GraphQL and stitch multiple data soruces into one endpoint.

[wiki](https://avalara.atlassian.net/wiki/spaces/RAAS/pages/637692414153/RaaS+Data+Service+Mesh)

## Installation

Make sure you installed [nodejs:16](https://nodejs.org/en/download/) before you use the framework

```bash
git clone git@scm.platform.avalara.io:raas/raas-foundation/raas-data-service-mesh-core.git
npm install
```
the create your data source definition in .meshrc.yml according to [GraphQL-Mesh](https://www.the-guild.dev/graphql/mesh/docs)
```bash
npm run build
npm run start
```

RaaS team will provide a CLI tool to help developers to build data services using this framework.

## Usage

TBD with RaaS CLI
