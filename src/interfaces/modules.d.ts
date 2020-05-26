declare module "ReduxTypes" {
  import { ActionType, StateType } from "typesafe-actions";

  export type RootAction = ActionType<
    typeof import("src/app/redux/modules/index").default
  >;
  export type RootState = StateType<
    typeof import("src/app/redux/modules/reducers").default
  >;
}
