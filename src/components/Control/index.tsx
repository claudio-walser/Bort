import { Divider, Grid, Stack } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { Component, ReactNode } from 'react';

import ControlItem from '../../@types/Control';
import ControlHeader from '../ControlHeader';
import Input from '../Input';
import IOContainer from '../IOContainer';
import Output from '../Output';

export interface ControlProps {
    moduleName: string;
    showLiveData: boolean;
    showArduinoData: boolean;
    control: ControlItem;
}

const controlTheme: SxProps<Theme> = {
    // borderTopWidth: '.1rem',
    // borderTopColor: theme => theme.palette.text.primary,
    // borderTopStyle: 'solid',
    // marginTop: '1rem',
};

export default class Control extends Component<ControlProps> {
    public constructor(props: ControlProps) {
        super(props);
        this.selectContents = this.selectContents.bind(this);
    }

    // use this to auto select the control name
    selectContents(el: Node) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection()!;
        sel.removeAllRanges();
        sel.addRange(range);
    }

    public render(): ReactNode {
        const { moduleName, control, showLiveData, showArduinoData } = this.props;
        const hasInputs = control.inputs.length > 0;
        const hasOutputs = control.outputs.length > 0;
        return (
            <Stack sx={controlTheme} className="control">
                <Divider />
                <ControlHeader
                    moduleName={moduleName}
                    description={control.description}
                    identifier={control.identifier}
                />
                <Grid container className="control-body">
                    {hasInputs && (
                        <IOContainer text={'Input'}>
                            {control.inputs.map((x, i) => (
                                <Input
                                    identifier={control.identifier}
                                    input={x}
                                    key={i}
                                    showLiveData={showLiveData}
                                    showArduinoData={showArduinoData}
                                />
                            ))}
                        </IOContainer>
                    )}
                    {hasOutputs && (
                        <IOContainer text={'Output'}>
                            {control.outputs.map((x, i) => (
                                <Output
                                    identifier={control.identifier}
                                    output={x}
                                    key={i}
                                    showLiveData={showLiveData}
                                    showArduinoData={showArduinoData}
                                />
                            ))}
                        </IOContainer>
                    )}
                </Grid>
            </Stack>
        );
    }
}
