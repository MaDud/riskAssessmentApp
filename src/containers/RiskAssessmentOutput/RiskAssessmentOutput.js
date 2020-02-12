import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Table from '../../components/UI/Table/Table';

import RAOutput from '../../components/RAOutput/RAOutput';

const heads = ["Zagrożenie", "Źródło zagrożenia", "Możliwe skutki", "Stosowane środki ochrony przed zagrożeniem", "Ryzyko"];
const values = [[1,2,3,4,5], [6,7,8,9,10]];

class RiskAssessmentOutput extends React.Component {
    render() {
        return (
            <Auxiliary>
                <RAOutput>
                    <Table 
                        head={heads}
                        list={values}/>
                </RAOutput>
            </Auxiliary>
        )
    }
};

export default RiskAssessmentOutput;