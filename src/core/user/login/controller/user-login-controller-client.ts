export const UserLoginControllerClient =
    async (
        email: string,
        password: string,
        setLoading: (loading: boolean) => void,
        setError: (error: string | null) => void
    ): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const loginResponse = await fetch("/api/user/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });
            const data = await loginResponse.json();
            if (!loginResponse.ok) {
                setError(data.error);
                return;
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
            setError("Error en el inicio de sesión");
        } finally {
            setLoading(false);
        }
    };