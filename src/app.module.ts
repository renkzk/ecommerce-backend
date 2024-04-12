import { Module } from '@nestjs/common';
// import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './shared/guards/roles.guard';

@Module({
  imports: [
    AuthModule,
    UserModule,
    // ProductsModule
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
