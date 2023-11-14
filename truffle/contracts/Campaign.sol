// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

contract CampaignFactory {
    address[] public deployCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory ) {
        return  deployCampaigns ;
    }
}


contract Campaign {
    struct  Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalsCount;
        //一个提议的审批者
        mapping(address => bool)  approvals;
    }

    address public manager;
    uint public minimumContribution;
    // 一个创业项目的赞助者,有资格投票
    mapping(address => bool) public approvers;
    mapping(uint => Request) public requests;
    uint public numRequests;
    uint public approversCount;
    // Request[]  public  requests;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator)  {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable{
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted{
        Request storage r = requests[numRequests++];

        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.complete = false;
        r.approvalsCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender],"you are not approvers!");
        require(!request.approvals[msg.sender],"you've voted before!");

        request.approvals[msg.sender] = true;
        request.approvalsCount++;

    }


    function cancelRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender],"you are not approvers!");
        require(request.approvals[msg.sender],"you've not approve this request yet!");

        request.approvals[msg.sender] = false;
        request.approvalsCount--;

    }


    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(!requests[index].complete);
        require(request.approvalsCount > (approversCount / 2));
        require(address(this).balance >= request.value, "We don't have enough money!");

        request.complete = true;
        payable(request.recipient).transfer(request.value);

    }

    function getSummary() public view returns (uint,uint,uint,uint,address) {
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }


    function getRequestCount() public view returns (uint) {
        return numRequests;
    }
    
}