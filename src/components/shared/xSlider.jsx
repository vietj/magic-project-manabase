import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 200,
    },
});

const XSlider = ({ handleChange, value }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Slider
                aria-labelledby="discrete-slider"
                defaultValue={2}
                max={10}
                min={0}
                onChange={handleChange}
                step={1}
                value={value}
                valueLabelDisplay="auto"
                marks
            />
            <Typography id="discrete-slider" gutterBottom>
                X Value
            </Typography>
        </div>
    );
};

export default XSlider;