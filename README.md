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
import { GraphqlFilterModule } from '@gabrieljsilva/nestjs-graphql-filter';
import { PrismaFilterAdapter } from '@gabrieljsilva/nestjs-graphql-filter-adapter-prisma';

import { PrismaModule } from '@prisma/module/prisma.module';
import { UserModule } from './packages';
import { GraphqlModule } from './infra/graphql';

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

Then you can generate the queries using `GraphqlFilterService`: 

```typescript
import { Injectable } from '@nestjs/common';
import { GraphqlFilterService } from '@gabrieljsilva/nestjs-graphql-filter';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@prisma/module/prisma.service';
import { UserFilters } from '../../../../domain/filterables';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly graphqlFilterService: GraphqlFilterService,
  ) {}

  async getManyUsers(filters?: UserFilters) {
    const findUsersFilters = this.graphqlFilterService.getQuery<Prisma.UserWhereInput>(filters);

    return this.prisma.user.findMany({
      where: findUsersFilters,
    });
  }
}
```