export interface Type<T = any> extends Function {
	new (...args: any[]): T
}

export declare function PickType<T, K extends keyof T>(
	classRef: Type<T>,
	keys: readonly K[]
): Type<Pick<T, typeof keys[number]>>

export declare function OmitType<T, K extends keyof T>(
	classRef: Type<T>,
	keys: readonly K[]
): Type<Omit<T, typeof keys[number]>>

export declare function ComposeType<A, B>(classARef: Type<A>, classBRef: Type<B>): Type<A & B>

class User {
	name: string = ''
	age: number = 0
}

class K extends PickType(User, ['age']) {}
