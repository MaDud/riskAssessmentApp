import React from 'react';

const hazardForm = props => {
    return (
        <div>
            <h1>{props.hazard}</h1>
            <button>Yes/No</button>
            <form>
                <label>Źródło zagrożenia:</label>
                <input type='textarea'/>
                <label>Możliwe skutki zagrożenia:</label>
                <input type='textarea'/>
                <label>Środki ochrony przed zagrożeniem:</label>
                <input type='textarea'/>
                <label>Skutek</label>
                <select value="result">
                    <option value="small">Mały</option>
                    <option value="medium">Średni</option>
                    <option value="big">Duży</option>
                </select>
                <label>Prawdopodobieństwo</label>
                <select value="propability">
                    <option value="small">Małe</option>
                    <option value="medium">Średnie</option>
                    <option value="big">Duże</option>
                </select>
            </form>
        </div>
    )
};

export default hazardForm;