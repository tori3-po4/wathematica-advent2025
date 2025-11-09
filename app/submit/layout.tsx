import AuthProvider from "./auth-provider";
import AuthButton from "./auth-button";


export default function SubmitLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {children}
            <AuthButton />
        </AuthProvider>
    );
}