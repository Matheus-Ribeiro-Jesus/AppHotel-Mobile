import React from "react";
import { Dimensions } from "react-native";
import InputSpinner from "react-native-input-spinner";
type Props = {
    
    guests: number;
    minGuests: number;
    maxGuests: number;
    stepGuests: number;
    colorMaxGuests: string;
    colorMinGuests: string;

    onSelectSpin?: (guests: number) => void;
};

const InputSpin = ({ guests, onSelectSpin, minGuests, maxGuests, stepGuests, colorMaxGuests, colorMinGuests }: Props) => {
    const {width, height} =  Dimensions.get("window");
    
    return (
        <InputSpinner
            value={guests}
            onChange={onSelectSpin}
            max={maxGuests}
            min={minGuests}
            step={stepGuests}
            colorMax={colorMaxGuests}
            colorMin={colorMinGuests}
            style={{ width: width * 0.45, marginBottom: 10 }}
        />
    );
}

export default InputSpin;