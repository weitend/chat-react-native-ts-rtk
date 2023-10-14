import React, { useState } from "react";
import { Alert, View } from "react-native";
import { supabase } from "../../../lib/supabase";
import { Button, Input } from "react-native-elements";
import { useAppDispatch } from "../../core/store/store";
import { authEmail, getSession } from "../../core/store/user/thunk";
import { userSelector } from "../../core/store/selectors";
import { useSelector } from "react-redux";
import { fetchChats } from "../../core/store/chats/thunks";
import { authScreenStyles } from "./AuthScree.styles";
import { BUTTON, INPUT } from "../../core/constants";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userState = useSelector(userSelector);
  const dispatch = useAppDispatch();

  async function signInWithEmail() {
    setLoading(true);

    dispatch(authEmail([email, password]));
    dispatch(getSession());
    dispatch(fetchChats(userState.id));

    if (userState.error) Alert.alert(userState.error);

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={authScreenStyles.container}>
      <View style={[authScreenStyles.verticallySpaced, authScreenStyles.mt20]}>
        <Input
          label={INPUT.LABEL.EMAIL}
          leftIcon={{
            type: INPUT.ICON.LEFT.TYPE.FONT_AWESOME,
            name: INPUT.ICON.LEFT.NAME.ENVELOPE,
          }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder={INPUT.PLACEHOLDER.EMAIL}
          autoCapitalize="none"
        />
      </View>
      <View style={authScreenStyles.verticallySpaced}>
        <Input
          label={INPUT.LABEL.PASSWORRD}
          leftIcon={{
            type: INPUT.ICON.LEFT.TYPE.FONT_AWESOME,
            name: INPUT.ICON.LEFT.NAME.LOCK,
          }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder={INPUT.PLACEHOLDER.PASSWORD}
          autoCapitalize={"none"}
        />
      </View>
      <View style={[authScreenStyles.verticallySpaced, authScreenStyles.mt20]}>
        <Button
          title={BUTTON.TITLE.SIGN_IN}
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={authScreenStyles.verticallySpaced}>
        <Button
          title={BUTTON.TITLE.SIGN_OUT}
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
}
