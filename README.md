# nestjs-graphql-filter-adapter-prisma

An adapter from Prisma ORM to the library [@gabrieljsilva/nestjs-graphql-filter](https://www.npmjs.com/package/@gabrieljsilva/nestjs-graphql-filter)
## Installation

```bash
npm i nestjs-graphql-filter-adapter-prisma
```
or
```bash
yarn add nestjs-graphql-filter-adapter-prisma
```

## Usage
After installing the library [@gabrieljsilva/nestjs-graphql-filter](https://www.npmjs.com/package/@gabrieljsilva/nestjs-graphql-filter)
you must register the adapter in the filter module, as follows the code below.

```typescript
import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/module/prisma.module';
import { UserModule } from './packages';
import { GraphqlModule } from './infra/graphql';
import { GraphqlFilterModule } from '@gabrieljsilva/nestjs-graphql-filter';
import { PrismaFilterAdapter } from '@gabrieljsilva/nestjs-graphql-filter-adapter-prisma';

@Module({
  imports: [
    GraphqlFilterModule.forRoot(PrismaFilterAdapter),
    GraphqlModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

```