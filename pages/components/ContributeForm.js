import React, { Component } from 'react';
import { Button, Form, Input, Message, Table } from 'semantic-ui-react';
import Campaign from '../../truffle/ethereum/campaign'
import web3 from '../../truffle/ethereum/web3';
import { useRouter } from "next/router";

class ContributeForm extends Component {
    state = {
        value: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });

        const campaign = Campaign(this.props.address);


        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether'),
                gas: 3000000
            });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    };

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        label='ether' labelPosition='right' />
                </Form.Field>
                <Button primary loading={this.state.loading}>Contribute!</Button>
                <Message error header="Opps!" content={this.state.errorMessage} />

            </Form>
        )
    }
}

export default ContributeForm;