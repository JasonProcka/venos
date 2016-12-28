
// --- Imports ----

// >>> React
import React from 'react';


// Show a Page that says that you have no access to the current area
export default class NoAccess extends React.Component {
    render() {
        return (
            <div>
                {`You do not have access for here`}
            </div>
        );
    }
}
