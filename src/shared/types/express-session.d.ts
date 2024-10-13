import 'express-session';
import { UserInfo } from "remult";


declare module 'express-session' {
    interface SessionData {
        user: UserInfo;
    }
}