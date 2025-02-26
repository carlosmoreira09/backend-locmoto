import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UsersModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [join(process.cwd(), 'dist/**/**/*.entity.ts')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [DatabaseModule],
})
export class DatabaseModule {}
