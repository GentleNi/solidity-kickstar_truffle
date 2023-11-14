import React, { Component } from 'react';
import Layout from '../../../../components/Layout';
import Link from 'next/link'
import { Card, Table, Button, Label } from 'semantic-ui-react';
import Campaign from '../../../../../truffle/ethereum/campaign'
import RequestRow from '../../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        // console.log(address);
        const campaign = Campaign(address);
        let requestCount = await campaign.methods.getRequestCount().call();
        let approversCount =  await campaign.methods.approversCount().call();
        requestCount = Number(requestCount);
        approversCount = Number(approversCount);
        console.log(approversCount);

        const requests = await Promise.all(
            Array(requestCount).fill().map((element, index) => {
                return  campaign.methods.requests(index).call();
            })
        );

        requests.forEach(element => {
            element[1] = Number(element.value)
            element.value = Number(element.value)
            element[4] = Number(element.approvalsCount)
            element.approvalsCount = Number(element.approvalsCount)
        });

        console.log(requests);

        return { address, requests, requestCount, approversCount };
    }


    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow
                    id={index}
                    key={index}
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                    requestCount={this.props.requestCount}
                />
            );
        });
    }


    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <h3>Request List</h3>
                <Link href={`/campaigns/${this.props.address}/requests/new`}>
                    <Button primary floated='right' style={{marginBottom: 10}}>
                        Add Request
                    </Button>
                </Link>

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amout</Table.HeaderCell>
                            <Table.HeaderCell>Recipient</Table.HeaderCell>
                            <Table.HeaderCell>Approval Count</Table.HeaderCell>
                            <Table.HeaderCell>Approve</Table.HeaderCell>
                            <Table.HeaderCell>Finalize</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table >

                <h4>Found  {this.props.requestCount}  Request</h4>

            </Layout>
        );
    }

}

export default RequestIndex;