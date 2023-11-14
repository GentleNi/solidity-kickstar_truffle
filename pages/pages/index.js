import React, { Component } from 'react';
import {Card,  Button, Icon} from 'semantic-ui-react'
import factory from '../../truffle/ethereum/factory'
import Layout from '../components/Layout'
import Link from 'next/link' 

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns}; 
    }
    renderCampaigns() {
        const items = this.props.campaigns.map(
            address => {
                return {
                    header: address,
                    description: <Link href={`/campaigns/${address}`}>View Campaign </Link>,
                    fluid: true
                }
            }
        )

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <div> 
                    <h3>Open Campaigns</h3>
                    {this.renderCampaigns()} 

                    <Button floated='right' content="Create Campaign" icon="add circle" primary={true}
                    />
                </div>  
            </Layout>
             
        )
    }
}

export default CampaignIndex