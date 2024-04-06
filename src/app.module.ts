import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, UserModule, AuthModule],
})
export class AppModule {}
