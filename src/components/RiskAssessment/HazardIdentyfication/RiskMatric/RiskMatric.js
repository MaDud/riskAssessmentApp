import React from 'react';

const riskMatric = props => {

    let value = props.effect+'|'+props.propability;
    let risk;    

    switch (value) {
        case ("small|small"):
            risk = (<div>
                        <p>Ryzyko:  
                            <span>Bardzo małe</span>
                        </p>
                    </div>);
            break;
        case ("small|medium"):
            risk = (<div>
                <p>Ryzyko:  
                    <span>Małe</span>
                </p>
            </div>);
            break;
        case ("small|big"):
            risk = (<div>
                <p>Ryzyko:  
                    <span>Średnie</span>
                </p>
            </div>);
            break;
        case ("medium|small"):
            risk = (<div>
                <p>Ryzyko:  
                    <span>Małe</span>
                </p>
            </div>);
            break;
        case ("medium|medium"):
            risk = (<div>
                <p>Ryzyko:  
                    <span>Średnie</span>
                </p>
            </div>);
            break;
        case ("medium|big"):
            risk = (<div>
                <p>Ryzyko:  
                    <span>Duże</span>
                </p>
            </div>);
            break;
        case ("big|small"):
            risk = (<div>
                <p>Ryzyko:  
                    <span>Średnie</span>
                </p>
            </div>);
            break;
        case ("big|medium"):
            risk = (<div>
                <p>Ryzyko:  
                    <span>Duże</span>
                </p>
            </div>);
            break;
        case ("big|big"):
            risk = (<div>
                <p>Ryzyko:  
                    <span>Bardzo duże</span>
                </p>
            </div>);
            break;
        default:
            risk = null;
    };

    return risk;

};

export default riskMatric;