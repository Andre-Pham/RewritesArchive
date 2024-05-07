import { Appearance, Dimensions, Platform, PlatformIOSStatic } from "react-native";
import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";
import { ColorScheme } from "../types/ColorScheme";
import { OS } from "../types/OS";
import { ResScreenOrientation } from "../types/ResScreenOrientation";
import { ScreenType } from "../types/ScreenType";
import { WebDeviceType } from "../types/WebDeviceType";

class Environment {
    public static readonly instance = new Environment();

    private constructor() {}

    public getDeviceColorScheme(): ColorScheme {
        // TODO: I can't get this to change correctly
        const colorScheme = Appearance.getColorScheme();
        switch (colorScheme) {
            case "dark":
                return ColorScheme.dark;
            case "light":
                return ColorScheme.light;
            default:
                return ColorScheme.light;
        }
    }

    public getOS(): OS {
        switch (Platform.OS) {
            case "android":
                return OS.android;
            case "ios":
                return OS.ios;
            case "windows":
                return OS.windows;
            case "macos":
                return OS.macos;
            case "web":
                return OS.web;
            default:
                return OS.other;
        }
    }

    public getScreenType(): ScreenType {
        const os = this.getOS();
        switch (os) {
            case OS.ios:
                return (Platform as PlatformIOSStatic).isPad ? ScreenType.large : ScreenType.mobile;
            case OS.android:
                // TODO: Figure out how to detect Android tablets
                return ScreenType.mobile;
            case OS.windows:
            case OS.macos:
                return ScreenType.large;
            case OS.web:
            case OS.other:
                const dimensions = this.getScreenDimensions();
                if (dimensions[1] > dimensions[0]) {
                    // Height > width, assume mobile
                    return ScreenType.mobile;
                }
                // Any landscape screen on a web client can be assumed to be on a large screen
                return ScreenType.large;
            default:
                throw new UnreachableCaseError(os);
        }
    }

    public getWebDeviceType(): WebDeviceType {
        if (Platform.OS !== "web") {
            return WebDeviceType.none;
        }
        const userAgent = navigator.userAgent;
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        const { width, height } = Dimensions.get("window");
        const smallestSide = Math.min(width, height);
        // Portable devices (general touch devices check)
        if (isTouchDevice && smallestSide < 600) {
            return WebDeviceType.portable;
        }
        // Portable devices (specific devices check)
        // prettier-ignore
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk|iPad|Tablet|Kindle|webOS|Windows Phone/i.test(userAgent)) {
            return WebDeviceType.portable;
        }
        // Portable Macintosh devices (iPad with iPadOS)
        if (/Macintosh/.test(userAgent) && isTouchDevice) {
            return WebDeviceType.portable;
        }
        // Default to desktop for non-touch devices with larger screen
        return WebDeviceType.desktop;
    }

    public getScreenOrientation(): ResScreenOrientation {
        const dimensions = this.getScreenDimensions();
        if (dimensions[0] > dimensions[1]) {
            return ResScreenOrientation.Landscape;
        }
        return ResScreenOrientation.Potrait;
    }

    public getAspectRatio(): number {
        const dimensions = this.getScreenDimensions();
        return dimensions[0] / dimensions[1];
    }

    public screenIsPortrait(): boolean {
        return this.getScreenWidth() <= 950;
    }

    public getScreenWidth(): number {
        return Dimensions.get("window").width;
    }

    public getScreenHeight(): number {
        return Dimensions.get("window").height;
    }

    private getScreenDimensions(): [number, number] {
        return [Dimensions.get("window").width, Dimensions.get("window").height];
    }
}

export default Environment;
