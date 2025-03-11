import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema({ versionKey: false })
@ObjectType()
export class UserDocument extends AbstractDocument {
  @Prop()
  @Field()
  email: string;

  @Prop()
  password: string;

  @Prop()
  @Field(() => [String])
  roles?: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);