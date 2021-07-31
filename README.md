Illustrates an error in [@types/passport-local-mongoose](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/passport-local-mongoose) that's outlined in this [StackOverflow](https://stackoverflow.com/questions/67726174/passport-local-mongoose-serializeuser-incorrect-type) bug. [passport.serializeUser()](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/cdf1d8ac3e92e6d596ee95d8a0b0aa5ebe7a0d8d/types/passport/index.d.ts#L84) expects the callback to take an `Express.User` object as the first parameter but `@types/passport-local-mongoose` defines [@types/passport-local-mongoose](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/cdf1d8ac3e92e6d596ee95d8a0b0aa5ebe7a0d8d/types/passport-local-mongoose/index.d.ts#L38) as taking a `PassportLocalModel` as the first argument.

Steps to Repro
```bash
git clone git@github.com:troysandal/passport-local-mongoose-serialize-user-bug.git
cd passport-local-mongoose-serialize-user-bug
npm i
npx tsc

# app.ts:31 will show the following error yet the program will function fine.
```

```No overload matches this call.
  Overload 1 of 2, '(fn: (user: User, done: (err: any, id?: any) => void) => void): void', gave the following error.
    Argument of type '(user: PassportLocalModel<IUser>, cb: (err: any, id?: any) => void) => void' is not assignable to parameter of type '(user: User, done: (err: any, id?: any) => void) => void'.
      Types of parameters 'user' and 'user' are incompatible.
        Type 'User' is missing the following properties from type 'PassportLocalModel<IUser>': authenticate, serializeUser, deserializeUser, register, and 68 more.
  Overload 2 of 2, '(fn: (req: IncomingMessage, user: User, done: (err: any, id?: unknown) => void) => void): void', gave the following error.
    Argument of type '(user: PassportLocalModel<IUser>, cb: (err: any, id?: any) => void) => void' is not assignable to parameter of type '(req: IncomingMessage, user: User, done: (err: any, id?: unknown) => void) => void'.
      Types of parameters 'user' and 'req' are incompatible.
        Type 'IncomingMessage' is missing the following properties from type 'PassportLocalModel<IUser>': authenticate, serializeUser, deserializeUser, register, and 53 more.
```
