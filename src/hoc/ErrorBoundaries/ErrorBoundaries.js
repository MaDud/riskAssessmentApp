import React from 'react';

class ErrorBoundaries extends React.Component {

    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({hasError: true, errorMessage: error})
    }

    render () {
        
        if (this.state.hasError) {
            return (
                <div>
                    <h1>{this.state.error}</h1>
                </div>
            )
        } else {
            return this.props.children
        }
    }
};

export default ErrorBoundaries;