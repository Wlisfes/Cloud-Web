import type { Module, Store } from 'vuex'

export const createModule = <S, R>(module: Module<S, R>) => module as Store<S>
export const createRoute = <S>(routes: Array<S>) => routes
