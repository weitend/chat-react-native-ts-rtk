import HomeScreen from "../../static/home-screen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import ChatScreen from "../../static/chat-screen/ChatScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, Button } from "react-native";
import { userSelector } from "../../core/store/selectors";
import { useSelector } from "react-redux";
import AuthScreen from "../../static/auth-screen/AuthScreen";
import AutocompleteScreen from "../autocomplete/Autocomplete";
import { useAppDispatch } from "../../core/store/store";
import { signOut } from "../../core/store/user/thunk";
import { BUTTON, NAVIGATION } from "../../core/constants";

export default function Navigation() {
  const userState = useSelector(userSelector);
  const dispatch = useAppDispatch();

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userState.isAuth ? (
          <Stack.Screen
            name={NAVIGATION.NAVIGATE.AUTH}
            options={{ title: NAVIGATION.TITLE.AUTH }}
            component={AuthScreen}
          />
        ) : (
          <>
            <Stack.Screen
              name={NAVIGATION.NAVIGATE.CHATS}
              component={HomeScreen}
              options={{
                title: NAVIGATION.TITLE.CHATS,
                headerRight: () => (
                  <Button
                    title={BUTTON.TITLE.LEAVE}
                    color={BUTTON.COLOR.RED}
                    onPress={() => dispatch(signOut())}
                  />
                ),
              }}
            />
            <Stack.Screen
              name={NAVIGATION.NAVIGATE.CHAT}
              component={ChatScreen}
              options={{
                title: NAVIGATION.TITLE.CHAT,
              }}
            />
            <Stack.Screen
              name={NAVIGATION.NAVIGATE.SEARCH}
              options={{ title: NAVIGATION.TITLE.SEARCH }}
              component={AutocompleteScreen}
            />
          </>
        )}
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
