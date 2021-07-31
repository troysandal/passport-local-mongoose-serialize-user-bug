import { Schema, model, PassportLocalDocument } from 'mongoose';
const passportLocalMongoose = require('passport-local-mongoose');
import { PassportLocalSchema } from 'mongoose';

export interface IUser extends PassportLocalDocument {
    _id: string
    name: string
    location: string
};

const UserSchema = new Schema({
    name: Schema.Types.String,
    location: Schema.Types.String
});

UserSchema.plugin(passportLocalMongoose);

const UserModel = model<IUser>('User', UserSchema as PassportLocalSchema);

export default UserModel
