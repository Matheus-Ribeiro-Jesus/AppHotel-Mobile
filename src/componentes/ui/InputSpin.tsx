import React from "react";
import { Dimensions } from "react-native";
import InputSpinner from "react-native-input-spinner";
type Props = {
    onSelectSpin?: (value: number) => void;
};

const InputSpin = ({ onSelectSpin }: Props) => {
    const {width, height} =  Dimensions.get("window");
    
    return (
        <InputSpinner
            max={6}
            min={1}
            step={1}
            colorMax={"#db4048"}
            colorMin={"#98e773"}
            style={{ width: width * 0.45, marginBottom: 10 }}
        />
    );
}

export default InputSpin;