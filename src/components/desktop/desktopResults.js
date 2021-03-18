import Grid from "@material-ui/core/Grid";
import ResultTable from "../shared/resultTable/index";
import React from "react";

export default function DesktopResults({ spells, lands}) {
    const spellResultfields = [
        { name: 'Mana Cost', type: 'text', key: 'manaCost'},
        { name: 'P1', type: 'number', key: 'p1'},
        { name: 'P2', type: 'number', key: 'p2'},
    ]
    const landsResultFields = [
        { name: 'Quality', type: 'number', key: 'p1' },
    ];

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={8}>
                <ResultTable
                    title="Spells"
                    isMobile={false}
                    rows={spells}
                    fields={spellResultfields}
                    tooltips={[
                        'Converted Mana cost',
                        'Assuming you hit all your landdrops',
                        'True probability',
                    ]}
                    selected={1}
                />
            </Grid>
            <Grid item xs={4}>
                <ResultTable
                    title="Lands"
                    isMobile={false}
                    rows={lands}
                    fields={landsResultFields}
                    tooltips={[
                        'Land Quality',
                    ]}
                    selected={0}
                />
            </Grid>
        </Grid>
    )
}
