import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ObjectType('User')
@Directive('@extends')
@Directive('@key(fields: "id")')
export class UserType {
  @IsUUID('4')
  @Field(() => ID)
  @Directive('@external')
  id: string;
}
