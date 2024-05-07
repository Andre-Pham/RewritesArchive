import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";

export enum WebDeviceType {
    portable,
    desktop,
    none,
}

export namespace WebDeviceType {
    export function toString(webDeviceType: WebDeviceType): string {
        switch (webDeviceType) {
            case WebDeviceType.portable:
                return "Portable";
            case WebDeviceType.desktop:
                return "Desktop";
            case WebDeviceType.none:
                return "None";
            default:
                throw new UnreachableCaseError(webDeviceType);
        }
    }
}
