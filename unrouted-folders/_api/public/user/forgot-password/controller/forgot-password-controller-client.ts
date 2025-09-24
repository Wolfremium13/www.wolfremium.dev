import {UserForgotPasswordUrl} from "@/app/api/public/user/forgot-password/controller/user-forgot-password-url";

export const ForgotPasswordControllerClient = async (
    email: string,
    setLoading: (loading: boolean) => void,
    setError: (error: string | null) => void,
    setSubmitted: (submitted: boolean) => void
): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
        const forgotPasswordResponse = await fetch(UserForgotPasswordUrl.relative, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email}),
        });
        const data = await forgotPasswordResponse.json();
        if (!forgotPasswordResponse.ok) {
            setError(data.error);
            return;
        }
        setSubmitted(true);
    } catch (error: unknown) {
        if (error instanceof Error) {
            setError(error.message);
        }
        setError("Error al enviar el correo electrónico");
    } finally {
        setLoading(false);
    }
}