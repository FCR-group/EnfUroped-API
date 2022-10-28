import { User as CompleteUser } from "./userTypes";

declare global {
  namespace Express {
    export interface User extends CompleteUser {}
  }
}
