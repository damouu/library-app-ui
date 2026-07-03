import {User} from "@/models/User";
import type {UserJwt} from "@/types/auth/UserJwt";

export function mapUserJwt(jwt: UserJwt): User {
    return new User(
        jwt.member_card_uuid,
        jwt.user_name,
        jwt.email,
        jwt.avatar_img_url,
        ""
    );
}