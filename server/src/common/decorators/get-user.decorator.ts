import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((_: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
});