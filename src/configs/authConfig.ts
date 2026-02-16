
export const AUTH_PROVIDER_STATUS = {
    google: {
        enabled: false,
        providerType: "redirect",
    },
    github: {
        enabled: false,
        providerType: "popup"
    },
} as const;

export type AuthProvider = keyof typeof AUTH_PROVIDER_STATUS;