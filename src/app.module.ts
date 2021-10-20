import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './Authentication/guard/role.guard';
import { JwtAuthGuard } from './Authentication/guard/jwt.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AuthMiddleware } from './Middleware/auth.middleware';
import { AuthModule } from './Authentication/auth.module';
import { UserModule } from './Modules/User/user.module';
import { GatewayModule } from './Gateways/gateway.module';

import config from './Configuration/config';
const { host, port, username, password, database, entities } = config.database.mysql;
const { ttl, limit } = config.security.rateLimiting;




@Module({
	imports: [
		AuthModule,
		GatewayModule,
		ThrottlerModule.forRoot({ ttl, limit }),
		MongooseModule.forRoot(config.database.mongo.uri),
        TypeOrmModule.forRoot({ type:'mysql', host, port, username, password, database, entities }),
		UserModule
	],
	controllers: [],
	providers: [
		{ provide: APP_GUARD, useClass: JwtAuthGuard },
		{ provide: APP_GUARD, useClass: RolesGuard },
		{ provide: APP_GUARD, useClass: ThrottlerGuard }
	]
})



export class AppModule implements NestModule {

	configure (consumer: MiddlewareConsumer) {
		
		consumer
			.apply(AuthMiddleware)
			.forRoutes('*');
			
	}
	
}