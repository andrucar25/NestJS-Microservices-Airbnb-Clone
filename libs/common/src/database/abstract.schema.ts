import { SchemaTypes, Types } from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";
import { Field, ObjectType } from "@nestjs/graphql";


@Schema()
@ObjectType({isAbstract: true})
export abstract class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  @Field(() => String)
  _id: Types.ObjectId
}