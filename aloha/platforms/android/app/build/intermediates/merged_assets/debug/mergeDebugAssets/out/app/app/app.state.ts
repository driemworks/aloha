import { User } from "./models/user.model";

export interface AppState {
    readonly user: User;
}