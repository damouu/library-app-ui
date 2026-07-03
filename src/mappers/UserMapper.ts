import {User} from "@/models/User";
import type {UserResponse} from "@/types/auth/UserResponse";

export function mapUser(response: UserResponse): User {
    return new User(
        response.card_uuid,
        response.user_name,
        response.email,
        response.avatar_img_url,
        response.last_logged_in_at
    );
}