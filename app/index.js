import deploy from './deploy';
import addContract from './addContract';
import "./index.scss";

let contracts = 0;
async function newContract() {
  const beneficiary = document.getElementById("beneficiary").value;
  const arbiter = document.getElementById("arbiter").value;
  const value = document.getElementById("eth").value;
  const contract = await deploy(arbiter, beneficiary, value);
  addContract(++contracts, contract, arbiter, beneficiary, value);
}

document.getElementById("deploy").addEventListener("click", newContract);
