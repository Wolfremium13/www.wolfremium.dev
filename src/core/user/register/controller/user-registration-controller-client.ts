export const UserRegistrationControllerClient = async (
    email: string,
    password: string,
    setLoading: (loading: boolean) => void,
    setError: (error: (string | null)) => void,
    redirectToLogin: () => Promise<void>
): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
        const registrationResponse = await fetch("/api/user/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });
        const data = await registrationResponse.json();
        if (!registrationResponse.ok) {
            setError(data.error);
            return;
        }
        await redirectToLogin();
    } catch (error: unknown) {
        if (error instanceof Error) {
            setError(error.message);
        }
        setError("Error al registrar el usuario");
    } finally {
        setLoading(false);
    }
}