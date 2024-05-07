import NavScreen from "./NavScreen";

class NavStack {
    /**
     * @param screens the screens in the stack, the first element in the array will be taken as the first screen
     * @param options the stack options, provided to the stack (https://reactnavigation.org/docs/stack-navigator)
     */
    constructor(public readonly options?: object) {}

    public readonly screens: NavScreen[] = [];

    public addScreen(screen: NavScreen): NavStack {
        this.screens.push(screen);
        return this;
    }

    public addNewScreen(name: string | null, id: string, component: React.FC, options?: object): NavStack {
        let screen = new NavScreen(name, id, component, options);
        this.addScreen(screen);
        return this;
    }
}

export default NavStack;
