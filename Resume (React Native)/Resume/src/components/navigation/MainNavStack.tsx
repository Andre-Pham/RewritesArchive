import EducationScreen from "../screens/EducationScreen";
import ExperienceScreen from "../screens/ExperienceScreen";
import MainScreen from "../screens/MainScreen";
import SkillsScreen from "../screens/SkillsScreen";
import NavStack from "./NavStack";

export const MainNavStack = new NavStack()
    .addNewScreen(null, "Andre Pham", MainScreen)
    .addNewScreen("Education", "Andre Pham | Education", EducationScreen)
    .addNewScreen("Experience", "Andre Pham | Experience", ExperienceScreen)
    .addNewScreen("Skills", "Andre Pham | Skills", SkillsScreen);
