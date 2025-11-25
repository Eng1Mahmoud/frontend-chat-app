
export type Role = "guest" | "user" ;
export interface RouteConfig {
    path: string[];
    roles: Role[];
}