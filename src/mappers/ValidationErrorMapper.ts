const translations: Record<string, string> = {
    "The email has already been taken.": "このメールアドレスは既に使用されています",
    "The password field must be at least 6 characters.": "パスワードは6文字以上で入力してください",
    "The password confirmation field must be at least 6 characters.": "パスワードは6文字以上で入力してください",
    "The password field confirmation does not match.": "パスワードが一致しません"
};

export function mapValidationErrors(errors: Record<string, string[]>) {
    const translated: Record<string, string[]> = {};

    for (const key of Object.keys(errors)) {
        translated[key] = errors[key].map(e => translations[e] ?? e);
    }

    return translated;
}