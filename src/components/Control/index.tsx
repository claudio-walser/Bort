import { Divider, Grid, Stack } from '@mui/material';
import { Component, ReactNode } from 'react';
import ControlItem from '../../@types/Control';
import Input from '../Input';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import Output from '../Output';
import IOContainer from '../IOContainer';
import ControlHeader from '../ControlHeader';

export interface ControlProps {
    moduleName: string;
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
        const { moduleName, control } = this.props;
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
                                <Input identifier={control.identifier} input={x} key={i} />
                            ))}
                        </IOContainer>
                    )}
                    {hasOutputs && (
                        <IOContainer text={'Output'}>
                            {control.outputs.map((x, i) => (
                                <Output identifier={control.identifier} output={x} key={i} />
                            ))}
                        </IOContainer>
                    )}
                </Grid>
            </Stack>
        );
    }
}
