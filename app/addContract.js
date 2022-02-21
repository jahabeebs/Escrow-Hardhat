import {ethers} from 'ethers';

const provider = new ethers.providers.Web3Provider(ethereum);

let contractsToReturn = [];
let keys = Object.keys(localStorage);
let iterator = -1;

const container = document.getElementById("container");

if (localStorage.getItem('0') != null) {
    for (let i = 0; i < keys.length; i++) {
        container.innerHTML += localStorage.getItem(i.toString());
    }
}

export default async function addContract(id, contract, arbiter, beneficiary, value) {
    const buttonId = `approve-${id}`;

    const container = document.getElementById("container");

    container.innerHTML += createHTML(buttonId, arbiter, beneficiary, value);

    contract.on('Approved', () => {
        document.getElementById(buttonId).className = "complete";
        document.getElementById(buttonId).innerText = "✓ It's been approved!";
    });

    document.getElementById(buttonId).addEventListener("click", async () => {
        const signer = provider.getSigner();
        await contract.connect(signer).approve();
    });
}

function createHTML(buttonId, arbiter, beneficiary, value) {
    const contractToReturn = `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> ${arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> ${value} </div>
        </li>
        <div class="button" id="${buttonId}">
          Approve
        </div>
      </ul>
    </div>
  `;
    contractsToReturn.push(contractToReturn);
    iterator++;
    localStorage.setItem(iterator.toString(), contractsToReturn[iterator]);
    return localStorage.getItem(iterator.toString());
}
