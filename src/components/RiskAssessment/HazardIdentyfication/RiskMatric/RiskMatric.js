import React from 'react';

const riskMatric = props => {

    let risk = null;

    switch (props.effect, props.propability) {
        case ("small", "small"):
            risk = <div>Bardzo małe</div>;
            break;
        case ("small", "medium"):
            risk = <div>Małe</div>;
            break;
        case ("small", "big"):
            risk = <div>Średnie</div>;
            break;
        case ("medium", "small"):
            risk = <div>Małe</div>;
            break;
        case ("medium", "medium"):
            risk = <div>Średnie</div>;
            break;
        case ("medium", "big"):
            risk = <div>Duże</div>;
            break;
        case ("big", "small"):
            risk = <div>Średnie</div>;
            break;
        case ("big", "medium"):
            risk = <div>Duże</div>;
            break;
        case ("big", "big"):
            risk = <div>Bardzo duże</div>;
            break;
        default:
            null;
    };

    return risk;

};

export default riskMatric;