import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';

class RequestRow extends Component {
    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const readyToFinalize = request.approvalsCount > approversCount / 2;
        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{request.value}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalsCount} / {approversCount}</Cell>
                {
                    request.complete ? null : (
                        <Cell><Button color='green' basic>Approve</Button></Cell>
                    )
                }
                {
                    readyToFinalize ? null : (
                        <Cell><Button color='blue' basic>Finalize</Button></Cell>
                        )
                }
            </Row>
        )
    }
}

export default RequestRow;