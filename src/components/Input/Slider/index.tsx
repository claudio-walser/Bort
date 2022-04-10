import { Component, ReactNode } from 'react';
import { Slider } from '@mui/material';
import { Mark } from '@mui/base/SliderUnstyled/SliderUnstyledProps';

export interface SliderProps {
    value: number;
    min: number;
    max: number;
    extraMarks?: Mark[];
    onChange: (event: Event, value: number | number[], activeThumb: number) => void;
}

export default class ControlSlider extends Component<SliderProps, any> {
    public constructor(props: SliderProps) {
        super(props);
    }

    public render(): ReactNode {
        const { value, min, max, extraMarks, onChange } = this.props;
        const marks = extraMarks !== null && extraMarks !== undefined ? [...extraMarks] : [];
        marks.push({ value: min, label: min });
        marks.push({ value: max, label: max });

        return <Slider value={value} min={min} max={max} marks={marks} onChange={onChange} />;
    }
}