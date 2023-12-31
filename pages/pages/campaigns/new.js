import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../../truffle/ethereum/factory';
import web3 from '../../../truffle/ethereum/web3';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage:'',
        loading:false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading:true, errorMessage:''});

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]                              
                });
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({loading:false});

    };
    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Miminum Contribution</label>
                        <Input label="wei" labelPosition='right' value={this.state.minimumContribution}
                            onChange={event => this.setState({ minimumContribution: event.target.value })} />
                    </Form.Field>

                    <Message error header="Opps!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Create</Button>

                </Form>
            </Layout>
        )
    }
}

export default CampaignNew;