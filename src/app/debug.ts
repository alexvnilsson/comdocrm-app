import { environment } from "environments";

export const DEBUG = () => !environment.production && !environment.staging;
