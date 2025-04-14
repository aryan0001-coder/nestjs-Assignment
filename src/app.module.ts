import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://aryan:aryan1234@cluster0.u2p1f.mongodb.net/Assignment1?retryWrites=true&w=majority&appName=Cluster0'),
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
