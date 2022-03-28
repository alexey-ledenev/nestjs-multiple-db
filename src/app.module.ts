import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import * as path from 'path';
import { DATABASE, IEnv, NodeEnv } from './app.types';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object<IEnv>({
        NODE_ENV: Joi.string()
          .valid(...Object.values(NodeEnv))
          .default(NodeEnv.Production),
        APP_PORT: Joi.number().required(),

        DB_ADMIN_PORT: Joi.number().required(),
        DB_ADMIN_HOST: Joi.string().required(),
        DB_ADMIN_NAME: Joi.string().required(),
        DB_ADMIN_USER: Joi.string().required(),
        DB_ADMIN_PASSWORD: Joi.string().required(),

        DB_HOT_PORT: Joi.number().required(),
        DB_HOT_HOST: Joi.string().required(),
        DB_HOT_NAME: Joi.string().required(),
        DB_HOT_USER: Joi.string().required(),
        DB_HOT_PASSWORD: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: DATABASE.ADMIN,
      useFactory: (config: ConfigService<IEnv>) => {
        return {
          name: DATABASE.ADMIN,
          type: 'mariadb',
          host: config.get('DB_ADMIN_HOST'),
          port: config.get('DB_ADMIN_PORT'),
          username: config.get('DB_ADMIN_USER'),
          password: config.get('DB_ADMIN_PASSWORD'),
          database: config.get('DB_ADMIN_NAME'),
          logging: 'all',
          migrations: [path.resolve(process.cwd(), 'dist/migrations/*.js')],
          migrationsRun: false,
          synchronize: false,
          entities: [__dirname + '/**/*.admin-entity{.ts,.js}'],
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: DATABASE.HOT,
      useFactory: (config: ConfigService<IEnv>) => {
        return {
          name: DATABASE.HOT,
          type: 'mariadb',
          host: config.get('DB_HOT_HOST'),
          port: config.get('DB_HOT_PORT'),
          username: config.get('DB_HOT_USER'),
          password: config.get('DB_HOT_PASSWORD'),
          database: config.get('DB_HOT_NAME'),
          logging: 'all',
          migrationsRun: false,
          synchronize: false,
          entities: [__dirname + '/**/*.hot-entity{.ts,.js}'],
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class AppModule {}
