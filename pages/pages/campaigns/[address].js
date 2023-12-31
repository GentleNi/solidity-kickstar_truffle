import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../../truffle/ethereum/campaign'
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../../truffle/ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import Link from 'next/link'

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
        // console.log(summary);

        return {
            address: props.query.address,
            minimumContribution: Number(summary[0]),
            balance: Number(summary[1]),
            requestsCount: Number(summary[2]),
            approversCount: Number(summary[3]),
            manager: summary[4]
        };

    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestsCount,
                meta: 'Number of requests',
                description: 'A request tries to withdraw money from contract',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to request',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend',
                style: { overflowWrap: 'break-word' }
            }
        ];

        return <Card.Group items={items} />;
    }


    render() {
        return (
            <Layout>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Link href={`/campaigns/${this.props.address}/requests`}>
                            <Button primary>
                                View Requests
                            </Button>
                        </Link>
                    </Grid.Row>
                </Grid>

            </Layout>
        )
    }
}

export default CampaignShow;
