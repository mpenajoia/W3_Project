import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractAbi, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value }));
    }

    //checks to see if a wallet is already connected
    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert('Please Install Metamask');
    
            const accounts = await ethereum.request({method: 'eth_accounts'})
    
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
    
                //getAllTransactions();
            } else {
                console.log('no accounts found')
            }
    
            console.log(accounts);
            
        } catch (error) {
            console.log(error);
        
            throw new Error("No Ethereum object.")
            
        }
        

    }

    //connect to wallet/account
    const connectWallet = async () => {
        try{
            if(!ethereum) return alert('Please Install Metamask');
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum object.")
        }
    }
//all logic for sending transactions
    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert('Please Install Metamask');

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum object.")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}